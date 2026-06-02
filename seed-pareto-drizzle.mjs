import { db } from './server/_core/db.js';
import { courses, modules, lessons } from './drizzle/schema.js';

const paretoData = {
  junior: {
    title: 'Trilha Junior - Fundamentos (Pareto 80/20)',
    description: 'Os 4 conceitos essenciais que geram 80% dos resultados para um Dev Junior',
    modules: [
      {
        title: 'Lógica de Programação',
        lessons: [
          { title: 'Fundamentos de Lógica', content: 'Lógica de programação é a base...', video_url: 'https://www.youtube.com/embed/Ptbk2af68e8' },
          { title: 'Funções e Escopo', content: 'Funções são blocos reutilizáveis...', video_url: 'https://www.youtube.com/embed/AIhHVzZbDU8' },
          { title: 'Arrays e Objetos', content: 'Arrays são listas de valores...', video_url: 'https://www.youtube.com/embed/SqQZ7PweVWk' },
        ],
      },
      {
        title: 'Git + GitHub',
        lessons: [
          { title: 'Fundamentos de Git', content: 'Git é um sistema de controle...', video_url: 'https://www.youtube.com/embed/DqjKEDOujRM' },
          { title: 'Branches e Merge', content: 'Branches permitem trabalhar...', video_url: 'https://www.youtube.com/embed/xQujzeoHMuk' },
          { title: 'GitHub e Colaboração', content: 'GitHub é a plataforma mais popular...', video_url: 'https://www.youtube.com/embed/w3jLJU7DT5E' },
        ],
      },
      {
        title: 'JavaScript Moderno (ES6+)',
        lessons: [
          { title: 'ES6 Essencial', content: 'ES6 modernizou JavaScript...', video_url: 'https://www.youtube.com/embed/nZ1DMMsyVmw' },
          { title: 'Array Methods', content: 'Map transforma cada elemento...', video_url: 'https://www.youtube.com/embed/R8rmfD9Y5-c' },
          { title: 'Promises e Async/Await', content: 'Callbacks são funções passadas...', video_url: 'https://www.youtube.com/embed/PoRJizFVH94' },
        ],
      },
      {
        title: 'HTML + CSS Avançado',
        lessons: [
          { title: 'HTML Semântico e Forms', content: 'HTML semântico usa tags...', video_url: 'https://www.youtube.com/embed/qz0aGYrrlhU' },
          { title: 'Flexbox e CSS Grid', content: 'Flexbox e CSS Grid são sistemas...', video_url: 'https://www.youtube.com/embed/JJSoEo8JSnc' },
          { title: 'Responsividade e Mobile-First', content: 'Meta viewport essencial...', video_url: 'https://www.youtube.com/embed/srvUrASNj0s' },
        ],
      },
    ],
  },
};

async function seedCourses() {
  try {
    console.log('🌱 Iniciando seed das trilhas Pareto...');

    for (const [level, courseData] of Object.entries(paretoData)) {
      console.log(`\n📚 Criando trilha ${level.toUpperCase()}...`);

      // Criar course
      const [courseResult] = await db.insert(courses).values({
        title: courseData.title,
        description: courseData.description,
      });

      console.log(`✅ Trilha criada: ${courseData.title}`);

      // Criar modules e lessons
      for (const module of courseData.modules) {
        const [moduleResult] = await db.insert(modules).values({
          course_id: courseResult,
          title: module.title,
          content: `Módulo: ${module.title}`,
        });

        console.log(`  📖 Módulo criado: ${module.title}`);

        // Criar lessons
        for (const lesson of module.lessons) {
          await db.insert(lessons).values({
            module_id: moduleResult,
            title: lesson.title,
            content: lesson.content,
            video_url: lesson.video_url,
          });

          console.log(`    ✏️  Aula criada: ${lesson.title}`);
        }
      }
    }

    console.log('\n✨ Seed concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
}

seedCourses();
