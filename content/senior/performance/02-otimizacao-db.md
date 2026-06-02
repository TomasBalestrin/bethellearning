---
title: "Otimização de Banco de Dados"
keywords: ["performance", "banco de dados", "index", "n+1", "senior"]
module: "Performance e Observabilidade"
lesson: "02 - Otimização de Banco de Dados"
---

# Aula 02 - Otimização de Banco de Dados (O Coração da Performance)

## 🎯 O Conceito (Pareto 80/20)

Se o seu site está lento, em 95% das vezes, o problema NÃO é o JavaScript, o Node.js, ou o Servidor da AWS. O problema é como o seu código está conversando com o Banco de Dados.

Desenvolvedores que usam ORMs modernos (Prisma, TypeORM, Hibernate) muitas vezes não fazem ideia das queries SQL que estão sendo geradas por baixo dos panos. Um comando lindo no TypeScript pode estar gerando um monstro lento no PostgreSQL.

**O Pareto da Otimização de DB (Os 3 Cavaleiros da Lerdeza):**
1. **Ausência de Índices (Table Scan):** Buscar o usuário pelo e-mail sem ter um Índice no e-mail faz o banco ler 10 milhões de linhas uma por uma para achar o cara.
2. **O Problema do N+1 (Consultas em Loop):** Fazer um `SELECT` dentro de um `for`.
3. **Buscar dados inúteis (`SELECT *`):** Puxar 50 colunas do banco quando você só precisava mostrar o Nome do cliente na tela.

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: O Problema do N+1 (O Assassino Silencioso)
Você quer listar os 10 Post do Blog, e mostrar o nome do Autor de cada Post.
O Dev inexperiente faz isso:

```typescript
// ❌ O CRIME DO N+1
// Query 1: Busca 10 posts.
const posts = await prisma.post.findMany({ take: 10 }); 

for (let post of posts) {
  // Query N: Vai no banco DE NOVO a cada iteração buscar o autor.
  const autor = await prisma.user.findUnique({ where: { id: post.authorId } });
  console.log(`Post: ${post.title} | Autor: ${autor.name}`);
}
```
**O Resultado:** Você foi no banco de dados **11 vezes** para carregar 1 única página.

```typescript
// ✅ A SOLUÇÃO: JOINS e Eager Loading
// Vai no banco UMA única vez, e pede pro banco já juntar (Join) o Autor junto com o Post.
const postsComAutores = await prisma.post.findMany({
  take: 10,
  include: { author: true } // O Prisma resolve tudo em 1 query SQL!
});

// Agora iteramos apenas na memória RAM. Custo de banco: ZERO!
for (let post of postsComAutores) {
  console.log(`Post: ${post.title} | Autor: ${post.author.name}`);
}
```

### Passo 2: Índices (O Dicionário do SQL)
Imagine procurar o significado da palavra "Zebra" num Dicionário sem ordem alfabética. Você teria que ler o livro da página 1 até o final (Table Scan / Full Scan). O Dicionário em ordem alfabética é um **Índice**.

Se a sua tela de Login busca os usuários por e-mail:
`SELECT * FROM users WHERE email = 'joao@email.com'`

Sem um índice, o Postgres lê 1 milhão de usuários para achar o João (demora 3 segundos).
Com um índice criado na coluna `email`, o banco vai direto na letra J e acha o João (demora 2 milissegundos).

**Atenção:** Se Índices deixam tudo rápido, por que não botar Índice em todas as colunas?
Porque o Índice pesa! Cada vez que um usuário NOVO se cadastra (Escrita/Insert), o Banco precisa salvar o dado na tabela E reordenar o Índice. Ter muitos índices destrói a performance de inserção. Coloque índices APENAS nas colunas que você usa dentro da cláusula `WHERE`.

### Passo 3: Paginação Responsável
Se o banco tem 1 milhão de linhas, não puxe 1 milhão de linhas pra tela (`SELECT * FROM vendas`).
Use `LIMIT` e `OFFSET` para buscar blocos de 50. (A famosa Paginação).
Para sistemas massivos estilo Feed de Twitter (onde novas linhas são adicionadas a cada milissegundo), o `OFFSET` quebra. A solução sênior é a **Cursor-based Pagination** (Buscar os próximos 50 a partir do ID do último post que você viu).

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Lentidão em Filtros Compostos
**O Sintoma:** Você tem índice no `nome` e índice no `status`. Mas quando você faz a busca `WHERE nome = 'Ana' AND status = 'Ativo'`, a consulta fica mega lenta.
**A Causa:** O banco de dados só consegue usar UM índice por tabela em cada consulta. Ele escolhe o índice de `nome` (lê todas as Anas), e para filtrar os "Ativos", ele faz a verificação na força bruta.
**A Solução Sênior:** *Compound Indexes (Índices Compostos).* Você cria um índice único que agrupa duas colunas (ex: `CREATE INDEX idx_nome_status ON users (nome, status);`).

### Erro 2: O Desastre do `LIKE '%termo%'`
**O Sintoma:** O cliente digita "Tenis" na barra de busca do e-commerce. Você faz `SELECT * FROM produtos WHERE titulo LIKE '%Tenis%'`. O banco de dados trava.
**A Causa:** O curinga `%` no COMEÇO da palavra impossibilita o uso de Índices (a ordem alfabética não serve se você pode achar o "Tenis" no meio da palavra "SuperTenisBranco"). A busca sempre fará Full Table Scan.
**A Solução:** Para sistemas reais de busca complexa de texto (Full Text Search), Abandone o banco relacional e instale um motor de busca projetado para isso, como o **Elasticsearch** ou Algolia. Se precisar ficar no Postgres, use índices específicos de texto do Postgres como o GIN/GIST, ou ferramentas de `tsvector`.

---

## 🚀 Desafio Prático

**Contexto:** Você está auditando o código de um microsserviço que envia o E-mail Diário de Promoções para todos os usuários que optaram por receber (`receberNewsletter = true`).
**Tarefa:**
O desenvolvedor júnior escreveu a query abaixo no banco PostgreSQL que possui 10 milhões de clientes (sendo que apenas 50 mil querem receber a newsletter).

`SELECT id, nome, email, hashSenha, enderecoCompleto, telefone FROM clientes WHERE receberNewsletter = true;`

Aponte **dois problemas gravíssimos de performance e segurança** nesta instrução SQL e reescreva a consulta com a correção exata que um Sênior aprovaria num Code Review.
