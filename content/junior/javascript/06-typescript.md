---
title: "Introdução ao TypeScript"
keywords: ["typescript", "javascript", "tipagem", "junior"]
module: "JavaScript Moderno (ES6+)"
lesson: "06 - Introdução ao TypeScript"
---

# Aula 06 - Introdução ao TypeScript (Fim dos Erros Bobos)

## 🎯 O Conceito (Pareto 80/20)

Você escreveu 500 linhas de código perfeitas. Aí você clica num botão, a tela fica branca e o console do navegador diz: `TypeError: Cannot read property 'nome' of undefined`.
Esse é o erro mais clássico do JavaScript. Ele acontece porque o JS não sabe o que tem dentro da variável até o momento em que o código roda.

O **TypeScript** resolve isso. O TypeScript é o JavaScript com "Superpoderes de Previsão".
Você avisa ao computador ANTES de rodar o código o tipo de dado que cada variável vai carregar. Se você tentar guardar um "texto" numa variável avisada como "número", a sua IDE (VS Code) vai pintar a linha de vermelho na mesma hora, impedindo o bug de ir pro usuário.

---

## 💻 Deep Dive (Passo a Passo)

Arquivos TypeScript usam a extensão `.ts` em vez de `.js`. Navegadores não leem TS diretamente, o TypeScript é "compilado" (traduzido) de volta para o JS antes de ir pro ar.

### Passo 1: Tipagem Básica
No JavaScript você criaria a variável assim: `let idade = 20`.
No TypeScript, você avisa o tipo botando `: tipo`.

```typescript
// 1. Tipos Primitivos (número, texto, booleano)
let idadeDoUsuario: number = 25;
let nomeDoUsuario: string = "Maria";
let estaLogado: boolean = true;

// O TypeScript grita vermelho aqui! (Não deixa colocar texto em número)
// idadeDoUsuario = "Vinte e Oito"; 

// 2. Arrays Tipados (Avisando que a lista só aceita textos)
let listaDeCompras: string[] = ["Maçã", "Pão"];
// listaDeCompras.push(100); // Erro! O Array só aceita Strings.
```

### Passo 2: Tipando Funções
Quando você cria uma função matemática, você avisa o que entra e o que sai.

```typescript
// O 'a' é um número. O 'b' é um número.
// O 'number' ali fora diz que a função VAI RETORNAR um número.
function somarSeguro(a: number, b: number): number {
  return a + b;
}

// Isso dá erro instantâneo no editor! Você não pode passar "oi" pra um número.
// somarSeguro(10, "oi"); 
```

### Passo 3: O Poder das Interfaces (Contratos)
O maior poder do TS é quando lidamos com Objetos. O React inteiro funciona baseando-se em `Interfaces`.

```typescript
// Criamos um "Contrato" obrigatório
interface Carro {
  marca: string;
  ano: number;
  // O ponto de interrogação diz que a cor é OPCIONAL
  cor?: string; 
}

// O VS Code vai nos ajudar com o "Autocompletar" (Ctrl+Space) aqui dentro!
const meuCarro: Carro = {
  marca: "Honda",
  ano: 2023,
  // Se eu esquecesse de colocar a 'marca', o TS daria erro! 
  // Mas posso esquecer a cor porque ela tem a interrogação (?).
};
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: A Maldição do `any`
**O Sintoma:** Você se cansa do TypeScript apitando erros no seu código, então você decide colocar `: any` em tudo (`let usuario: any`).
**A Causa e o Impacto:** O `any` diz: "TypeScript, desligue a checagem, aja como se fosse JavaScript". Você acabou de jogar o poder do TypeScript no lixo.
**A Solução:** Em 99% das vezes, você sabe o tipo da coisa. Crie uma `interface` para o objeto e mapeie. Se você estiver recebendo algo de uma API obscura e não faz ideia do que vem de lá, o tipo de Sênior a usar é o `unknown` (desconhecido), e não o `any`.

### Erro 2: Tipar coisas óbvias (Type Inference)
**O Sintoma:** O seu código fica feio, repetitivo e super burocrático de ler, cheio de `let nome: string = "João"`.
**A Solução:** O TypeScript é incrivelmente inteligente. Isso se chama "Inferência de Tipos". Se você escreve `let nome = "João"`, o TS *já sabe* que isso é uma string. Você **não precisa** botar `: string`.
Reserve a tipagem manual para **parâmetros de funções** e para inicializar coisas vazias (ex: um Array que começa vazio `let lista: string[] = []`).

---

## 🚀 Desafio Prático

**Contexto:** Você está recebendo os dados do cliente para salvar no banco.
**Tarefa:**
1. Crie (em um bloco de texto/pseudo-código) uma `interface Cliente`.
2. O Cliente deve obrigatoriamente ter `id` (número), `nome` (texto) e `email` (texto).
3. O Cliente pode, **opcionalmente**, ter um `telefone` (texto) e a propriedade `estaAtivo` (booleano).
4. Crie uma função `salvarCliente(dados: Cliente)`. Mostre como o TS barraria um desenvolvedor de passar um objeto cliente sem o campo `nome` para essa função.
