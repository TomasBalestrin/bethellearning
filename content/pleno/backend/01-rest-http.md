---
title: "REST + HTTP Avançado"
keywords: ["rest", "http", "backend", "api", "pleno"]
module: "APIs e Backend Integration"
lesson: "01 - REST + HTTP Avançado"
---

# Aula 01 - REST + HTTP Avançado

## 🎯 O Conceito (Pareto 80/20)

Como desenvolvedor Pleno, você não apenas "consome" APIs, você precisa desenhá-las. Uma API mal desenhada confunde os desenvolvedores do front-end e gera bugs.

REST (Representational State Transfer) é um conjunto de regras arquiteturais baseadas no protocolo HTTP. A essência do REST é mapear ações para **Verbos HTTP** e recursos para **URLs limpas**, respondendo sempre com os **Status Codes** corretos.

**O Pareto dos Verbos:**
- `GET`: Buscar dados (Idempotente).
- `POST`: Criar novos dados (NÃO Idempotente).
- `PUT`: Substituir o recurso inteiro (Idempotente).
- `PATCH`: Atualizar parcialmente um recurso.
- `DELETE`: Remover dados (Idempotente).

*(Idempotente = Chamar a mesma rota 1000 vezes seguidas produzirá o mesmo resultado final que chamar 1 vez).*

---

## 💻 Deep Dive (Passo a Passo)

Vamos desenhar uma API RESTful do zero no Express.js, corrigindo os erros comuns de iniciantes.

### Passo 1: Configurando um Servidor Básico
Crie um arquivo `server.js` (certifique-se de ter rodado `npm init -y` e `npm i express`):

```javascript
const express = require('express');
const app = express();
app.use(express.json()); // Permite ler JSON no req.body

const porta = 3000;
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
```

### Passo 2: Evitando URLs com Ações (O Anti-Pattern)
O erro clássico de quem começa é colocar o "verbo" na URL. 
- ❌ RUIM: `POST /criar-usuario`, `GET /pegar-usuario-123`, `POST /deletar-usuario`.
- ✅ BOM: Use o recurso no plural na URL, e deixe o Verbo HTTP ditar a ação.

```javascript
const usuarios = [{ id: 1, nome: "Ana" }];

// GET /usuarios (Lista tudo)
app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

// GET /usuarios/:id (Lista um específico)
app.get('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id == req.params.id);
  if (!user) {
    // 404 = Not Found
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.status(200).json(user);
});
```

### Passo 3: Criando e Atualizando Recursos (Status Codes)
Se você criar um recurso, responda com `201 Created`. Se houver erro de validação (ex: faltou o nome), responda com `400 Bad Request`.

```javascript
// POST /usuarios (Criar)
app.post('/usuarios', (req, res) => {
  const { nome } = req.body;
  
  if (!nome) {
    // 400 = O cliente mandou a requisição errada/faltando dados
    return res.status(400).json({ erro: "O campo nome é obrigatório" });
  }

  const novoId = usuarios.length + 1;
  const novoUser = { id: novoId, nome };
  usuarios.push(novoUser);

  // 201 = Recurso Criado com Sucesso
  res.status(201).json(novoUser);
});
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: A API demora e o Front-end cancela (Timeout)
**O Sintoma:** Sua rota `/relatorios` processa 1 milhão de linhas no Excel. O browser do usuário desiste de esperar (Timeout) após 30 segundos, mas seu backend continua rodando.
**A Solução (REST Avançado):** Não faça processamentos síncronos gigantes. Responda imediatamente com um status **`202 Accepted`** ("Recebi seu pedido, estou processando em background") e retorne um ID de Job. O front-end fica fazendo `GET /jobs/ID` de tempo em tempo (Polling) para saber se terminou.

### Erro 2: Atualização Perdida no PUT
**O Sintoma:** Você faz um `PUT /usuarios/1` enviando apenas `{ "email": "novo@email.com" }`. O backend substitui o objeto inteiro no banco por esse objeto, e o "nome" do usuário some.
**A Solução:** Entenda a semântica. Se o Front-end vai mandar apenas os campos que mudaram, a rota não deveria ser PUT, deveria ser **`PATCH`**. Se o Front manda o objeto completo com todas as propriedades, você usa o PUT.

---

## 🚀 Desafio Prático

**Contexto:** Você está desenhando as rotas para um sistema de Carrinho de Compras de um E-commerce.
**Tarefa:**
Sem escrever código, projete as URLs, Verbos e os códigos de resposta HTTP (Status Codes) esperados para as seguintes ações:
1. Adicionar o produto ID 45 ao carrinho. (Se o produto não existir no banco, o que deve retornar?)
2. Ver todos os produtos do meu carrinho.
3. Alterar a quantidade do produto ID 45 no carrinho (de 1 para 3 itens).
4. Limpar o carrinho inteiro.
*(Dica: O carrinho não tem um ID na URL, ele é deduzido pelo Token do usuário autenticado).*
