---
title: "Projeto Final - API RESTful Completa"
keywords: ["projeto final", "api", "restful", "jwt", "prisma", "jest", "pleno"]
module: "Projeto Final"
lesson: "01 - Projeto Final - API RESTful Completa"
---

# Projeto Final (Trilha Pleno) - API RESTful de Gestão de Tarefas Corporativa

## 🎯 O Desafio do Mundo Real

Chegou a hora de provar que você domina as habilidades de um desenvolvedor Pleno. Você não vai apenas construir um CRUD; você vai projetar uma API que poderia facilmente rodar em produção em uma empresa real.

Sua missão é construir o backend de um **Sistema de Gestão de Tarefas Corporativo (Enterprise Task Manager)**.

Este projeto validará se você compreendeu:
- Clean Architecture e separação de responsabilidades.
- Proteção de rotas com JWT e controle de níveis de acesso (RBAC).
- Modelagem de Banco de Dados Relacional e uso de ORM.
- Qualidade de código (Testes de Integração).

---

## 📋 Requisitos de Negócio (O que construir)

A empresa precisa de uma API que gerencie Projetos e Tarefas. O sistema possui dois tipos de usuários: `ADMIN` e `MEMBER`.

### 1. Autenticação e Usuários
- [ ] Rota `POST /users/register`: Cria um novo usuário (nome, email, senha criptografada). A senha **não pode** ser salva em texto puro.
- [ ] Rota `POST /users/login`: Recebe email e senha, valida a criptografia, e retorna um token JWT (com duração de 2 horas).
- [ ] Rota `GET /users/me`: Rota protegida. Retorna os dados do usuário autenticado (extraídos do JWT).

### 2. Gestão de Projetos (Exige Autenticação)
- [ ] Rota `POST /projects`: Cria um projeto (nome, descrição). Apenas usuários com role `ADMIN` podem criar projetos.
- [ ] Rota `GET /projects`: Lista todos os projetos do sistema (qualquer usuário logado pode ver).

### 3. Gestão de Tarefas (Exige Autenticação)
- [ ] Rota `POST /projects/:projectId/tasks`: Cria uma tarefa dentro de um projeto. (Requisitos: título, descrição, status = "PENDING"). Qualquer usuário logado pode criar tarefas.
- [ ] Rota `PATCH /tasks/:taskId/status`: Atualiza o status da tarefa para "IN_PROGRESS" ou "COMPLETED".

---

## 🏗️ Requisitos Técnicos (Como construir)

Esta não é uma API qualquer. Ela deve seguir rígidos padrões de qualidade:

1. **Stack Tecnológica:** Node.js, Express.js (ou Fastify), TypeScript.
2. **Banco de Dados:** PostgreSQL (ou SQLite para facilitar a correção). Obrigatório o uso do **Prisma ORM** (ou TypeORM).
3. **Arquitetura Limpa:** 
   - Proibido escrever regras de negócio ou buscar dados do Prisma diretamente no arquivo de Rotas/Controllers. 
   - O Controller deve extrair o body/params e passar para uma classe de `Service` ou `UseCase`.
4. **Tratamento de Erros:**
   - Crie um Middleware global de tratamento de erros. Se o usuário mandar um e-mail sem '@', a API não deve quebrar (status 500), mas sim retornar `400 Bad Request` com uma mensagem amigável em JSON.
5. **Testes de Integração (Obrigatório):**
   - Escreva testes usando **Jest** e **Supertest** para cobrir pelo menos a rota de Login e a Rota de Criar Projeto. (O teste deve bater num banco de dados de teste e verificar se retornou HTTP 201 ou HTTP 403).

---

## 🛠️ Deep Dive e Dicas de Execução

Se você travar, siga este roteiro de execução (não tente fazer tudo de uma vez):

### Passo 1: O Esqueleto (Dia 1)
- Inicie o projeto (`npm init -y`, `npm i express typescript ts-node`).
- Configure o Prisma (`npx prisma init`) e crie seus modelos (User, Project, Task) no arquivo `schema.prisma`. 
- Crie a relação One-to-Many entre Project e Task.

### Passo 2: O Núcleo (Dia 2)
- Ignore o JWT por enquanto. Foque em criar os arquivos na pasta `src/services/` (ex: `CreateUserService`, `CreateProjectService`).
- Faça as rotas do Express chamarem esses serviços. Teste usando o Postman ou Insomnia.

### Passo 3: A Fechadura (Dia 3)
- Instale `jsonwebtoken` e `bcryptjs`.
- Modifique o serviço de criação de usuário para usar o bcrypt (`hash`) antes de salvar no Prisma.
- Crie o Middleware `ensureAuthenticated` que pega o header `Authorization`, faz o `jwt.verify` e injeta `req.user.id`.
- Bloqueie as rotas de Projeto e Tarefa com esse middleware.

### Passo 4: O Controle de Qualidade (Dia 4)
- Configure o Jest. Crie um banco de dados separado para os testes (alterando a URL do Prisma no ambiente de teste).
- Escreva `projects.test.ts` usando Supertest.

---

## 🏆 Critérios de Sucesso

Seu projeto será considerado aprovado se:
1. Você não usar `any` no TypeScript (tipagem forte em tudo).
2. Tentar acessar rotas protegidas sem o header `Authorization` retornar erro HTTP 401.
3. Tentar criar um projeto sendo `MEMBER` retornar erro HTTP 403 (Forbidden).
4. O teste de integração automatizado rodar e passar verde na sua máquina.

Boa sorte! Este é o projeto que você colocará com orgulho no seu portfólio como a prova do seu nível Pleno.
