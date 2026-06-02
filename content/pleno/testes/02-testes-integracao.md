---
title: "Testes de Integração"
keywords: ["testes de integracao", "supertest", "testcontainers", "api", "pleno"]
module: "Testes e Qualidade de Código"
lesson: "02 - Testes de Integração"
---

# Aula 02 - Testes de Integração (Onde a Mágica Acontece)

## 🎯 O Conceito (Pareto 80/20)

Testes unitários com Mocks (como vimos na Aula 01) são ótimos e muito rápidos. Mas eles sofrem de uma falha grave: **se você mockou o banco de dados de um jeito, mas o banco de dados real devolve a resposta de outro jeito, seus 100 testes vão passar lindamente no CI/CD e a aplicação vai explodir em produção.**

Testes unitários garantem que suas peças funcionam isoladas.
**Testes de Integração garantem que suas peças se encaixam e funcionam juntas.** (Ex: o seu Controller Node.js chamando o Repositório e batendo num Banco Postgres Real, e retornando JSON).

Para APIs no Node, o Pareto absoluto do Teste de Integração é usar a biblioteca **`supertest`**.

---

## 💻 Deep Dive (Passo a Passo)

Vamos criar um teste de integração real que levanta nosso servidor Express, bate num banco de testes local, insere um usuário e confere se a resposta HTTP está correta.

### Passo 1: Separar o `app.js` do `server.js`
Isso é crucial! Se o seu `app.listen()` estiver no mesmo arquivo que você exporta a API, quando você rodar o teste, a porta 3000 já estará em uso.

```javascript
// app.js (Apenas define a aplicação)
const express = require('express');
const app = express();
app.use(express.json());

app.post('/usuarios', async (req, res) => {
  // Lógica real de salvar no DB
  const user = await db.insert(req.body);
  res.status(201).json(user);
});
module.exports = app;

// server.js (Apenas levanta a porta na vida real)
const app = require('./app');
app.listen(3000); 
```

### Passo 2: O Teste de Integração usando Supertest
A biblioteca Supertest consegue pegar esse `app` sem o `listen`, levantar ele temporariamente e mandar requisições "virtuais" para ele.

*Instale com: `npm i supertest -D`*

Crie o arquivo `usuarios.test.js`:
```javascript
const request = require('supertest');
const app = require('./app'); // Nossa API
const db = require('./bancoReal'); // Banco de testes

// O hook "beforeEach" limpa a tabela antes de CADA teste.
// Testes de integração PRECISAM começar em um ambiente completamente limpo!
beforeEach(async () => {
  await db.query("DELETE FROM usuarios"); 
});

// E, finalmente, fechamos a conexão com o banco
afterAll(async () => {
  await db.close();
});

test('Deve criar um usuário com sucesso (Status 201)', async () => {
  const payload = { nome: "Ana", email: "ana@email.com" };

  // Supertest em ação!
  const response = await request(app)
    .post('/usuarios')
    .send(payload);

  // Verificamos a camada HTTP
  expect(response.status).toBe(201);
  expect(response.body.nome).toBe("Ana");

  // Opcional (Deep Check): Verificamos se realmente gravou no banco de dados!
  const usuarioNoBanco = await db.query("SELECT * FROM usuarios WHERE email = 'ana@email.com'");
  expect(usuarioNoBanco.length).toBe(1);
});
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Testes Flaky (Quebram Aleatoriamente)
**O Sintoma:** Você roda `npm test` e passa. Você roda de novo, um teste quebra. Roda mais uma, outro quebra.
**A Causa:** Testes que dependem de bancos de dados tendem a vazar dados entre si, ou dependem da ordem de execução. Se o Teste B assume que há apenas 1 usuário no banco, mas o Teste A criou um usuário e esqueceu de limpar a sujeira, o Teste B vai quebrar caso rode depois do Teste A.
**A Solução:** Isolar tudo. Usar `beforeEach` para limpar o banco (ou rodar os testes dentro de *Transações SQL* que dão *Rollback* no final do teste sem comitar nada permanentemente no banco de dados).

### Erro 2: Banco de dados "Sujo" com dados reais
**O Sintoma:** Você roda o teste na sua máquina e ele acaba deletando os dados do banco de desenvolvimento da sua empresa.
**A Solução:** Use Bancos de Dados Efêmeros (Testcontainers). É uma técnica avançada onde cada vez que você dá `npm test`, ele levanta um Docker novinho com um banco Postgres limpo em 2 segundos, roda seus testes nele, e destrói o banco quando termina. Magia pura.

---

## 🚀 Desafio Prático

**Contexto:** Você tem uma rota de Autenticação em `/login`. Ela recebe `{ email, senha }` e retorna um Token JWT.
**Tarefa:**
Usando a sintaxe do Supertest ensinada acima, escreva **dois cenários de teste** (Test Cases) para essa rota:
1. Um teste para o Caminho Feliz (Happy Path): Envie credenciais válidas. O que você fará de *Assert* (`expect()`) neste caso? Qual status code e o que espera encontrar no `response.body`?
2. Um teste para o Caminho de Erro (Sad Path): Envie uma senha errada. Qual status code a rota deve devolver e como você escreve o `expect()` do status code usando Supertest?
