import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'learning_platform',
});

const paretoData = {
  junior: {
    title: 'Trilha Junior - Fundamentos (Pareto 80/20)',
    description: 'Os conceitos essenciais que geram 80% dos resultados para um Dev Junior: Lógica de Programação, Git + GitHub, JavaScript Moderno (ES6+), HTML + CSS Avançado e Projeto Final.',
    modules: [
      {
        title: 'Lógica de Programação',
        lessons: [
          {
            title: 'Fundamentos de Lógica (Variáveis, Condicionais, Loops)',
            content: '',
            filePath: path.join(__dirname, '..', 'content', 'junior', 'logica', '01-fundamentos.md'),
            video_url: 'https://www.youtube.com/embed/Ptbk2af68e8',
          },
          {
            title: 'Funções e Escopo',
            content: '',
            filePath: path.join(__dirname, '..', 'content', 'junior', 'logica', '02-funcoes-escopo.md'),
            video_url: 'https://www.youtube.com/embed/AIhHVzZbDU8',
          },
          {
            title: 'Arrays e Objetos',
            content: '',
            filePath: path.join(__dirname, '..', 'content', 'junior', 'logica', '03-arrays-objetos.md'),
            video_url: 'https://www.youtube.com/embed/SqQZ7PweVWk',
          },
        ],
      },
      {
        title: 'Git + GitHub',
        lessons: [
          { title: 'Fundamentos de Git (init, add, commit, push, pull)', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'git', '01-fundamentos-git.md'), video_url: 'https://www.youtube.com/embed/DqjKEDOujRM' },
          { title: 'Branches e Merge', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'git', '02-branches-merge.md'), video_url: 'https://www.youtube.com/embed/xQujzeoHMuk' },
          { title: 'GitHub e Colaboração em Equipe', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'git', '03-github-colaboracao.md'), video_url: 'https://www.youtube.com/embed/w3jLJU7DT5E' },
          { title: 'Rebase Avançado e Resolução de Conflitos', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'git', '04-rebase-avancado.md'), video_url: '' },
          { title: 'Trabalhando com Stash e Working Tree', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'git', '05-stash-workingtree.md'), video_url: '' },
          { title: 'Tags e Releases (Versionamento Semântico)', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'git', '06-tags-releases.md'), video_url: '' },
          { title: 'Estratégias de Branching (Git Flow e GitHub Flow)', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'git', '07-estrategias-branching.md'), video_url: '' },
        ],
      },
      {
        title: 'JavaScript Moderno (ES6+)',
        lessons: [
          { title: 'ES6 Essencial (let/const, arrow functions, template literals)', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '01-es6-essenciais.md'), video_url: 'https://www.youtube.com/embed/nZ1DMMsyVmw' },
          { title: 'Array Methods (map, filter, reduce, find)', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '02-array-methods.md'), video_url: 'https://www.youtube.com/embed/R8rmfD9Y5-c' },
          { title: 'Promises e Async/Await', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '03-promises-async.md'), video_url: 'https://www.youtube.com/embed/PoRJizFVH94' },
          { title: 'Classes em JavaScript', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '04-classes.md'), video_url: '' },
          { title: 'Módulos ES6', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '05-modules.md'), video_url: '' },
          { title: 'Introdução ao TypeScript', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '06-typescript.md'), video_url: '' },
          { title: 'Testes Unitários com Jest', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '07-jest.md'), video_url: '' },
          { title: 'Práticas Avançadas e Padrões de Projeto', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'javascript', '08-advanced-practices.md'), video_url: '' },
        ],
      },
      {
        title: 'HTML + CSS Avançado',
        lessons: [
          { title: 'HTML Semântico e Forms', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'html_css', '01-html-semantic-forms.md'), video_url: 'https://www.youtube.com/embed/qz0aGYrrlhU' },
          { title: 'Flexbox Essentials', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'html_css', '02-flexbox.md'), video_url: 'https://www.youtube.com/embed/JJSoEo8JSnc' },
          { title: 'CSS Grid Essentials', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'html_css', '03-grid.md'), video_url: '' },
          { title: 'Responsividade e Mobile-First', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'html_css', '04-responsividade.md'), video_url: 'https://www.youtube.com/embed/srvUrASNj0s' },
          { title: 'Acessibilidade na Web', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'html_css', '05-acessibilidade.md'), video_url: '' },
        ],
      },
      {
        title: 'Projeto Final',
        lessons: [
          { title: 'Projeto Final - To-Do List SPA', content: '', filePath: path.join(__dirname, '..', 'content', 'junior', 'project', '01-to-do-list-spa.md'), video_url: '' }
        ]
      }
    ],
  },
  pleno: {
    title: 'Trilha Pleno - Impacto (Pareto 80/20)',
    description: 'Os 4 conceitos que separam um Junior de um Pleno: JavaScript/TypeScript Avançado, Arquitetura e Design de Código, APIs e Backend Integration, Testes e Qualidade.',
    modules: [
      {
        title: 'JavaScript / TypeScript Avançado',
        lessons: [
          { title: 'TypeScript Essencial (Tipos, Interfaces, Generics)', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'javascript_avancado', '01-typescript-essencial.md'), video_url: 'https://www.youtube.com/embed/d56mG7DQqqM' },
          { title: 'Closures, Prototypes e This', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'javascript_avancado', '02-closures-prototypes-this.md'), video_url: 'https://www.youtube.com/embed/71AtaJpJoO8' },
          { title: 'Performance (Memoization, Debouncing, Throttling)', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'javascript_avancado', '03-performance.md'), video_url: 'https://www.youtube.com/embed/cjIswDCKgu0' },
        ],
      },
      {
        title: 'Arquitetura e Design de Código',
        lessons: [
          { title: 'Princípios SOLID', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'arquitetura', '01-principios-solid.md'), video_url: 'https://www.youtube.com/embed/rtmFCcjEJEE' },
          { title: 'Clean Architecture e Padrões de Design', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'arquitetura', '02-clean-architecture.md'), video_url: 'https://www.youtube.com/embed/o_TH-Y78tt4' },
          { title: 'State Management Escalável', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'arquitetura', '03-state-management.md'), video_url: 'https://www.youtube.com/embed/CVpUuw9VSK4' },
        ],
      },
      {
        title: 'APIs e Backend Integration',
        lessons: [
          { title: 'REST + HTTP Avançado', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'backend', '01-rest-http.md'), video_url: 'https://www.youtube.com/embed/SLwpqD8n3d0' },
          { title: 'Autenticação Avançada (JWT, OAuth2)', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'backend', '02-auth-jwt-oauth.md'), video_url: 'https://www.youtube.com/embed/7Q17ubqLrHo' },
          { title: 'Integração com Bancos de Dados e ORMs', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'backend', '03-bancos-orm.md'), video_url: 'https://www.youtube.com/embed/0x45yq6l0N0' },
        ],
      },
      {
        title: 'Testes e Qualidade de Código',
        lessons: [
          { title: 'Testes Unitários com Jest (Avançado)', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'testes', '01-testes-unitarios-jest-avancado.md'), video_url: 'https://www.youtube.com/embed/7r4xVZIrMZ8' },
          { title: 'Testes de Integração', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'testes', '02-testes-integracao.md'), video_url: 'https://www.youtube.com/embed/aqz5K2gMKUs' },
          { title: 'TDD e Code Coverage', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'testes', '03-tdd-coverage.md'), video_url: 'https://www.youtube.com/embed/Jv2uxzhPFl4' },
        ],
      },
      {
        title: 'Projeto Final',
        lessons: [
          { title: 'Projeto Final - API RESTful Completa', content: '', filePath: path.join(__dirname, '..', 'content', 'pleno', 'project', '01-api-restful.md'), video_url: '' }
        ]
      }
    ],
  },
  senior: {
    title: 'Trilha Sênior - Estratégia (Pareto 80/20)',
    description: 'Os 4 conceitos que definem um Sênior: System Design & Arquitetura de Sistemas, Liderança Técnica & Mentoring, Performance/Escalabilidade/Observabilidade e Estratégia Técnica.',
    modules: [
      {
        title: 'System Design & Arquitetura de Sistemas',
        lessons: [
          { title: 'Design de Sistemas Distribuídos', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'system_design', '01-sistemas-distribuidos.md'), video_url: 'https://www.youtube.com/embed/gSvqn2_-U0s' },
          { title: 'Microservices vs Monólito', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'system_design', '02-microservices-monolito.md'), video_url: 'https://www.youtube.com/embed/wgdBVIX9ifA' },
          { title: 'Padrões Avançados (Event-Driven, CQRS, Circuit Breaker)', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'system_design', '03-padroes-avancados.md'), video_url: 'https://www.youtube.com/embed/STKCRSUsyP0' },
        ],
      },
      {
        title: 'Liderança Técnica & Mentoring',
        lessons: [
          { title: 'Liderança de Equipes Técnicas', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'lideranca', '01-lideranca-equipes.md'), video_url: 'https://www.youtube.com/embed/hnpFLBUQ0g4' },
          { title: 'Code Review e Mentoring', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'lideranca', '02-code-review-mentoring.md'), video_url: 'https://www.youtube.com/embed/eJxcupx_CHE' },
          { title: 'Comunicação Técnica e Decisões', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'lideranca', '03-comunicacao-decisoes.md'), video_url: 'https://www.youtube.com/embed/HAnw168huqA' },
        ],
      },
      {
        title: 'Performance, Escalabilidade e Observabilidade',
        lessons: [
          { title: 'Otimização de Performance', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'performance', '01-otimizacao-performance.md'), video_url: 'https://www.youtube.com/embed/0fONene3OIA' },
          { title: 'Escalabilidade Horizontal e Vertical', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'performance', '02-escalabilidade.md'), video_url: 'https://www.youtube.com/embed/xpDnVSmNFwY' },
          { title: 'Monitoring, Logging e Observabilidade', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'performance', '03-observabilidade.md'), video_url: 'https://www.youtube.com/embed/W7_q2a48Hnc' },
        ],
      },
      {
        title: 'Estratégia Técnica e Tomada de Decisão',
        lessons: [
          { title: 'Trade-offs Técnicos', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'estrategia', '01-trade-offs-tecnicos.md'), video_url: 'https://www.youtube.com/embed/RTEgQnrf0Ow' },
          { title: 'Roadmap Técnico e Planejamento', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'estrategia', '02-roadmap-tecnico.md'), video_url: 'https://www.youtube.com/embed/a1zDuOPkMSw' },
          { title: 'Evolução Arquitetural', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'estrategia', '03-evolucao-arquitetural.md'), video_url: 'https://www.youtube.com/embed/CZ3wIuvmHeM' },
        ],
      },
      {
        title: 'Projeto Final',
        lessons: [
          { title: 'Projeto Final - Architecture Kata', content: '', filePath: path.join(__dirname, '..', 'content', 'senior', 'project', '01-architecture-kata.md'), video_url: '' }
        ]
      }
    ],
  }
};

