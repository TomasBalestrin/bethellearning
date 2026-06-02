import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Authentication helpers
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUser(data: { openId: string; email: string; password: string; name: string; role?: 'user' | 'admin' }) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(users).values({
    openId: data.openId,
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role || 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  });

  return getUserByEmail(data.email);
}

// User management helpers
export async function getAllUsers() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db.select().from(users).orderBy(users.createdAt);
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUser(id: number, data: Partial<{ name: string; email: string; role: 'user' | 'admin' }>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(users).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(users.id, id));

  return getUserById(id);
}

export async function deleteUser(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(users).where(eq(users.id, id));
  return { success: true };
}

// Course management helpers
export async function getAllCourses() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { courses } = await import("../drizzle/schema");
  return db.select().from(courses).orderBy(courses.order);
}

export async function getCourseById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { courses } = await import("../drizzle/schema");
  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCourse(data: { title: string; description?: string; thumbnail?: string; difficulty?: 'beginner' | 'intermediate' | 'advanced'; duration?: number; order?: number }) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { courses } = await import("../drizzle/schema");
  const result = await db.insert(courses).values({
    title: data.title,
    description: data.description || null,
    thumbnail: data.thumbnail || null,
    difficulty: data.difficulty || 'beginner',
    duration: data.duration || null,
    order: data.order || 0,
    isPublished: 0,
  });

  return getCourseById(Number(result[0].insertId));
}

export async function updateCourse(id: number, data: Partial<{ title: string; description: string; thumbnail: string; difficulty: 'beginner' | 'intermediate' | 'advanced'; duration: number; order: number; isPublished: number }>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { courses } = await import("../drizzle/schema");
  await db.update(courses).set(data).where(eq(courses.id, id));
  return getCourseById(id);
}

export async function deleteCourse(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { courses } = await import("../drizzle/schema");
  await db.delete(courses).where(eq(courses.id, id));
  return { success: true };
}

// Module management helpers
export async function getModulesByCourseId(courseId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { modules } = await import("../drizzle/schema");
  return db.select().from(modules).where(eq(modules.courseId, courseId)).orderBy(modules.order);
}

export async function getModuleById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { modules } = await import("../drizzle/schema");
  const result = await db.select().from(modules).where(eq(modules.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createModule(data: { courseId: number; title: string; description?: string; order?: number }) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { modules } = await import("../drizzle/schema");
  const result = await db.insert(modules).values({
    courseId: data.courseId,
    title: data.title,
    description: data.description || null,
    order: data.order || 0,
  });

  return getModuleById(Number(result[0].insertId));
}

export async function updateModule(id: number, data: Partial<{ title: string; description: string; order: number }>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { modules } = await import("../drizzle/schema");
  await db.update(modules).set(data).where(eq(modules.id, id));
  return getModuleById(id);
}

export async function deleteModule(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { modules } = await import("../drizzle/schema");
  await db.delete(modules).where(eq(modules.id, id));
  return { success: true };
}

// Lesson management helpers
export async function getLessonsByModuleId(moduleId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { lessons } = await import("../drizzle/schema");
  return db.select().from(lessons).where(eq(lessons.moduleId, moduleId)).orderBy(lessons.order);
}

export async function getLessonById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { lessons } = await import("../drizzle/schema");
  const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createLesson(data: { moduleId: number; title: string; content?: string; videoUrl?: string; duration?: number; order?: number }) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { lessons } = await import("../drizzle/schema");
  const result = await db.insert(lessons).values({
    moduleId: data.moduleId,
    title: data.title,
    content: data.content || null,
    videoUrl: data.videoUrl || null,
    duration: data.duration || null,
    order: data.order || 0,
  });

  return getLessonById(Number(result[0].insertId));
}

export async function updateLesson(id: number, data: Partial<{ title: string; content: string; videoUrl: string; duration: number; order: number }>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { lessons } = await import("../drizzle/schema");
  await db.update(lessons).set(data).where(eq(lessons.id, id));
  return getLessonById(id);
}

export async function deleteLesson(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { lessons } = await import("../drizzle/schema");
  await db.delete(lessons).where(eq(lessons.id, id));
  return { success: true };
}

// ===== PROGRESS & XP SYSTEM =====

export async function completeLesson(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.execute(sql`
    INSERT INTO user_progress (user_id, lesson_id, completed_at)
    VALUES (${userId}, ${lessonId}, NOW())
    ON DUPLICATE KEY UPDATE completed_at = NOW()
  `);
  
  return result;
}

export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const [rows] = await db.execute(sql`
    SELECT * FROM user_progress WHERE user_id = ${userId}
  `);
  
  return rows as unknown as any[];
}

export async function getUserStats(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const [rows] = await db.execute(sql`
    SELECT * FROM user_stats WHERE user_id = ${userId} LIMIT 1
  `);
  
  return (rows as unknown as any[])[0] || null;
}

export async function initializeUserStats(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.execute(sql`
    INSERT IGNORE INTO user_stats (user_id, total_xp, current_level, lessons_completed)
    VALUES (${userId}, 0, 1, 0)
  `);
}

export async function addXP(userId: number, xpAmount: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.execute(sql`
    UPDATE user_stats 
    SET total_xp = total_xp + ${xpAmount},
        current_level = FLOOR(1 + (total_xp + ${xpAmount}) / 250),
        last_activity_date = CURDATE()
    WHERE user_id = ${userId}
  `);
}

