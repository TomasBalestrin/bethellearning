---
title: "Integração com Bancos de Dados e ORMs"
keywords: ["banco de dados", "orm", "sql", "prisma", "typeorm", "pleno"]
module: "APIs e Backend Integration"
lesson: "03 - Integração com Bancos de Dados e ORMs"
---

# Aula 03 - Integração com Bancos de Dados e ORMs

## 🎯 O Conceito (Pareto 80/20)

Na transição para Pleno, escrever a Query SQL (`SELECT * FROM...`) é o menor dos seus problemas. Os problemas reais são:
1. **Migrations:** Como garantir que a coluna "idade" que você adicionou no seu computador vá parar no banco do servidor de produção na nuvem?
2. **Segurança:** Como impedir que um hacker digite SQL no campo de login e apague o banco inteiro (SQL Injection)?
3. **Performance:** O infame problema N+1, que derruba servidores por excesso de consultas repetidas.

O uso de **ORMs** (Object-Relational Mappers), como *Prisma* ou *TypeORM*, é o padrão da indústria de 80/20 porque resolve a Segurança (escapando os dados automaticamente) e as Migrations, além de prover tipagem com TypeScript.

---

## 💻 Deep Dive (Passo a Passo)

Neste Deep Dive, vamos entender a mecânica do **SQL Injection** e ver como um ORM (Prisma) resolve isso elegantemente.

### Passo 1: Entendendo o SQL Injection (Como os sistemas antigos são hackeados)
Imagine que você construiu o login assim, concatenando strings cruas:

```javascript
// ❌ PÉSSIMA IDEIA (Vulnerável)
const emailDoInput = req.body.email; // O que o usuário digitou
const sql = `SELECT * FROM users WHERE email = '${emailDoInput}'`;
await banco.executar(sql);
```

Se um usuário bem intencionado digitar `joao@email.com`, o banco executa:
`SELECT * FROM users WHERE email = 'joao@email.com'` (Perfeito).

**O Hacker:** Digita no input: `' OR '1'='1`
O seu código concatena cegamente e o banco de dados executa:
`SELECT * FROM users WHERE email = '' OR '1'='1'`
Como 1 é sempre igual a 1, essa query retorna TODOS os usuários do banco, permitindo ao hacker logar como o primeiro da lista (geralmente o Admin).

### Passo 2: A Solução via ORM (Prisma)
Ao usar um ORM como o Prisma, você nunca escreve SQL cru manipulando as strings do usuário. O ORM trata tudo o que vem do usuário estritamente como *Dado* (Data), nunca como *Comando* (Executable code).

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ✅ SEGURO: O Prisma internamente usa "Prepared Statements"
// Mesmo que req.body.email seja malicioso, ele o trata apenas como texto.
const usuario = await prisma.user.findUnique({
  where: {
    email: req.body.email
  }
});
```

### Passo 3: Resolvendo o Problema N+1 com ORM
O erro mais frequente de performance. Buscar uma lista e depois buscar os detalhes num loop.

```typescript
// ❌ RUIM: Problema N+1 (Se tiver 100 posts, ele faz 101 queries no banco!)
const posts = await prisma.post.findMany();
for (const post of posts) {
  post.autorInfo = await prisma.user.findUnique({ where: { id: post.authorId }});
}
```

```typescript
// ✅ BOM: Solução via 'include' (Faz tudo em apenas 1 única query via JOIN SQL nativo)
const postsComAutor = await prisma.post.findMany({
  include: {
    autor: true // O Prisma trás o autor de cada post automaticamente
  }
});
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Migrations Divergentes em Equipe
**O Sintoma:** Você roda `prisma migrate dev` e o console cospe um erro dizendo que o histórico de migrações está fora de sincronia com o banco.
**A Causa:** Você e seu colega alteraram o `schema.prisma` ao mesmo tempo em *branches* separadas. As duas *branches* geraram migrations conflitantes.
**A Solução:** Dê o comando `prisma migrate reset` (cuidado, apaga os dados locais) para zerar seu banco de desenvolvimento e reaplicar as migrations limpas da branch principal. Se estiver em produção, o problema é grave e exige intervenção manual (ajustar a tabela `_prisma_migrations`).

### Erro 2: ORM gerando Queries Terrivelmente Lentas
**O Sintoma:** Você faz uma busca simples e a API demora 5 segundos.
**A Causa:** ORMs são maravilhosos, mas às vezes eles geram um SQL monstruoso por baixo dos panos se você pedir muitos `includes` profundos.
**A Solução Sênior:** Use a função de *Logging* do seu ORM (ex: `new PrismaClient({ log: ['query'] })`) para ver o SQL real sendo gerado no terminal. Se estiver ruim, você tem o direito (e o dever) de escrever SQL cru (`prisma.$queryRaw`) usando as melhores práticas (*Prepared Statements*).

---

## 🚀 Desafio Prático

**Contexto:** Você tem um banco de dados de um Blog com as tabelas `Post` e `Comentario`. Um Post pode ter centenas de Comentários (relação One-to-Many).
**Tarefa:**
Usando a pseudo-sintaxe do Prisma (ou TypeORM, se preferir), escreva o código para:
1. Buscar o Post cujo ID seja 42.
2. Junto com o Post, trazer a lista de comentários acoplada.
3. Modifique a query para trazer **apenas os últimos 5 comentários** (limit/take), em vez de puxar todos os 10.000 comentários do banco e explodir a memória do seu servidor Node.js.
