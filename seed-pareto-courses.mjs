import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'learning_platform',
});

const paretoData = {
  junior: {
    title: 'Trilha Junior - Fundamentos (Pareto 80/20)',
    description: 'Os 4 conceitos essenciais que geram 80% dos resultados para um Dev Junior: Lógica de Programação, Git + GitHub, JavaScript Moderno (ES6+) e HTML + CSS Avançado.',
    modules: [
      {
        title: 'Lógica de Programação',
        lessons: [
          {
            title: 'Fundamentos de Lógica (Variáveis, Condicionais, Loops)',
            content: 'Lógica de programação é a base de tudo. Variáveis armazenam valores. Use let e const em JavaScript. Condicionais (if/else, switch) executam código baseado em condições. Loops (for, while, for...of) repetem código. Escopo define onde variáveis podem ser acessadas. Exercício: Escreva um programa que peça um número e diga se é par ou ímpar.',
            video_url: 'https://www.youtube.com/embed/Ptbk2af68e8',
          },
          {
            title: 'Funções e Escopo',
            content: 'Funções são blocos reutilizáveis que executam tarefas. Arrow functions são modernas e concisas. Parâmetros são valores passados, retorno é o resultado. Variáveis dentro de funções são locais. Funções internas acessam variáveis da função externa (closure). Callbacks são funções passadas como parâmetro.',
            video_url: 'https://www.youtube.com/embed/AIhHVzZbDU8',
          },
          {
            title: 'Arrays e Objetos',
            content: 'Arrays são listas de valores acessados por índice. Objetos são coleções de pares chave-valor. Métodos importantes: push, pop, map, filter, find. Desestruturação extrai valores de forma elegante. Spread operator (...) expande arrays e objetos.',
            video_url: 'https://www.youtube.com/embed/SqQZ7PweVWk',
          },
        ],
      },
      {
        title: 'Git + GitHub',
        lessons: [
          {
            title: 'Fundamentos de Git (init, add, commit, push, pull)',
            content: 'Git é um sistema de controle de versão que rastreia mudanças no código. git init cria um repositório. git add prepara arquivos. git commit salva mudanças. git push envia para servidor. git pull baixa commits. Sempre faça pull antes de push.',
            video_url: 'https://www.youtube.com/embed/DqjKEDOujRM',
          },
          {
            title: 'Branches e Merge',
            content: 'Branches permitem trabalhar em features isoladas. git branch cria nova branch. git checkout -b cria e troca. git merge integra branch. Git Flow: main (produção), develop (desenvolvimento), feature branches. Pull requests permitem code review.',
            video_url: 'https://www.youtube.com/embed/xQujzeoHMuk',
          },
          {
            title: 'GitHub e Colaboração em Equipe',
            content: 'GitHub é a plataforma mais popular para hospedar repositórios. Adicione colaboradores nas settings. Cada um trabalha em sua branch. Issues para rastrear bugs. Projects para organizar tarefas. GitHub Pages para hospedar sites.',
            video_url: 'https://www.youtube.com/embed/w3jLJU7DT5E',
          },
        ],
      },
      {
        title: 'JavaScript Moderno (ES6+)',
        lessons: [
          {
            title: 'ES6 Essencial (let/const, arrow functions, template literals)',
            content: 'ES6 modernizou JavaScript. Var é antigo, evite. Let permite reatribuição, const não. Arrow functions: const add = (a, b) => a + b. Template literals: `Olá ${nome}`. Desestruturação: const {nome, idade} = pessoa. Spread operator: ...array.',
            video_url: 'https://www.youtube.com/embed/nZ1DMMsyVmw',
          },
          {
            title: 'Array Methods (map, filter, reduce, find)',
            content: 'Map transforma cada elemento. Filter filtra baseado em condição. Reduce reduz a um único valor. Find encontra primeiro elemento. Some verifica se algum passa. Every verifica se todos passam. Includes verifica se contém.',
            video_url: 'https://www.youtube.com/embed/R8rmfD9Y5-c',
          },
          {
            title: 'Promises e Async/Await',
            content: 'Callbacks são funções passadas como parâmetro. Promises representam valores futuros. Estados: pending, fulfilled, rejected. Async/await é sintaxe mais limpa. Await pausa execução até promise resolver. Trate erros com try/catch.',
            video_url: 'https://www.youtube.com/embed/PoRJizFVH94',
          },
        ],
      },
      {
        title: 'HTML + CSS Avançado',
        lessons: [
          {
            title: 'HTML Semântico e Forms',
            content: 'HTML semântico usa tags que descrevem significado. Header, nav, main, article, section, aside, footer. Benefícios: melhor SEO, acessibilidade, manutenção. Forms: input, label, button, textarea, select. Validação nativa com required, type="email".',
            video_url: 'https://www.youtube.com/embed/qz0aGYrrlhU',
          },
          {
            title: 'Flexbox e CSS Grid',
            content: 'Flexbox: display flex, alinha em linha ou coluna. Propriedades: justify-content, align-items, flex-direction. Grid: display grid, layout 2D. Propriedades: grid-template-columns, grid-template-rows. Flexbox para 1D, Grid para 2D.',
            video_url: 'https://www.youtube.com/embed/JJSoEo8JSnc',
          },
          {
            title: 'Responsividade e Mobile-First',
            content: 'Meta viewport essencial para mobile. Media queries para diferentes tamanhos. Mobile-first: comece com mobile, adicione media queries para desktop. Unidades: em, rem, %, vw, vh. Imagens responsivas com max-width 100%.',
            video_url: 'https://www.youtube.com/embed/srvUrASNj0s',
          },
        ],
      },
    ],
  },
  pleno: {
    title: 'Trilha Pleno - Impacto (Pareto 80/20)',
    description: 'Os 4 conceitos que separam um Junior de um Pleno: JavaScript/TypeScript Avançado, Arquitetura e Design de Código, APIs e Backend Integration, Testes e Qualidade.',
    modules: [
      {
        title: 'JavaScript / TypeScript Avançado',
        lessons: [
          {
            title: 'TypeScript Essencial (Tipos, Interfaces, Generics)',
            content: 'TypeScript adiciona tipos a JavaScript. Tipos primitivos: number, string, boolean. Interfaces definem contratos. Generics permitem reutilização com tipos. Union types: string | number. Optional: ?. Readonly: readonly. Benefícios: detecção de erros, autocompletar, documentação.',
            video_url: 'https://www.youtube.com/embed/d56mG7DQqqM',
          },
          {
            title: 'Closures, Prototypes e This',
            content: 'Closures: funções que acessam variáveis do escopo externo. Prototypes: herança em JavaScript. This: referência ao objeto. Bind, call, apply: controlam this. Arrow functions não têm seu próprio this. Classes: sintaxe moderna para prototypes.',
            video_url: 'https://www.youtube.com/embed/71AtaJpJoO8',
          },
          {
            title: 'Performance (Memoization, Debouncing, Throttling)',
            content: 'Memoization: cachear resultados de funções. Debouncing: aguardar antes de executar. Throttling: limitar frequência de execução. Lazy loading: carregar sob demanda. Code splitting: dividir bundle. Profiling: medir performance.',
            video_url: 'https://www.youtube.com/embed/cjIswDCKgu0',
          },
        ],
      },
      {
        title: 'Arquitetura e Design de Código',
        lessons: [
          {
            title: 'Princípios SOLID',
            content: 'S - Single Responsibility: uma classe, uma responsabilidade. O - Open/Closed: aberta para extensão, fechada para modificação. L - Liskov Substitution: subclasses devem ser substituíveis. I - Interface Segregation: interfaces específicas. D - Dependency Inversion: dependa de abstrações.',
            video_url: 'https://www.youtube.com/embed/rtmFCcjEJEE',
          },
          {
            title: 'Clean Architecture e Padrões de Design',
            content: 'Clean Architecture: separação de camadas. Padrões: Singleton, Factory, Observer, Strategy, Adapter. MVC: Model, View, Controller. MVP: Model, View, Presenter. MVVM: Model, View, ViewModel. Escolha baseado no projeto.',
            video_url: 'https://www.youtube.com/embed/o_TH-Y78tt4',
          },
          {
            title: 'State Management Escalável',
            content: 'Redux: centraliza estado. Actions: eventos. Reducers: atualizam estado. Selectors: extraem dados. Middleware: intercepta actions. Alternativas: Zustand, Recoil, MobX. Escolha baseado na complexidade.',
            video_url: 'https://www.youtube.com/embed/CVpUuw9VSK4',
          },
        ],
      },
      {
        title: 'APIs e Backend Integration',
        lessons: [
          {
            title: 'REST + HTTP Avançado',
            content: 'REST: Representational State Transfer. Métodos HTTP: GET (ler), POST (criar), PUT (atualizar), DELETE (deletar), PATCH (atualizar parcial). Status codes: 200 (ok), 201 (criado), 400 (erro), 401 (não autorizado), 404 (não encontrado), 500 (erro servidor).',
            video_url: 'https://www.youtube.com/embed/SLwpqD8n3d0',
          },
          {
            title: 'Autenticação Avançada (JWT, OAuth2)',
            content: 'JWT: token com payload e assinatura. Armazene em localStorage ou cookie. OAuth2: delegue autenticação. Fluxos: Authorization Code, Implicit, Client Credentials. Refresh tokens: renovem acesso. Revogação: invalide tokens.',
            video_url: 'https://www.youtube.com/embed/7Q17ubqLrHo',
          },
          {
            title: 'Integração com Bancos de Dados',
            content: 'ORMs: Sequelize, TypeORM, Prisma. Queries: select, insert, update, delete. Relacionamentos: one-to-one, one-to-many, many-to-many. Migrations: versionem schema. Seeds: dados iniciais. Índices: otimizem queries.',
            video_url: 'https://www.youtube.com/embed/0x45yq6l0N0',
          },
        ],
      },
      {
        title: 'Testes e Qualidade de Código',
        lessons: [
          {
            title: 'Testes Unitários com Jest',
            content: 'Jest: framework de testes. Describe: agrupa testes. It/test: define teste. Expect: assertions. Mocks: simulam dependências. Spies: rastreiam chamadas. Coverage: porcentagem de código testado. Objetivo: >80% de cobertura.',
            video_url: 'https://www.youtube.com/embed/7r4xVZIrMZ8',
          },
          {
            title: 'Testes de Integração',
            content: 'Testam múltiplos componentes juntos. Fixtures: dados de teste. Factories: criam objetos. Testcontainers: bancos em Docker. Supertest: testa APIs. Verificam fluxos reais. Mais lentos que unitários.',
            video_url: 'https://www.youtube.com/embed/aqz5K2gMKUs',
          },
          {
            title: 'TDD e Code Coverage',
            content: 'TDD: Test-Driven Development. Red-Green-Refactor: escreva teste (falha), implemente (passa), refatore. Benefícios: design melhor, menos bugs, documentação. Coverage: statement, branch, function, line. Ferramentas: Istanbul, Nyc.',
            video_url: 'https://www.youtube.com/embed/Jv2uxzhPFl4',
          },
        ],
      },
    ],
  },
  senior: {
    title: 'Trilha Sênior - Estratégia (Pareto 80/20)',
    description: 'Os 4 conceitos que definem um Sênior: System Design & Arquitetura de Sistemas, Liderança Técnica & Mentoring, Performance/Escalabilidade/Observabilidade e Estratégia Técnica.',
    modules: [
      {
        title: 'System Design & Arquitetura de Sistemas',
        lessons: [
          {
            title: 'Design de Sistemas Distribuídos',
            content: 'Distribuição: múltiplos servidores. Escalabilidade horizontal: adicione servidores. Consistência: dados sincronizados. Disponibilidade: sistema sempre ativo. Particionamento: divida dados. Load balancing: distribua requisições. Replicação: cópias de dados.',
            video_url: 'https://www.youtube.com/embed/gSvqn2_-U0s',
          },
          {
            title: 'Microservices vs Monólito',
            content: 'Monólito: uma aplicação. Vantagens: simples, performance. Desvantagens: difícil escalar, deploy tudo. Microservices: múltiplos serviços. Vantagens: escalável, independente. Desvantagens: complexo, distribuído. Escolha baseado no projeto.',
            video_url: 'https://www.youtube.com/embed/wgdBVIX9ifA',
          },
          {
            title: 'Padrões Avançados (Event-Driven, CQRS, Circuit Breaker)',
            content: 'Event-Driven: baseado em eventos. CQRS: separe leitura e escrita. Circuit Breaker: falhe rápido. Saga: transações distribuídas. Bulkhead: isolamento de recursos. Retry: tente novamente. Timeout: limite de tempo.',
            video_url: 'https://www.youtube.com/embed/STKCRSUsyP0',
          },
        ],
      },
      {
        title: 'Liderança Técnica & Mentoring',
        lessons: [
          {
            title: 'Liderança de Equipes Técnicas',
            content: 'Visão: defina direção. Comunicação: seja claro. Decisões: tome baseado em dados. Delegação: confie na equipe. Feedback: contínuo e construtivo. Conflitos: resolva rápido. Motivação: reconheça esforço.',
            video_url: 'https://www.youtube.com/embed/hnpFLBUQ0g4',
          },
          {
            title: 'Code Review e Mentoring',
            content: 'Code review: qualidade e conhecimento. Feedback: específico e educativo. Mentoring: guie desenvolvimento. Pair programming: programem juntos. Knowledge sharing: apresentações. Documentation: mantenha atualizada.',
            video_url: 'https://www.youtube.com/embed/eJxcupx_CHE',
          },
          {
            title: 'Comunicação Técnica e Decisões',
            content: 'Apresentações: claras e concisas. Documentação: escreva bem. Decisões: documente trade-offs. ADRs: Architecture Decision Records. Reuniões: eficientes. Escuta ativa: entenda problemas.',
            video_url: 'https://www.youtube.com/embed/HAnw168huqA',
          },
        ],
      },
      {
        title: 'Performance, Escalabilidade e Observabilidade',
        lessons: [
          {
            title: 'Otimização de Performance',
            content: 'Profiling: meça onde gasta tempo. Caching: armazene resultados. Índices: acelere queries. Lazy loading: carregue sob demanda. Code splitting: divida bundle. Minificação: reduza tamanho. Compressão: gzip, brotli.',
            video_url: 'https://www.youtube.com/embed/0fONene3OIA',
          },
          {
            title: 'Escalabilidade Horizontal e Vertical',
            content: 'Vertical: máquina mais poderosa. Horizontal: mais máquinas. Load balancing: distribua carga. Stateless: sem estado local. Database sharding: divida dados. Caching distribuído: Redis, Memcached. Auto-scaling: aumente conforme demanda.',
            video_url: 'https://www.youtube.com/embed/xpDnVSmNFwY',
          },
          {
            title: 'Monitoring, Logging e Observabilidade',
            content: 'Monitoring: métricas em tempo real. Logging: registre eventos. Tracing: rastreie requisições. Alertas: notifique problemas. Dashboards: visualize dados. SLOs: objetivos de nível de serviço. Ferramentas: Prometheus, ELK, Datadog.',
            video_url: 'https://www.youtube.com/embed/W7_q2a48Hnc',
          },
        ],
      },
      {
        title: 'Estratégia Técnica e Tomada de Decisão',
        lessons: [
          {
            title: 'Trade-offs Técnicos',
            content: 'Velocidade vs Qualidade. Simplicidade vs Flexibilidade. Performance vs Legibilidade. Custo vs Funcionalidade. Documente decisões. Revise periodicamente. Comunique trade-offs.',
            video_url: 'https://www.youtube.com/embed/RTEgQnrf0Ow',
          },
          {
            title: 'Roadmap Técnico e Planejamento',
            content: 'Visão de longo prazo. Prioridades: impacto e esforço. Sprints: planejamento curto. Retrospectivas: melhore processo. Riscos: identifique antecipadamente. Dependências: mapeie relacionamentos.',
            video_url: 'https://www.youtube.com/embed/a1zDuOPkMSw',
          },
          {
            title: 'Evolução Arquitetural',
            content: 'Refatoração: melhore código. Migrations: mude tecnologia. Deprecação: remova antigo. Compatibilidade: mantenha interfaces. Versioning: controle mudanças. Testes: valide mudanças.',
            video_url: 'https://www.youtube.com/embed/CZ3wIuvmHeM',
          },
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
          const [lessonResult] = await connection.execute(
            'INSERT INTO lessons (module_id, title, content, video_url, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [moduleId, lesson.title, lesson.content, lesson.video_url]
          );

          console.log(`    ✏️  Aula criada: ${lesson.title}`);
        }
      }
    }

    console.log('\n✨ Seed concluído com sucesso!');
    console.log('📊 Resumo:');
    console.log('  - 3 trilhas criadas (Junior, Pleno, Sênior)');
    console.log('  - 12 módulos criados');
    console.log('  - 36 aulas criadas');

  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedCourses();
