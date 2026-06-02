---
title: "Fundamentos de Lógica (Variáveis, Condicionais, Loops)"
keywords: ["logica", "javascript", "variaveis", "if", "for", "junior"]
module: "Lógica de Programação"
lesson: "01 - Fundamentos de Lógica"
---

# Aula 01 - Fundamentos de Lógica (A Base de Tudo)

## 🎯 O Conceito (Pareto 80/20)

Aprender a programar não é aprender a decorar palavras em inglês (como `if`, `for`, `let`). Aprender a programar é **aprender a pensar passo a passo**, exatamente como você faria para explicar a uma criança de 5 anos como fritar um ovo.

O computador é extremamente burro. Ele só faz o que você manda.
Os 3 pilares da programação (80/20) são:
1. **Memória (Variáveis):** Guardar informações para usar depois.
2. **Decisões (Condicionais):** "Se X for verdade, faça Y. Senão, faça Z".
3. **Repetições (Loops):** Fazer a mesma tarefa chata milhares de vezes sem cansar.

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir um "Verificador de Idade para Montanha Russa" usando JavaScript.
Para testar os códigos abaixo, você pode abrir o navegador (Google Chrome), apertar `F12`, ir na aba **Console** e colar os códigos lá!

### Passo 1: Variáveis (Guardando dados)
No JavaScript moderno, usamos `let` (para variáveis que podem mudar) e `const` (para variáveis fixas).

```javascript
// 1. Criando variáveis
const alturaMinima = 1.40; // Em metros (constante, a montanha russa não diminui)
let alturaDoUsuario = 1.35; // O usuário atual
let nomeUsuario = "Joãozinho"; // Textos sempre vão entre aspas

// 2. Mostrando na tela
console.log("Bem vindo, " + nomeUsuario);
```

### Passo 2: Condicionais (Tomando Decisões)
Nós queremos que o programa avise se Joãozinho pode ou não entrar no brinquedo.

```javascript
// O "if" significa "SE"
if (alturaDoUsuario >= alturaMinima) {
  // Se a condição for VERDADEIRA, o código aqui dentro roda
  console.log("Parabéns, você pode entrar no brinquedo!");
} else {
  // O "else" significa "SENÃO"
  console.log("Que pena, você precisa crescer mais um pouquinho.");
}

// Tente mudar o valor de alturaDoUsuario para 1.50 e rode o código de novo!
```

### Passo 3: Loops (Automatizando o tédio)
E se tivermos uma fila com 5 pessoas? Não vamos escrever 5 `if`s. Usamos um `for` loop.

```javascript
// Array (uma lista de alturas)
const filaDePessoas = [1.20, 1.50, 1.35, 1.80, 1.40];

// O "for" tem 3 partes: 
// 1. Início (i = 0)
// 2. Condição (enquanto i for menor que o tamanho da fila)
// 3. Passo (i++ significa "aumente de 1 em 1")
for (let i = 0; i < filaDePessoas.length; i++) {
  
  let alturaAtual = filaDePessoas[i]; // Pega a pessoa da vez
  
  if (alturaAtual >= alturaMinima) {
    console.log("Pessoa " + (i + 1) + ": Pode entrar! (Altura: " + alturaAtual + ")");
  } else {
    console.log("Pessoa " + (i + 1) + ": Bloqueado. (Altura: " + alturaAtual + ")");
  }
}
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Confundir `=` com `===`
**O Sintoma:** Seu `if` está rodando mesmo quando não devia, ou o console aponta erro no `if`.
**A Causa:** Em programação, um único sinal de igual `=` significa **Atribuição** (guardar valor na caixa). Para comparar se duas coisas são iguais, você precisa usar três sinais de igual `===`.
```javascript
// ❌ ERRADO (Vai guardar o valor 10 na idade e sempre dar Verdadeiro)
if (idade = 10) { ... } 

// ✅ CORRETO (Vai comparar a idade com 10)
if (idade === 10) { ... } 
```

### Erro 2: O Loop Infinito
**O Sintoma:** O navegador trava completamente e a aba do Google Chrome para de responder.
**A Causa:** Você criou um loop `for` ou `while` onde a condição NUNCA se torna falsa, então o computador fica preso ali para sempre.
```javascript
// ❌ O PERIGO: Esquecer de aumentar a variável
for (let i = 0; i < 5; /* esqueceu o i++ aqui */) {
  console.log("Estou preso para sempre!");
}
```

---

## 🚀 Desafio Prático

**Contexto:** Você é o programador de uma padaria. O dono quer automatizar a cobrança de pães. Cada pão francês custa R$ 0.50. Se o cliente comprar mais de 10 pães, ele ganha um desconto e o preço de cada pão cai para R$ 0.40.
**Tarefa:**
Escreva um código que:
1. Tenha uma variável `let quantidadeDePaes = 15;`
2. Calcule o `valorTotal` usando um `if` e `else` para aplicar ou não o desconto.
3. Mostre no console: `"O valor total da sua compra é R$ [valor]"`
