# Learning Platform - TODO

## ✅ Banco de Dados (Concluído)
- [x] Modelar tabela de usuários com campos adicionais (role, avatar, bio)
- [x] Criar tabela de trilhas de aprendizado
- [x] Criar tabela de módulos e etapas
- [x] Criar tabela de progresso do usuário
- [x] Criar tabela de exercícios
- [x] Criar tabela de submissões de exercícios
- [x] Criar tabela de pontos e XP
- [x] Criar tabela de badges/conquistas
- [x] Criar tabela de notificações
- [x] Criar tabela de integração GitHub
- [x] Executar migrations com pnpm db:push

## ✅ Backend - Autenticação (Concluído)
- [x] Implementar sistema de autenticação com usuário/senha
- [x] Criar procedure para registro de novos usuários
- [x] Criar procedure para login
- [x] Criar procedure para logout
- [x] Criar procedure para atualizar perfil
- [x] Criar procedure para listar usuários (admin)
- [x] Criar testes para autenticação

## ✅ Backend - Trilhas e Progresso (Concluído)
- [x] Criar helpers para trilhas de aprendizado
- [x] Criar procedure para listar trilhas
- [x] Criar procedure para obter detalhes de uma trilha
- [x] Criar procedure para marcar etapa como concluída
- [x] Criar procedure para obter progresso do usuário

## ✅ Backend - Gamificação (Concluído)
- [x] Criar helpers para sistema de pontos
- [x] Criar procedure para adicionar pontos
- [x] Criar procedure para listar badges
- [x] Criar procedure para conceder badge
- [x] Criar procedure para obter leaderboard

## ✅ Frontend - Dashboard Demo (Concluído)
- [x] Criar página de dashboard com estatísticas
- [x] Criar cards de métricas (nível, exercícios, sequência, ranking)
- [x] Criar visualização de trilhas de aprendizado
- [x] Criar sistema de badges/conquistas
- [x] Criar leaderboard corporativo

## ✅ Páginas Adicionais (Concluído)
- [x] Criar página de detalhes da trilha com módulos e etapas
- [x] Criar dashboard administrativo com progresso da equipe
- [x] Implementar visualização de progresso individual
- [x] Implementar métricas por trilha
- [x] Implementar feed de atividade recente

## 🚀 Próximas Melhorias (Futuras)
- [ ] Conectar frontend com backend real (substituir dados mock)
- [ ] Criar página de exercícios interativos com validação
- [ ] Implementar integração real com GitHub API
- [ ] Implementar integração real com Slack API
- [ ] Criar webhook para notificações de progresso
- [ ] Implementar sistema de busca na documentação
- [ ] Adicionar mais badges e conquistas
- [ ] Implementar sistema de comentários nas trilhas
- [ ] Adicionar certificados de conclusão
- [ ] Implementar modo escuro
- [ ] Criar testes end-to-end completos


## 🔐 Sistema de Login Funcional
- [x] Corrigir sistema de autenticação com cookies
- [x] Criar usuário admin (tomasbalestrin@gmail.com)
- [x] Substituir página demo por login real
- [x] Conectar frontend com backend via tRPC

## ✅ Gerenciamento de Usuários (Admin) - CONCLUÍDO
- [x] Criar página de gerenciamento de usuários
- [x] Implementar listagem de todos os usuários
- [x] Implementar criação de novos usuários
- [x] Implementar edição de usuários existentes
- [x] Implementar exclusão de usuários
- [x] Adicionar controle de permissões (apenas admin)

## ✅ Perfil do Usuário - CONCLUÍDO
- [x] Criar página de perfil do usuário
- [x] Exibir informações do usuário (nome, email, role, avatar)
- [x] Implementar botão de logout funcional
- [x] Adicionar formulário de edição de perfil
- [x] Adicionar link de acesso ao perfil no menu/header

