---
title: "Funções e Escopo"
keywords: ["logica", "javascript", "funcoes", "escopo", "junior"]
module: "Lógica de Programação"
lesson: "02 - Funções e Escopo"
---

# Aula 02 - Funções e Escopo (O Fim do Código Repetido)

## 🎯 O Conceito (Pareto 80/20)

Na última aula, vimos como automatizar tarefas usando *Loops*. Mas e se você precisar usar a MESMA lógica em duas páginas diferentes do seu site? Você não vai copiar e colar o código (isso é o maior pecado da programação).

Você vai usar **Funções**.
Uma função é como uma "receita de bolo" guardada numa gaveta. Você escreve a receita uma vez só. Sempre que quiser um bolo, você "chama" a função.
1. **Entrada (Parâmetros):** O que a função precisa para trabalhar (ex: Ovos, Farinha).
2. **O Processo:** O que ela faz por dentro (Misturar, Assar).
3. **A Saída (Return):** O resultado que ela devolve pra você (O bolo pronto).

**Escopo** é a regra de "quem enxerga o quê". Variáveis criadas *dentro* de uma função morrem quando a função acaba. O resto do programa não consegue vê-las.

---

## 💻 Deep Dive (Passo a Passo)

Vamos criar uma calculadora de descontos de loja. Cole isso no console do seu navegador.

### Passo 1: A Estrutura de uma Função
Se escrevêssemos o código sem funções, teríamos que repetir a conta matemática para cada cliente:

```javascript
// ❌ Código repetitivo (Ruim)
let precoCamisa = 100;
let camisaComDesconto = precoCamisa - (precoCamisa * 0.20);
console.log(camisaComDesconto);

let precoTenis = 200;
let tenisComDesconto = precoTenis - (precoTenis * 0.20);
console.log(tenisComDesconto);
```

Vamos criar uma função para resolver isso para sempre:

```javascript
// ✅ 1. Definindo a Função
// "preco" e "porcentagem" são os Parâmetros (Entrada)
function calcularDesconto(preco, porcentagem) {
  let valorDoDesconto = preco * (porcentagem / 100);
  let precoFinal = preco - valorDoDesconto;
  
  // O "return" cospe o valor de volta para quem pediu (Saída)
  return precoFinal;
}

// 2. Chamando a Função (Executando)
let valorCamisa = calcularDesconto(100, 20);
let valorTenis = calcularDesconto(200, 15);

console.log("Camisa vai custar:", valorCamisa);
console.log("Tênis vai custar:", valorTenis);
```

### Passo 2: O Escopo na Vida Real
Entender Escopo é entender as "Paredes de Vidro" do JavaScript.
O código de fora não consegue ver o que está dentro da função.

```javascript
let impostoGeral = 5; // Escopo Global (Todos enxergam)

function somarComImposto(valor) {
  let taxaSecreta = 10; // Escopo Local (Apenas a função enxerga)
  return valor + impostoGeral + taxaSecreta;
}

console.log(somarComImposto(100)); // Funciona! (Retorna 115)

// ERRO! O computador não sabe o que é taxaSecreta fora da função.
// console.log(taxaSecreta); 
```

### Passo 3: Arrow Functions (O Jeito Moderno)
Você verá muito o código escrito de forma mais curta hoje em dia. É a mesma coisa, só muda a cara.

```javascript
// Função Clássica
function dobrar(numero) {
  return numero * 2;
}

// Arrow Function (Seta)
const dobrarModerno = (numero) => {
  return numero * 2;
}

// Arrow Function Reduzida (Sem "return" escrito)
const dobrarSuperCurto = numero => numero * 2;

console.log(dobrarSuperCurto(5)); // Imprime 10
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Esquecer o `return`
**O Sintoma:** Você chama sua função, mas ela devolve `undefined`. O cálculo foi feito, mas o resultado sumiu!
**A Causa:** Se a função fizer cálculos matemáticos, mas você esquecer de colocar a palavra `return` na última linha, o resultado fica preso lá dentro e se perde no vácuo.
```javascript
// ❌ ERRADO
function somar(a, b) {
  let resultado = a + b;
  // Faltou o return!
}
console.log(somar(2, 2)); // undefined

// ✅ CORRETO
function somar(a, b) {
  return a + b;
}
```

### Erro 2: Colocar os parâmetros na ordem errada
**O Sintoma:** O cálculo dá resultados malucos ou `NaN` (Not a Number).
**A Causa:** A função não sabe os nomes reais das suas variáveis. Ela se guia pela ordem exata em que você colocou.
```javascript
function dividir(numero, dividor) { return numero / dividor; }

// Se eu quero dividir 10 por 2:
dividir(2, 10); // ERRADO! Vai dar 0.2
dividir(10, 2); // CORRETO! Vai dar 5
```

---

## 🚀 Desafio Prático

**Contexto:** Você foi contratado para criar a lógica de boas-vindas do site.
**Tarefa:**
1. Crie uma função chamada `gerarMensagem`.
2. Ela deve receber dois parâmetros: `nome` e `horaDoDia`.
3. Se a `horaDoDia` for menor que 12, ela deve *retornar*: "Bom dia, [nome]!". Se for 12 ou mais, "Boa tarde, [nome]!".
4. No final do seu código, chame a função passando seu nome e a hora atual (ex: 15), e guarde o resultado numa variável.
5. Imprima a variável com `console.log`.
