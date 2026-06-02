---
title: "ES6 Essencial (let/const, arrow functions, template literals)"
keywords: ["javascript", "es6", "let", "const", "arrow functions", "junior"]
module: "JavaScript Moderno (ES6+)"
lesson: "01 - ES6 Essencial"
---

# Aula 01 - ES6 Essencial (A Revolução do JavaScript)

## 🎯 O Conceito (Pareto 80/20)

Em 2015, o JavaScript passou por uma grande revolução (a versão ES6). Antes disso, o código JS era doloroso e estranho. Hoje, você NUNCA mais verá um código profissional usando a antiga palavra `var`.

As 3 funcionalidades mais usadas do ES6 (que compõem 90% do seu dia a dia) são:
1. **`let` e `const`:** Variáveis que não "vazam" do bloco onde foram criadas.
2. **Arrow Functions (`=>`):** Funções menores e mais fáceis de ler.
3. **Template Literals (``):** Chega de ficar somando strings com dezenas de símbolos de `+`. Agora você escreve texto dinâmico elegantemente usando crases.

---

## 💻 Deep Dive (Passo a Passo)

Abra o console do navegador e digite os exemplos!

### Passo 1: Adeus `var`, olá `let` e `const`
A palavra `var` causava bugs porque ela ignorava limites (escopo de bloco). 

```javascript
// A REGRA MODERNA:
// Use 'const' para 95% das coisas.
// Use 'let' SOMENTE se você tiver certeza de que vai mudar o valor depois (ex: contador num for).

const imposto = 0.10;
// imposto = 0.15; // ERRO FATAL! const não pode ser reatribuído.

let saldo = 100;
saldo = 50; // Funciona perfeitamente.

// A proteção do escopo de bloco:
if (true) {
  let senhaSecreta = "123";
}
// console.log(senhaSecreta); // Dá erro! A variável só existe DENTRO do if. Com 'var', ela vazaria pra fora.
```

### Passo 2: Template Literals (A Mágica da Crase)
Escrever texto que mistura variáveis sempre foi feio. O ES6 resolveu isso com a crase `` ` `` e a sintaxe `${}`.

```javascript
const nome = "Ana";
const idade = 25;

// ❌ O JEITO ANTIGO E FEIO (Cuidado com os espaços):
const fraseAntiga = "Meu nome é " + nome + " e eu tenho " + idade + " anos.";

// ✅ O JEITO MODERNO ES6:
const fraseNova = `Meu nome é ${nome} e eu tenho ${idade} anos.`;

console.log(fraseNova);
```
*Detalhe extra: As crases também permitem quebras de linha reais no código, perfeito para montar HTML pelo JavaScript!*

### Passo 3: Arrow Functions
O JavaScript precisava de um jeito mais rápido de criar funções para passar como parâmetro.

```javascript
// Jeito Antigo
const somarAntigo = function(a, b) {
  return a + b;
};

// Arrow Function ES6
const somarNovo = (a, b) => {
  return a + b;
};

// Arrow Function Reduzida (Retorno Implícito)
// Se tiver só UMA linha, você pode arrancar as chaves {} e a palavra return!
const somarUltraCurto = (a, b) => a + b;
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: "Assignment to constant variable"
**O Sintoma:** O console vermelho gritando e travando o site.
**A Causa:** Você declarou uma variável com `const` e, linhas abaixo, tentou colocar um novo valor nela.
**A Solução:** Mude a palavra `const` para `let` onde a variável foi criada.
*Nota de Sênior: O `const` impede a reatribuição (sinal de igual). Mas se você tiver um Array `const lista = []`, você AINDA PODE dar um `lista.push("item")`. O `const` prende a caixa original, mas não bloqueia de colocar coisas dentro dela!*

### Erro 2: O Template Literal imprimindo `${nome}`
**O Sintoma:** Sua tela imprime a frase literal "Olá, ${nome}" em vez de "Olá, Ana".
**A Causa:** Você tentou usar a sintaxe do Template Literal dentro de aspas simples (`'`) ou duplas (`"`). 
**A Solução:** Substitua as aspas pelas crases (`` ` ``). O `${}` SÓ funciona dentro de crases.

---

## 🚀 Desafio Prático

**Contexto:** Você está fazendo a página de "Parabéns" de uma loja após a compra.
**Tarefa:**
Refatore (reescreva) a função antiga abaixo para utilizar 100% de JavaScript Moderno ES6 (use `const`, `Arrow Function Reduzida` e `Template Literal`).

```javascript
// Reescreva esta função inteira:
var gerarMensagem = function(cliente, produto, valor) {
  var mensagem = "Parabéns, " + cliente + "! Sua compra de " + produto + " no valor de R$" + valor + " foi confirmada.";
  return mensagem;
}
```
