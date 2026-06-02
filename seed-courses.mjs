import { drizzle } from "drizzle-orm/mysql2";
import { courses, modules, lessons } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const coursesData = [
  {
    title: "Trilha Iniciante",
    description: "Fundamentos de programação e ferramentas essenciais para começar sua jornada como desenvolvedor",
    difficulty: "beginner",
    duration: 480,
    order: 1,
    isPublished: 1,
    modules: [
      {
        title: "Introdução à Programação",
        description: "Conceitos básicos de lógica de programação e algoritmos",
        order: 1,
        lessons: [
          {
            title: "O que é Programação?",
            content: "# O que é Programação?\n\nProgramação é o processo de criar instruções que um computador pode executar. Nesta aula, você aprenderá os conceitos fundamentais.",
            duration: 30,
            order: 1
          },
          {
            title: "Variáveis e Tipos de Dados",
            content: "# Variáveis e Tipos de Dados\n\nVariáveis são espaços na memória para armazenar informações. Aprenda sobre strings, números, booleanos e mais.",
            duration: 45,
            order: 2
          },
          {
            title: "Estruturas de Controle",
            content: "# Estruturas de Controle\n\nConheça if/else, switch e loops (for, while) para controlar o fluxo do seu programa.",
            duration: 50,
            order: 3
          }
        ]
      },
      {
        title: "Git e Controle de Versão",
        description: "Aprenda a usar Git para gerenciar seu código",
        order: 2,
        lessons: [
          {
            title: "Introdução ao Git",
            content: "# Introdução ao Git\n\nGit é um sistema de controle de versão distribuído. Aprenda os comandos básicos: init, add, commit, push, pull.",
            duration: 40,
            order: 1
          },
          {
            title: "Branches e Merge",
            content: "# Branches e Merge\n\nTrabalhe com branches para desenvolver features isoladamente e aprenda a fazer merge de código.",
            duration: 45,
            order: 2
          },
          {
            title: "GitHub e Colaboração",
            content: "# GitHub e Colaboração\n\nUse GitHub para hospedar seus repositórios e colaborar com outros desenvolvedores através de Pull Requests.",
            duration: 35,
            order: 3
          }
        ]
      },
      {
        title: "HTML e CSS Básico",
        description: "Crie suas primeiras páginas web",
        order: 3,
        lessons: [
          {
            title: "Estrutura HTML",
            content: "# Estrutura HTML\n\nAprenda as tags fundamentais: html, head, body, div, p, h1-h6, a, img e mais.",
            duration: 40,
            order: 1
          },
          {
            title: "Estilização com CSS",
            content: "# Estilização com CSS\n\nAprenda seletores, propriedades de cor, fonte, espaçamento e posicionamento.",
            duration: 50,
            order: 2
          },
          {
            title: "Flexbox e Grid",
            content: "# Flexbox e Grid\n\nDomine layouts modernos com Flexbox e CSS Grid para criar interfaces responsivas.",
            duration: 55,
            order: 3
          }
        ]
      }
    ]
  },
  {
    title: "Trilha Intermediária",
    description: "Desenvolvimento web moderno e bancos de dados relacionais",
    difficulty: "intermediate",
    duration: 720,
    order: 2,
    isPublished: 1,
    modules: [
      {
        title: "JavaScript Moderno",
        description: "ES6+, async/await e manipulação do DOM",
        order: 1,
        lessons: [
          {
            title: "Arrow Functions e Destructuring",
            content: "# JavaScript ES6+\n\nAprenda arrow functions, destructuring, spread operator e template literals.",
            duration: 45,
            order: 1
          },
          {
            title: "Promises e Async/Await",
            content: "# Programação Assíncrona\n\nEntenda callbacks, promises e async/await para trabalhar com operações assíncronas.",
            duration: 50,
            order: 2
          },
          {
            title: "Manipulação do DOM",
            content: "# Manipulação do DOM\n\nAprenda a selecionar elementos, modificar conteúdo e adicionar event listeners.",
            duration: 40,
            order: 3
          }
        ]
      },
      {
        title: "React Fundamentos",
        description: "Componentes, hooks e gerenciamento de estado",
        order: 2,
        lessons: [
          {
            title: "Componentes e Props",
            content: "# Componentes React\n\nCrie componentes funcionais e aprenda a passar dados através de props.",
            duration: 50,
            order: 1
          },
          {
            title: "Hooks: useState e useEffect",
            content: "# React Hooks\n\nGerencie estado com useState e efeitos colaterais com useEffect.",
            duration: 55,
            order: 2
          },
          {
            title: "Context API e useContext",
            content: "# Gerenciamento de Estado Global\n\nCompartilhe estado entre componentes usando Context API.",
            duration: 45,
            order: 3
          }
        ]
      },
      {
        title: "Bancos de Dados SQL",
        description: "MySQL, queries e modelagem de dados",
        order: 3,
        lessons: [
          {
            title: "Introdução a Bancos de Dados",
            content: "# Bancos de Dados Relacionais\n\nConceitos de tabelas, colunas, linhas, chaves primárias e estrangeiras.",
            duration: 40,
            order: 1
          },
          {
            title: "Queries SQL Básicas",
            content: "# SQL Básico\n\nAprenda SELECT, INSERT, UPDATE, DELETE e WHERE para manipular dados.",
            duration: 50,
            order: 2
          },
          {
            title: "JOINs e Relacionamentos",
            content: "# Relacionamentos entre Tabelas\n\nUse INNER JOIN, LEFT JOIN e RIGHT JOIN para combinar dados de múltiplas tabelas.",
            duration: 55,
            order: 3
          }
        ]
      }
    ]
  },
  {
    title: "Trilha Avançada",
    description: "Arquitetura de software, DevOps e práticas avançadas de desenvolvimento",
    difficulty: "advanced",
    duration: 960,
    order: 3,
    isPublished: 1,
    modules: [
      {
        title: "Arquitetura de Software",
        description: "Design patterns e princípios SOLID",
        order: 1,
        lessons: [
          {
            title: "Princípios SOLID",
            content: "# Princípios SOLID\n\nAprenda Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation e Dependency Inversion.",
            duration: 60,
            order: 1
          },
          {
            title: "Design Patterns Criacionais",
            content: "# Patterns Criacionais\n\nSingleton, Factory, Builder e Prototype para criação de objetos.",
            duration: 55,
            order: 2
          },
          {
            title: "Design Patterns Estruturais",
            content: "# Patterns Estruturais\n\nAdapter, Decorator, Facade e Proxy para organizar estruturas de código.",
            duration: 50,
            order: 3
          }
        ]
      },
      {
        title: "Docker e Containers",
        description: "Containerização de aplicações",
        order: 2,
        lessons: [
          {
            title: "Introdução ao Docker",
            content: "# Docker Básico\n\nConceitos de images, containers, volumes e networks.",
            duration: 45,
            order: 1
          },
          {
            title: "Dockerfile e Docker Compose",
            content: "# Criando Containers\n\nEscreva Dockerfiles e orquestre múltiplos containers com Docker Compose.",
            duration: 55,
            order: 2
          },
          {
            title: "Deploy com Docker",
            content: "# Deploy de Aplicações\n\nPublique suas aplicações em produção usando Docker e registries.",
            duration: 50,
            order: 3
          }
        ]
      },
      {
        title: "CI/CD e DevOps",
        description: "Automação de deploy e integração contínua",
        order: 3,
        lessons: [
          {
            title: "Integração Contínua",
            content: "# CI - Continuous Integration\n\nAutomatize testes e builds com GitHub Actions, GitLab CI ou Jenkins.",
            duration: 50,
            order: 1
          },
          {
            title: "Deploy Contínuo",
            content: "# CD - Continuous Deployment\n\nAutomatize deploys para staging e produção com pipelines.",
            duration: 55,
            order: 2
          },
          {
            title: "Monitoramento e Logs",
            content: "# Observabilidade\n\nMonitore aplicações em produção com logs, métricas e alertas.",
            duration: 45,
            order: 3
          }
        ]
      }
    ]
  }
];

async function seedCourses() {
  console.log("🌱 Iniciando seed de cursos...");

  for (const courseData of coursesData) {
    const { modules: modulesData, ...courseInfo } = courseData;
    
    // Criar curso
    const [courseResult] = await db.insert(courses).values(courseInfo);
    const courseId = Number(courseResult.insertId);
    console.log(`✅ Curso criado: ${courseInfo.title} (ID: ${courseId})`);

    // Criar módulos e aulas
    for (const moduleData of modulesData) {
      const { lessons: lessonsData, ...moduleInfo } = moduleData;
      
      const [moduleResult] = await db.insert(modules).values({
        ...moduleInfo,
        courseId
      });
      const moduleId = Number(moduleResult.insertId);
      console.log(`  📚 Módulo criado: ${moduleInfo.title} (ID: ${moduleId})`);

      // Criar aulas
      for (const lessonData of lessonsData) {
        await db.insert(lessons).values({
          ...lessonData,
          moduleId
        });
        console.log(`    📝 Aula criada: ${lessonData.title}`);
      }
    }
  }

  console.log("\n🎉 Seed concluído com sucesso!");
}

seedCourses().catch(console.error);