## ✅ Sistema de Cursos - CONCLUÍDO
- [x] Implementar procedures tRPC para cursos (listar, criar, editar, excluir)
- [x] Implementar procedures tRPC para módulos (listar, criar, editar, excluir)
- [x] Implementar procedures tRPC para aulas (listar, criar, editar, excluir)
- [x] Criar página administrativa de gerenciamento de cursos
- [x] Criar formulários de criação/edição de cursos
- [x] Adicionar link no menu para gerenciar cursos (admin)
- [ ] Criar formulários de criação/edição de módulos
- [ ] Criar formulários de criação/edição de aulas
- [ ] Criar página de visualização de curso para alunos
- [ ] Implementar navegação entre aulas

## 📝 Conteúdo e Integração de Cursos
- [x] Criar 3 cursos completos (Iniciante, Intermediário, Avançado)
- [x] Adicionar módulos para cada curso
- [x] Adicionar aulas com conteúdo para cada módulo
- [x] Implementar página de gerenciamento de módulos e aulas
- [x] Criar página de visualização de curso para alunos
- [x] Conectar cursos reais ao dashboard
- [ ] Implementar sistema de progresso do usuário

## ✅ Conteúdo Educacional das Aulas - CONCLUÍDO
- [x] Criar conteúdo completo para as 9 aulas da Trilha Iniciante
- [x] Criar conteúdo completo para as 9 aulas da Trilha Intermediária
  - [x] JavaScript Fundamentos (3 aulas)
  - [x] React Básico (3 aulas)
  - [x] Bancos de Dados (3 aulas)
- [x] Criar conteúdo completo para as 9 aulas da Trilha Avançada
  - [x] Node.js e APIs (3 aulas)
  - [x] Arquitetura de Software (3 aulas)
  - [x] DevOps e Deploy (3 aulas)

## ✅ Editor de Código Interativo - CONCLUÍDO
- [x] Instalar e configurar Monaco Editor
- [x] Criar componente de editor de código
- [x] Integrar editor na página de visualização de aulas
- [x] Implementar validação automática de código JavaScript
- [x] Adicionar feedback instantâneo e mensagens de erro

## ✅ Expansão de Conteúdo Educacional - CONCLUÍDO
- [x] Expandir conteúdo da Trilha Intermediária (JavaScript, React, Bancos de Dados)
- [x] Expandir conteúdo da Trilha Avançada (Node.js, Arquitetura, DevOps)
- [x] Adicionar mais exemplos práticos e exercícios
- [x] Incluir diagramas e ilustrações quando apropriado

## 🎯 Exercícios Customizados por Aula
- [x] Adicionar campo de exercícios no schema das aulas
- [x] Criar exercícios para as 9 aulas da Trilha Iniciante
- [x] Criar exercícios para as 9 aulas da Trilha Intermediária
- [x] Criar exercícios para as 9 aulas da Trilha Avançada
- [x] Atualizar CourseView para exibir exercícios específicos da aula
- [x] Implementar validação automática com casos de teste

## 🎮 Transformar em Plataforma 100% Funcional
- [x] Criar tabelas de badges, user_badges e user_stats no banco
- [x] Implementar sistema de progresso real (marcar aulas como concluídas)
- [x] Implementar sistema de XP (ganhar pontos ao completar aulas)
- [x] Implementar sistema de badges (desbloquear conquistas)
- [ ] Implementar leaderboard real baseado em XP dos usuários
- [x] Atualizar dashboard para calcular estatísticas reais
  - [x] Substituir nível mockado por nível real do usuário
  - [x] Substituir XP mockado por XP real do banco
  - [x] Substituir exercícios mockados por aulas concluídas reais
  - [x] Substituir ranking mockado por posição real no leaderboard
  - [x] Calcular progresso real dos cursos
- [ ] Remover todos os dados mockados

