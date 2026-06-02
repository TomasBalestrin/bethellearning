import { getDb } from "./server/db.ts";
import { sql } from "drizzle-orm";

const trilhas = {
  "Mobile Development": {
    descricao: "Aprenda a desenvolver aplicações móveis com React Native e Flutter",
    modulos: [
      {
        titulo: "Fundamentos Mobile",
        descricao: "Conceitos básicos de desenvolvimento mobile",
        aulas: [
          {
            titulo: "Diferenças Web vs Mobile",
            descricao: "Entenda as principais diferenças entre desenvolvimento web e mobile",
            conteudo: `<h2>Diferenças Web vs Mobile</h2>
<p>O desenvolvimento mobile possui características únicas que o diferenciam do web:</p>
<h3>Características Mobile</h3>
<ul>
<li><strong>Tela Pequena:</strong> Interfaces devem ser otimizadas para telas menores</li>
<li><strong>Touch Interactions:</strong> Gestos táteis ao invés de mouse/teclado</li>
<li><strong>Offline First:</strong> Aplicações devem funcionar sem internet</li>
<li><strong>Performance:</strong> Menos recursos disponíveis que em desktops</li>
<li><strong>Bateria:</strong> Otimização de consumo é crítica</li>
<li><strong>Câmera/GPS:</strong> Acesso a sensores do dispositivo</li>
</ul>`,
            exercicios: JSON.stringify([
              {
                id: 1,
                titulo: "Qual é a altura mínima recomendada para um botão em mobile?",
                tipo: "multiple_choice",
                opcoes: ["24px", "48px", "72px", "100px"],
                correto: 1
              }
            ])
          }
        ]
      }
    ]
  }
};

async function generateCourses() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database not available");
      process.exit(1);
    }

    for (const [trilhaName, trilhaData] of Object.entries(trilhas)) {
      console.log(`Processando trilha: ${trilhaName}`);
      
      // Buscar ID da trilha
      const [courses] = await db.execute(sql`
        SELECT id FROM courses WHERE title = ${trilhaName}
      `);
      
      if (!courses || courses.length === 0) {
        console.error(`Trilha não encontrada: ${trilhaName}`);
        continue;
      }

      const courseId = (courses as any[])[0].id;
      console.log(`ID da trilha: ${courseId}`);

      // Processar módulos
      for (let modIdx = 0; modIdx < trilhaData.modulos.length; modIdx++) {
        const modulo = trilhaData.modulos[modIdx];
        
        // Inserir módulo
        await db.execute(sql`
          INSERT INTO modules (course_id, title, description, order_index)
          VALUES (${courseId}, ${modulo.titulo}, ${modulo.descricao}, ${modIdx + 1})
        `);

        // Obter ID do módulo inserido
        const [modules] = await db.execute(sql`
          SELECT id FROM modules WHERE course_id = ${courseId} AND title = ${modulo.titulo}
          ORDER BY id DESC LIMIT 1
        `);

        if (!modules || modules.length === 0) {
          console.error(`Erro ao criar módulo: ${modulo.titulo}`);
          continue;
        }

        const moduleId = (modules as any[])[0].id;
        console.log(`Módulo criado: ${modulo.titulo} (ID: ${moduleId})`);

        // Processar aulas
        for (let aulaIdx = 0; aulaIdx < modulo.aulas.length; aulaIdx++) {
          const aula = modulo.aulas[aulaIdx];
          
          await db.execute(sql`
            INSERT INTO lessons (module_id, title, description, content, exercises, order_index)
            VALUES (
              ${moduleId},
              ${aula.titulo},
              ${aula.descricao},
              ${aula.conteudo},
              ${aula.exercicios},
              ${aulaIdx + 1}
            )
          `);

          console.log(`Aula criada: ${aula.titulo}`);
        }
      }
    }

    console.log("✅ Trilhas especializadas criadas com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao gerar trilhas:", error);
    process.exit(1);
  }
}

generateCourses();
