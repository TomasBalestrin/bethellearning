---
title: "Closures, Prototypes e This"
keywords: ["javascript", "closures", "prototypes", "this", "pleno"]
module: "JavaScript / TypeScript Avançado"
lesson: "02 - Closures, Prototypes e This"
---

# Aula 02 - Closures, Prototypes e This (Fundamentos Avançados)

## 🎯 O Conceito (Pareto 80/20)

Para debugar problemas obscuros em frameworks modernos (como React, Angular ou Vue), um Dev Pleno deve dominar o funcionamento interno do JavaScript. Estes três conceitos são responsáveis por grande parte da "mágica" (e dos bugs) no ecossistema JS.

1. **Closures:** A capacidade de uma função lembrar das variáveis do seu escopo original, mesmo sendo executada fora dele. Usado para encapsulamento (variáveis privadas).
2. **This:** Determinado *no momento da execução* (como a função foi chamada), não onde foi criada (com exceção das Arrow Functions).
3. **Prototypes:** A base da herança em JavaScript. Em vez de classes de molde, objetos herdam diretamente de outros objetos através da "Cadeia de Protótipos".

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: Entendendo Closures na Prática
Vamos criar um exemplo real de Closure: um gerador de identificadores (IDs) que não pode ser adulterado de fora. Crie um arquivo `closure.js` e execute:

```javascript
function criarGeradorDeId(prefixo) {
  let contador = 0; // Esta variável fica "presa" na closure

  // A função retornada lembra de 'contador' e 'prefixo'
  return function() {
    contador += 1;
    return `${prefixo}_${contador}`;
  };
}

const gerarIdUsuario = criarGeradorDeId("USER");
const gerarIdProduto = criarGeradorDeId("PROD");

console.log(gerarIdUsuario()); // "USER_1"
console.log(gerarIdUsuario()); // "USER_2"
console.log(gerarIdProduto()); // "PROD_1"

// É impossível acessar ou alterar 'contador' diretamente daqui!
// console.log(contador); // ERRO!
```

### Passo 2: O Mistério do `this`
O valor de `this` causa pesadelos diários. Crie `this_demo.js`:

```javascript
const usuario = {
  nome: "Ana",
  
  // Método normal: 'this' aponta para o objeto à esquerda do ponto (usuario)
  saudarNormal: function() { 
    console.log(`Oi, eu sou ${this.nome}`); 
  },

  // Arrow function: 'this' é herdado do escopo ONDE o objeto foi criado (neste caso, o objeto global/window)
  saudarArrow: () => { 
    console.log(`Oi, eu sou ${this.nome}`); 
  }
};

usuario.saudarNormal(); // Saída: "Oi, eu sou Ana"
usuario.saudarArrow();  // Saída: "Oi, eu sou undefined"
```

### Passo 3: Prototypes e Classes (Debaixo dos Panos)
As `class` do ES6 são apenas *syntax sugar* (uma roupagem) sobre o sistema de prototypes. O JS delega comportamentos pelo `__proto__`.

```javascript
// A forma "antiga" (como as Classes operam por baixo):
function Animal(nome) {
  this.nome = nome;
}

// Adicionamos métodos ao protótipo para que todas as instâncias compartilhem a mesma função na memória, economizando RAM.
Animal.prototype.falar = function() {
  console.log(`${this.nome} fez um som.`);
};

const dog = new Animal("Rex");
dog.falar(); // O JS procura 'falar' no 'dog'. Não acha. Olha no protótipo (Animal) e encontra!
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Perda de Contexto em Callbacks (`this` undefined)
**O Sintoma:** Você passa um método de classe para um `setTimeout` ou um botão `onClick` no React, e ele quebra dizendo `Cannot read property 'X' of undefined`.
```javascript
class Contador {
  constructor() { this.valor = 0; }
  incrementar() { this.valor++; console.log(this.valor); }
}
const meuContador = new Contador();
// ERRO: 'this' se perde quando a função é executada no futuro pelo setTimeout
setTimeout(meuContador.incrementar, 1000); 
```
**A Solução Clássica:** Usar `.bind(this)`.
```javascript
setTimeout(meuContador.incrementar.bind(meuContador), 1000);
```
**A Solução Moderna (Pareto):** Declarar o método como Arrow Function na classe.
```javascript
class Contador {
  constructor() { this.valor = 0; }
  // Arrow functions guardam permanentemente o 'this' da instância
  incrementar = () => { this.valor++; console.log(this.valor); }
}
```

### Erro 2: Modificar Objetos Globais
**O Sintoma:** Alterar o `Array.prototype` ou `String.prototype` com métodos customizados (ex: `String.prototype.meuMetodo = ...`).
**A Solução:** Não faça isso. Isso se chama "Monkey Patching" e causa conflitos terríveis com bibliotecas de terceiros. Se precisar de um método de string novo, crie uma função utilitária isolada (ex: `formataTexto(texto)`).

---

## 🚀 Desafio Prático

**Contexto:** Você está criando a lógica de um carrinho de compras simples e isolado, evitando que outros desenvolvedores estraguem seu carrinho alterando as variáveis.
**Tarefa:** 
1. Use **Closures** para criar uma função `criarCarrinho()`.
2. Ela deve possuir um array "privado" interno chamado `itens`.
3. Ela deve retornar um objeto com três métodos:
   - `adicionarItem(nome)`
   - `listarItens()`
   - `limparCarrinho()`
4. Teste criar dois carrinhos separados (`carrinhoAna` e `carrinhoPedro`) e garanta que adicionar algo no carrinho da Ana não afeta o do Pedro. Não use `class` nem a palavra-chave `this` para este desafio, force-se a usar Closures puros.