## 🏆 Página de Perfil com Badges
- [x] Criar componente de página de perfil
- [x] Exibir informações do usuário (nome, email, avatar)
- [x] Exibir estatísticas (XP, nível, aulas concluídas)
- [x] Listar todos os badges disponíveis
- [x] Destacar badges conquistados em cores
- [x] Mostrar badges bloqueados em cinza
- [x] Adicionar barra de progresso para cada badge
- [x] Mostrar requisitos para desbloquear badges
- [x] Adicionar rota e link de navegação

## 📚 Expandir Conteúdo Educacional Aprofundado (~2500 palavras/aula)
- [x] Expandir conteúdo das 3 aulas de React (Trilha Intermediária) - COMPLETO
- [x] Expandir conteúdo das 3 aulas de Bancos de Dados (Trilha Intermediária)
- [x] Expandir conteúdo das 3 aulas de Node.js (Trilha Avançada)
- [x] Expandir conteúdo das 3 aulas de Arquitetura (Trilha Avançada)
- [x] Expandir conteúdo das 3 aulas de DevOps (Trilha Avançada)
- [x] Garantir que todas as aulas tenham exemplos práticos completos
- [x] Adicionar seções "Na Prática" e "Próximos Passos" em todas as aulas

## 🔥 Sistema de Streaks (Dias Consecutivos)
- [x] Adicionar campos current_streak, longest_streak, last_activity_date na tabela user_stats
- [x] Implementar lógica de atualização de streak no backend (checkAndUpdateStreak)
- [x] Criar badges especiais para streaks (7, 30, 100 dias consecutivos)
- [x] Atualizar procedure completeLesson para chamar atualização de streak
- [x] Adicionar card de streak no dashboard principal
- [x] Mostrar streak atual e recorde no perfil do usuário
- [x] Testar lógica de streak (manter, quebrar, resetar)

## ✅ Trilhas Especializadas (CONCLUÍDO)
- [x] Criar Trilha Especializada: Mobile Development (React Native, Flutter, iOS/Android)
  - [x] Aula 1: Fundamentos de Mobile (Diferenças Web vs Mobile, Frameworks)
  - [x] Aula 2: React Native Básico (Setup, Componentes, Navigation)
  - [x] Aula 3: React Native Avançado (Hooks, Performance, Native Modules)
  - [x] Aula 4: Flutter Fundamentos (Dart, Widgets, Hot Reload)
  - [x] Aula 5: Flutter UI/UX (Material Design, Animações)
  - [x] Aula 6: Integração com APIs em Mobile (HTTP, WebSockets)
  - [x] Aula 7: Persistência de Dados (SQLite, Shared Preferences)
  - [x] Aula 8: Publicação em App Stores (iOS, Android, TestFlight)
  - [x] Aula 9: Otimização e Monitoramento Mobile (Performance, Crashes)

- [x] Criar Trilha Especializada: Cloud & DevOps Avançado (AWS, Azure, GCP)
  - [x] Aula 1: Fundamentos de Cloud Computing (IaaS, PaaS, SaaS)
  - [x] Aula 2: AWS Essentials (EC2, S3, RDS, Lambda)
  - [x] Aula 3: Azure Essentials (VMs, App Service, SQL Database)
  - [x] Aula 4: Google Cloud Platform (Compute Engine, Cloud Storage)
  - [x] Aula 5: Containerização com Docker (Images, Containers, Docker Compose)
  - [x] Aula 6: Orquestração com Kubernetes (Pods, Services, Deployments)
  - [x] Aula 7: CI/CD Pipelines (GitHub Actions, GitLab CI, Jenkins)
  - [x] Aula 8: Infraestrutura como Código (Terraform, CloudFormation)
  - [x] Aula 9: Monitoramento e Logging (CloudWatch, Datadog, ELK Stack)

