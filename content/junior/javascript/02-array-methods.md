---
title: "Array Methods (map, filter, reduce, find)"
keywords: ["javascript", "arrays", "map", "filter", "reduce", "junior"]
module: "JavaScript Moderno (ES6+)"
lesson: "02 - Array Methods"
---

# Aula 02 - Array Methods (Dominando as Listas)

## 🎯 O Conceito (Pareto 80/20)

Em 90% do tempo de um dev Front-end, ele está pegando uma lista de dados de uma API, transformando essa lista, e pintando ela na tela.

Antes do ES6, você usava o loop `for` para TUDO. Ficava um código gigante e feio. O JavaScript Moderno introduziu os **Array Methods**. Eles são como "ferramentas de encanador" ultra-específicas para canos (listas) de dados.

Os 4 cavaleiros do Apocalipse (os mais usados do mundo):
1. **`.map()`** - Transforma. Passa em cada item e cria uma nova lista modificada. (O mais usado no React!).
2. **`.filter()`** - Filtra. Cria uma nova lista SÓ com quem passou no teste.
3. **`.find()`** - Encontra o ÚNICO (o primeiro) item que passar no teste.
4. **`.reduce()`** - Reduz a lista inteira a UM SÓ VALOR (ex: somar tudo).

---

## 💻 Deep Dive (Passo a Passo)

Vamos manipular uma lista de produtos de uma loja de games.

```javascript
const jogos = [
  { id: 1, nome: "God of War", preco: 250 },
  { id: 2, nome: "Hollow Knight", preco: 40 },
  { id: 3, nome: "Elden Ring", preco: 300 }
];
```

### Passo 1: O `.map()` (A Fábrica)
O Map entra com 3 itens e OBRIGATORIAMENTE sai com 3 itens.

```javascript
// Quero apenas uma lista de Nomes, sem preços.
// A cada iteração (cada jogo), eu retorno APENAS o nome.
const nomesDosJogos = jogos.map((jogo) => jogo.nome);

console.log(nomesDosJogos); 
// Resultado: ["God of War", "Hollow Knight", "Elden Ring"]
```

### Passo 2: O `.filter()` e o `.find()` (Os Detetives)
O Filter pode retornar 0, 1 ou vários itens numa NOVA LISTA.
O Find retorna apenas O PRIMEIRO item (o objeto em si).

```javascript
// FILTER: Ache os jogos em promoção (menos de 100 reais)
// A função deve retornar TRUE para quem fica na lista, e FALSE pra quem sai.
const jogosBaratos = jogos.filter((jogo) => jogo.preco < 100);

console.log(jogosBaratos); 
// Resultado: [ { id: 2, nome: "Hollow Knight", preco: 40 } ]

// FIND: Achar exatamente o jogo que tem ID 3
const jogoId3 = jogos.find((jogo) => jogo.id === 3);

console.log(jogoId3); 
// Resultado: { id: 3, nome: "Elden Ring", preco: 300 } 
```

### Passo 3: O Temido `.reduce()`
Ele pega a lista inteira e vai acumulando um valor (como um cofrinho).
O segredo é que a função dele recebe DOIS parâmetros: O "Acumulador" (o cofrinho) e o "Item atual" (a moeda). E no final de tudo, você tem que passar um número zero como valor inicial do cofre!

```javascript
// O zero lá no final diz: "Comece o cofrinho (acc) valendo 0"
const precoTotal = jogos.reduce((acc, jogoAtual) => {
  return acc + jogoAtual.preco;
}, 0);

console.log(`O valor do carrinho é R$ ${precoTotal}`);
// Resultado: 590
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Esquecer o `return` dentro do `.map()`
**O Sintoma:** Você roda o `.map()`, mas a nova lista devolve `[undefined, undefined, undefined]`.
**A Causa:** Se você abriu chaves `{}` na Arrow Function do Map, você é OBRIGADO a usar a palavra `return`. O Map não adivinha o que você quer fazer.
**A Solução:** Coloque o `return` ou tire as chaves para usar o retorno implícito.
```javascript
// ❌ ERRADO
jogos.map((jogo) => { jogo.nome }); 

// ✅ CORRETO 1 (Com chaves e return)
jogos.map((jogo) => { return jogo.nome }); 

// ✅ CORRETO 2 (Sem chaves - Retorno curto)
jogos.map((jogo) => jogo.nome);
```

### Erro 2: Modificar a lista original sem querer (Mutabilidade)
A beleza do `map` e `filter` é que eles geram listas NOVAS. Eles NÃO tocam na sua lista antiga. Isso evita bugs gigantescos.
Nunca tente fazer isso:
```javascript
// ❌ PÉSSIMO: Forçando um map a agir como for.
// O map não serve pra isso. Se for pra não retornar nada, use array.forEach()!
jogos.map(jogo => jogo.preco = 10); 
```

---

## 🚀 Desafio Prático

**Contexto:** Sua aplicação de Recursos Humanos recebe uma lista de candidatos.
**Tarefa:**
Com a lista abaixo, encadeie (coloque um seguido do outro) os métodos para realizar esta tarefa: 
1. Gere uma lista APROVADOS que contenha **apenas o nome** (em letras maiúsculas, usando `.toUpperCase()`) dos candidatos que possuem nota maior ou igual a 7.

```javascript
const alunos = [
  { nome: "Ana", nota: 8 },
  { nome: "João", nota: 5 },
  { nome: "Maria", nota: 9 }
];

// Seu código aqui usando apenas UM encadeamento de métodos!
// Exemplo esperado de saída: ["ANA", "MARIA"]
```