async function reseedCourses() {
  try {
    console.log('🧹 Limpando dados antigos...');
    await connection.execute('DELETE FROM user_progress');
    await connection.execute('DELETE FROM lessons');
    await connection.execute('DELETE FROM modules');
    await connection.execute('DELETE FROM courses');
    
    // Reset auto_increment to keep IDs clean
    await connection.execute('ALTER TABLE courses AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE modules AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE lessons AUTO_INCREMENT = 1');
    console.log('🧹 Limpeza concluída!');

    console.log('🌱 Iniciando seed das trilhas Pareto...');

    for (const [level, courseData] of Object.entries(paretoData)) {
      console.log(`\n📚 Criando trilha ${level.toUpperCase()}...`);

      // Criar course
      const [courseResult] = await connection.execute(
        'INSERT INTO courses (title, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [courseData.title, courseData.description]
      );

      const courseId = courseResult.insertId;
      console.log(`✅ Trilha criada: ${courseData.title} (ID: ${courseId})`);

      // Criar modules e lessons
      for (const module of courseData.modules) {
        const [moduleResult] = await connection.execute(
          'INSERT INTO modules (course_id, title, content, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
          [courseId, module.title, `Módulo: ${module.title}`]
        );

        const moduleId = moduleResult.insertId;
        console.log(`  📖 Módulo criado: ${module.title} (ID: ${moduleId})`);

        // Criar lessons
        for (const lesson of module.lessons) {
          const lessonContent = lesson.filePath ? fs.readFileSync(lesson.filePath, 'utf8') : lesson.content;
          await connection.execute(
            'INSERT INTO lessons (module_id, title, content, video_url, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [moduleId, lesson.title, lessonContent, lesson.video_url]
          );

          console.log(`    ✏️  Aula criada: ${lesson.title}`);
        }
      }
    }

    console.log('\n✨ Reseed concluído com sucesso!');
    console.log('📊 Resumo:');
    console.log('  - 3 trilhas Pareto criadas (Junior, Pleno, Sênior)');
    console.log('  - 12 módulos criados');
    console.log('  - 36 aulas criadas');

  } catch (error) {
    console.error('❌ Erro ao fazer reseed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

reseedCourses();