- [x] Criar Trilha Especializada: Segurança & Compliance
  - [x] Aula 1: Fundamentos de Segurança (OWASP Top 10, Princípios)
  - [x] Aula 2: Criptografia (Simétrica, Assimétrica, Hashing)
  - [x] Aula 3: Autenticação & Autorização (OAuth, JWT, SAML)
  - [x] Aula 4: Segurança em APIs (Rate Limiting, CORS, API Keys)
  - [x] Aula 5: Segurança de Banco de Dados (SQL Injection, Prepared Statements)
  - [x] Aula 6: Segurança em Frontend (XSS, CSRF, Content Security Policy)
  - [x] Aula 7: Compliance & Regulamentações (LGPD, GDPR, PCI-DSS)
  - [x] Aula 8: Testes de Segurança (Penetration Testing, SAST, DAST)
  - [x] Aula 9: Resposta a Incidentes (Detecção, Análise, Remediação)

## 📚 Expansão de Conteúdo Existente (Em Progresso)
- [ ] Expandir Trilha Iniciante com mais exemplos e exercícios
  - [ ] Aula 1: Introdução à Programação - Adicionar 5 novos exercícios práticos
  - [ ] Aula 2: Variáveis e Tipos - Adicionar diagramas de tipos e conversões
  - [ ] Aula 3: Operadores e Expressões - Adicionar tabela de precedência
  - [ ] Aula 4: Estruturas de Controle - Adicionar fluxogramas
  - [ ] Aula 5: Funções - Adicionar exemplos de escopo e closures
  - [ ] Aula 6: Arrays e Objetos - Adicionar visualizações de estrutura
  - [ ] Aula 7: Manipulação de Strings - Adicionar tabela de métodos
  - [ ] Aula 8: Debugging - Adicionar guia de ferramentas
  - [ ] Aula 9: Boas Práticas - Adicionar checklist de código

- [ ] Expandir Trilha Intermediária com casos de uso reais
  - [ ] JavaScript: Adicionar projetos reais (validador de formulário, calculadora)
  - [ ] React: Adicionar padrões avançados (Context API, Custom Hooks)
  - [ ] Bancos de Dados: Adicionar otimizações e índices

- [ ] Expandir Trilha Avançada com arquiteturas modernas
  - [ ] Node.js: Adicionar padrões de design (Factory, Singleton, Observer)
  - [ ] Arquitetura: Adicionar exemplos de microserviços
  - [ ] DevOps: Adicionar estratégias de deployment

## 🎥 Expansão de Conteúdo + Vídeos Externos
- [ ] Adicionar campo video_url no schema da tabela lessons
- [ ] Expandir Trilha Intermediária (9 aulas) com conteúdo aprofundado + vídeos
  - [ ] JavaScript Fundamentos (3 aulas)
  - [ ] React Básico (3 aulas)
  - [ ] Bancos de Dados (3 aulas)
- [ ] Expandir Trilha Avançada (9 aulas) com conteúdo aprofundado + vídeos
  - [ ] Node.js e APIs (3 aulas)
  - [ ] Arquitetura de Software (3 aulas)
  - [ ] DevOps e Deploy (3 aulas)
- [ ] Expandir Trilhas Especializadas (27 aulas) com conteúdo aprofundado + vídeos
  - [ ] Mobile Development (9 aulas)
  - [ ] Cloud & DevOps (9 aulas)
  - [ ] Segurança & Compliance (9 aulas)
- [ ] Atualizar componente CourseView para exibir vídeos embutidos
- [ ] Testar visualização de vídeos em todas as aulas


---

## 🎯 REESTRUTURAÇÃO PARETO (80/20) - NOVA ESTRUTURA

### Fase 1: Planejamento e Preparação
- [x] Deletar trilhas antigas (Iniciante, Intermediária, Avançada, Mobile, Cloud, Segurança)
- [x] Criar 3 novas trilhas (Junior, Pleno, Sênior)
- [x] Criar 36 aulas totais (12 por trilha)