export async function incrementLessonsCompleted(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.execute(sql`
    UPDATE user_stats 
    SET lessons_completed = lessons_completed + 1,
        last_activity_date = CURDATE()
    WHERE user_id = ${userId}
  `);
}

export async function checkAndUpdateStreak(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Buscar estatísticas atuais do usuário
  let stats = await getUserStats(userId);
  if (!stats) {
    await initializeUserStats(userId);
    stats = await getUserStats(userId);
    if (!stats) throw new Error("Failed to initialize user stats");
  }
  
  let newStreak = stats.current_streak || 0;
  let newLongestStreak = stats.longest_streak || 0;
  
  if (!stats.last_activity_date) {
    // Primeira atividade do usuário
    newStreak = 1;
  } else {
    // Usar DATEDIFF do MySQL para cálculo preciso de diferença de dias
    const [diffResult] = await db.execute(sql`
      SELECT DATEDIFF(CURDATE(), ${stats.last_activity_date}) as diff_days
    `);
    const diffDays = (diffResult as unknown as any[])[0]?.diff_days || 0;
    
    if (diffDays === 0) {
      // Mesma data, mantém streak (mas garante mínimo de 1)
      newStreak = Math.max(stats.current_streak, 1);
    } else if (diffDays === 1) {
      // Dia consecutivo, incrementa streak
      newStreak = stats.current_streak + 1;
    } else {
      // Quebrou o streak, reinicia
      newStreak = 1;
    }
  }
  
  // Atualiza recorde se necessário
  if (newStreak > newLongestStreak) {
    newLongestStreak = newStreak;
  }
  
  // Atualiza no banco
  await db.execute(sql`
    UPDATE user_stats 
    SET current_streak = ${newStreak},
        longest_streak = ${newLongestStreak},
        last_activity_date = CURDATE()
    WHERE user_id = ${userId}
  `);
  
  return { currentStreak: newStreak, longestStreak: newLongestStreak };
}

export async function getAllBadges() {
  const db = await getDb();
  if (!db) return [];
  
  const [rows] = await db.execute(sql`SELECT * FROM badges`);
  return rows as unknown as any[];
}

export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const [rows] = await db.execute(sql`
    SELECT b.*, ub.earned_at 
    FROM user_badges ub
    JOIN badges b ON ub.badge_id = b.id
    WHERE ub.user_id = ${userId}
    ORDER BY ub.earned_at DESC
  `);
  
  return rows as unknown as any[];
}

export async function awardBadge(userId: number, badgeId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.execute(sql`
    INSERT IGNORE INTO user_badges (user_id, badge_id)
    VALUES (${userId}, ${badgeId})
  `);
}

export async function checkAndAwardBadges(userId: number) {
  const stats = await getUserStats(userId);
  if (!stats) return [];
  
  const allBadges = await getAllBadges();
  const userBadges = await getUserBadges(userId);
  const userBadgeIds = new Set(userBadges.map((b: any) => b.id));
  
  const newBadges = [];
  
  for (const badge of allBadges as any[]) {
    if (userBadgeIds.has(badge.id)) continue;
    
    let earned = false;
    
    if (badge.requirement_type === 'lessons_completed') {
      earned = stats.lessons_completed >= badge.requirement_value;
    } else if (badge.requirement_type === 'xp_earned') {
      earned = stats.total_xp >= badge.requirement_value;
    } else if (badge.requirement_type === 'streak') {
      earned = stats.current_streak >= badge.requirement_value;
    }
    
    if (earned) {
      await awardBadge(userId, badge.id);
      if (badge.xp_reward > 0) {
        await addXP(userId, badge.xp_reward);
      }
      newBadges.push(badge);
    }
  }
  
  return newBadges;
}

export async function getLeaderboard(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  
  const [rows] = await db.execute(sql`
    SELECT u.id, u.name, u.email, s.total_xp, s.current_level, s.lessons_completed
    FROM user_stats s
    JOIN users u ON s.user_id = u.id
    ORDER BY s.total_xp DESC
    LIMIT ${limit}
  `);
  
  return rows as unknown as any[];
}

export async function getCourseProgress(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return null;
  
  // Get total lessons in course
  const [totalRows] = await db.execute(sql`
    SELECT COUNT(*) as total
    FROM lessons l
    JOIN modules m ON l.module_id = m.id
    WHERE m.course_id = ${courseId}
  `);
  const total = (totalRows as unknown as any[])[0]?.total || 0;
  
  // Get completed lessons in course
  const [completedRows] = await db.execute(sql`
    SELECT COUNT(*) as completed
    FROM user_progress up
    JOIN lessons l ON up.lesson_id = l.id
    JOIN modules m ON l.module_id = m.id
    WHERE up.user_id = ${userId} AND m.course_id = ${courseId} AND up.completed = 1
  `);
  const completed = (completedRows as unknown as any[])[0]?.completed || 0;
  
  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
}

export async function getUserRank(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const [rows] = await db.execute(sql`
    SELECT COUNT(*) + 1 as rank
    FROM user_stats s1
    JOIN user_stats s2 ON s2.user_id = ${userId}
    WHERE s1.total_xp > s2.total_xp
  `);
  
  return (rows as unknown as any[])[0]?.rank || null;
}
