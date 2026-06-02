import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

describe("Sistema de Streaks", () => {
  let testUserId: number;
  let testLessonId: number;

  beforeAll(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Criar usuário de teste
    const [userResult] = await db.execute(sql`
      INSERT INTO users (openId, name, email, role)
      VALUES ('test-streak-user', 'Test Streak User', 'streak@test.com', 'user')
    `);
    testUserId = (userResult as any).insertId;

    // Criar curso, módulo e aula de teste
    const [courseResult] = await db.execute(sql`
      INSERT INTO courses (title, description, difficulty)
      VALUES ('Test Course', 'Test Description', 'beginner')
    `);
    const courseId = (courseResult as any).insertId;

    const [moduleResult] = await db.execute(sql`
      INSERT INTO modules (course_id, title, description)
      VALUES (${courseId}, 'Test Module', 'Test Description')
    `);
    const moduleId = (moduleResult as any).insertId;

    const [lessonResult] = await db.execute(sql`
      INSERT INTO lessons (module_id, title, content, duration)
      VALUES (${moduleId}, 'Test Lesson', 'Test Content', 30)
    `);
    testLessonId = (lessonResult as any).insertId;

    // Inicializar stats do usuário
    await db.execute(sql`
      INSERT INTO user_stats (user_id, total_xp, current_level, lessons_completed, current_streak, longest_streak)
      VALUES (${testUserId}, 0, 1, 0, 0, 0)
    `);
  });

  afterAll(async () => {
    const db = await getDb();
    if (!db) return;

    // Limpar dados de teste
    await db.execute(sql`DELETE FROM user_progress WHERE user_id = ${testUserId}`);
    await db.execute(sql`DELETE FROM user_stats WHERE user_id = ${testUserId}`);
    await db.execute(sql`DELETE FROM users WHERE id = ${testUserId}`);
    await db.execute(sql`DELETE FROM lessons WHERE id = ${testLessonId}`);
  });

  it("deve inicializar streak em 1 na primeira atividade", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Importar função checkAndUpdateStreak
    const { checkAndUpdateStreak } = await import("./db");

    // Executar atualização de streak
    const result = await checkAndUpdateStreak(testUserId);

    expect(result).toBeDefined();
    expect(result?.currentStreak).toBe(1);
    expect(result?.longestStreak).toBe(1);

    // Verificar no banco
    const [rows] = await db.execute(sql`
      SELECT current_streak, longest_streak FROM user_stats WHERE user_id = ${testUserId}
    `);
    const stats = (rows as any[])[0];
    expect(stats.current_streak).toBe(1);
    expect(stats.longest_streak).toBe(1);
  });

  it("deve manter streak quando atividade no mesmo dia", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Resetar para estado conhecido: streak=1, last_activity=hoje
    await db.execute(sql`
      UPDATE user_stats 
      SET current_streak = 1,
          longest_streak = 1,
          last_activity_date = CURDATE()
      WHERE user_id = ${testUserId}
    `);

    const { checkAndUpdateStreak } = await import("./db");

    // Segunda atividade no mesmo dia (deve manter streak)
    const result = await checkAndUpdateStreak(testUserId);

    expect(result?.currentStreak).toBe(1); // Deve manter em 1
    expect(result?.longestStreak).toBe(1);
  });

  it("deve incrementar streak em dias consecutivos", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Resetar para estado conhecido: streak=1, last_activity=ontem
    await db.execute(sql`
      UPDATE user_stats 
      SET current_streak = 1,
          longest_streak = 1,
          last_activity_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      WHERE user_id = ${testUserId}
    `);

    const { checkAndUpdateStreak } = await import("./db");

    // Atividade hoje (dia consecutivo)
    const result = await checkAndUpdateStreak(testUserId);

    expect(result?.currentStreak).toBe(2); // Deve incrementar
    expect(result?.longestStreak).toBe(2); // Recorde também atualiza
  });

  it("deve resetar streak quando quebrado (mais de 1 dia)", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Simular atividade de 3 dias atrás
    await db.execute(sql`
      UPDATE user_stats 
      SET last_activity_date = DATE_SUB(CURDATE(), INTERVAL 3 DAY),
          current_streak = 5,
          longest_streak = 5
      WHERE user_id = ${testUserId}
    `);

    const { checkAndUpdateStreak } = await import("./db");

    // Atividade hoje (quebrou o streak)
    const result = await checkAndUpdateStreak(testUserId);

    expect(result?.currentStreak).toBe(1); // Deve resetar para 1
    expect(result?.longestStreak).toBe(5); // Recorde mantém o valor anterior
  });

  it("deve desbloquear badges de streak", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Simular streak de 7 dias
    await db.execute(sql`
      UPDATE user_stats 
      SET current_streak = 7,
          longest_streak = 7
      WHERE user_id = ${testUserId}
    `);

    const { checkAndAwardBadges } = await import("./db");

    // Verificar badges
    const newBadges = await checkAndAwardBadges(testUserId);

    // Deve ter desbloqueado badge de 7 dias
    const streakBadge = newBadges.find((b: any) => b.requirement_type === 'streak' && b.requirement_value === 7);
    expect(streakBadge).toBeDefined();
  });

  it("deve integrar streak ao completar aula", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Resetar streak para testar integração completa
    // Usar data antiga para garantir que será detectado como quebrado
    await db.execute(sql`
      UPDATE user_stats 
      SET current_streak = 0,
          longest_streak = 0,
          last_activity_date = DATE_SUB(CURDATE(), INTERVAL 10 DAY)
      WHERE user_id = ${testUserId}
    `);

    // Criar contexto mock para tRPC
    const caller = appRouter.createCaller({
      user: { id: testUserId, openId: 'test-streak-user', name: 'Test User', role: 'user' },
      req: {} as any,
      res: {} as any,
    });

    // Completar aula (deve atualizar streak automaticamente)
    const result = await caller.progress.completeLesson({ lessonId: testLessonId });

    expect(result.success).toBe(true);
    expect(result.streakInfo).toBeDefined();
    expect(result.streakInfo?.currentStreak).toBe(1);

    // Verificar no banco
    const [rows] = await db.execute(sql`
      SELECT current_streak FROM user_stats WHERE user_id = ${testUserId}
    `);
    const stats = (rows as any[])[0];
    expect(stats.current_streak).toBe(1);
  });
});