### Trilha Junior - Os 4 Conceitos Essenciais (12 aulas)

#### 1. Lógica de Programação (3 aulas)
- [ ] Aula 1: Fundamentos de Lógica (Variáveis, Condicionais, Loops)
- [ ] Aula 2: Funções e Escopo
- [ ] Aula 3: Arrays e Objetos

#### 2. Git + GitHub (3 aulas)
- [ ] Aula 1: Fundamentos de Git (init, add, commit, push, pull)
- [ ] Aula 2: Branches e Merge
- [ ] Aula 3: GitHub e Colaboração em Equipe

#### 3. JavaScript Moderno (ES6+) (3 aulas)
- [ ] Aula 1: ES6 Essencial (let/const, arrow functions, template literals)
- [ ] Aula 2: Array Methods (map, filter, reduce, find)
- [ ] Aula 3: Promises e Async/Await

#### 4. HTML + CSS Avançado (3 aulas)
- [ ] Aula 1: HTML Semântico e Forms
- [ ] Aula 2: Flexbox e CSS Grid
- [ ] Aula 3: Responsividade e Mobile-First

### Trilha Pleno - Os 4 Conceitos de Impacto (12 aulas)

#### 1. JavaScript / TypeScript Avançado (3 aulas)
- [ ] Aula 1: TypeScript Essencial (Tipos, Interfaces, Generics)
- [ ] Aula 2: Closures, Prototypes e This
- [ ] Aula 3: Performance (Memoization, Debouncing, Throttling)

#### 2. Arquitetura e Design de Código (3 aulas)
- [ ] Aula 1: Princípios SOLID
- [ ] Aula 2: Clean Architecture e Padrões de Design
- [ ] Aula 3: State Management Escalável

#### 3. APIs e Backend Integration (3 aulas)
- [ ] Aula 1: REST + HTTP Avançado
- [ ] Aula 2: Autenticação Avançada (JWT, OAuth2)
- [ ] Aula 3: Integração com Bancos de Dados

#### 4. Testes e Qualidade de Código (3 aulas)
- [ ] Aula 1: Testes Unitários com Jest
- [ ] Aula 2: Testes de Integração
- [ ] Aula 3: TDD e Code Coverage

### Trilha Sênior - Os 4 Conceitos Estratégicos (12 aulas)

#### 1. System Design & Arquitetura de Sistemas (3 aulas)
- [ ] Aula 1: Design de Sistemas Distribuídos
- [ ] Aula 2: Microservices vs Monólito
- [ ] Aula 3: Padrões Avançados (Event-Driven, CQRS, Circuit Breaker)

#### 2. Liderança Técnica & Mentoring (3 aulas)
- [ ] Aula 1: Liderança de Equipes Técnicas
- [ ] Aula 2: Code Review e Mentoring
- [ ] Aula 3: Comunicação Técnica e Decisões

#### 3. Performance, Escalabilidade e Observabilidade (3 aulas)
- [ ] Aula 1: Otimização de Performance
- [ ] Aula 2: Escalabilidade Horizontal e Vertical
- [ ] Aula 3: Monitoring, Logging e Observabilidade

#### 4. Estratégia Técnica e Tomada de Decisão (3 aulas)
- [ ] Aula 1: Trade-offs Técnicos
- [ ] Aula 2: Roadmap Técnico e Planejamento
- [ ] Aula 3: Evolução Arquitetural

### Fase 2: Expansão de Conteúdo
- [ ] Expandir 36 aulas com ~3000+ palavras cada
- [ ] Adicionar vídeos YouTube relevantes em todas as aulas
- [ ] Adicionar exemplos práticos de código
- [ ] Adicionar diagramas e visualizações

### Fase 3: Testes e Deploy
- [ ] Verificar visualização de todas as aulas
- [ ] Testar sistema de progresso
- [ ] Testar gamificação (XP, badges, streaks)
- [ ] Salvar checkpoint final
