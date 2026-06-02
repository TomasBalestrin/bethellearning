---
title: "Classes em JavaScript"
keywords: ["javascript", "classes", "poo", "orientacao a objetos", "junior"]
module: "JavaScript Moderno (ES6+)"
lesson: "04 - Classes em JavaScript"
---

# Aula 04 - Classes em JavaScript (Orientação a Objetos)

## 🎯 O Conceito (Pareto 80/20)

Na Aula 03 (Logica Básica), você aprendeu a criar um Objeto usando chaves: `{ nome: "Lucas", idade: 25 }`. Isso é perfeito se você precisa de UM usuário.

Mas e se você for construir um jogo (como Mario) e precisar colocar 500 inimigos (Goombas) na tela? Você não vai digitar o objeto 500 vezes na mão.

Para isso usamos **Classes**. Uma Classe é uma "Forma de Bolo" (um molde). Você usa essa forma para assar 500 bolos (Objetos / Instâncias) iguazinhos de uma vez só, muito rápido. A Orientação a Objetos é baseada em juntar os **Dados** (Variáveis) com os **Comportamentos** (Funções) na mesma forma de bolo.

---

## 💻 Deep Dive (Passo a Passo)

Vamos criar a Forma de Bolo para os Inimigos de um Jogo.

### Passo 1: O Construtor (O Nascimento)
A palavra `class` inicia o molde. Dentro da classe, a função especial chamada `constructor()` é executada uma única vez no exato milissegundo em que um inimigo novo nasce. É ali que você configura a vida e o nome dele. A palavra mágica `this` se refere ao botãozinho que diz "A minha própria vida" ou "O meu próprio nome".

```javascript
// A Forma de Bolo (Inicia com letra Maiúscula)
class Inimigo {
  
  constructor(nomeDoInimigo, forcaInicial) {
    this.nome = nomeDoInimigo;
    this.vida = 100; // Todo inimigo nasce com 100 de vida (Padrão)
    this.forca = forcaInicial;
  }
}
```

### Passo 2: Os Métodos (Comportamento)
Funções dentro de classes são chamadas de "Métodos". Elas definem o que a classe sabe fazer. Repare que você NÃO usa a palavra `function` aqui dentro.

```javascript
class Inimigo {
  constructor(nome, forca) {
    this.nome = nome;
    this.vida = 100;
    this.forca = forca;
  }

  // Comportamento: O inimigo tomou dano
  receberDano(dano) {
    this.vida = this.vida - dano;
    console.log(`${this.nome} recebeu ${dano} de dano! Vida restante: ${this.vida}`);
    
    if (this.vida <= 0) {
      console.log(`💀 ${this.nome} foi derrotado!`);
    }
  }
}
```

### Passo 3: A Palavra `new` (Assando o Bolo)
A Classe não faz nada sozinha. Ela é só a receita. Para criar um monstro de verdade na memória do computador, você tem que invocar a receita usando a palavra mágica `new`.

```javascript
// Criando instâncias (objetos reais) usando o molde Inimigo
const goblin1 = new Inimigo("Goblin Verde", 10);
const chefeOrc = new Inimigo("Orc Destruidor", 50);

// Fazendo os objetos agirem
goblin1.receberDano(40); // Vida cai pra 60
chefeOrc.receberDano(100); // Vida cai pra 0. Morre!
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Esquecer a palavra `new`
**O Sintoma:** Você escreve `const meuInimigo = Inimigo("Troll")` e o JavaScript grita um erro dizendo `Class constructor cannot be invoked without 'new'`.
**A Causa:** O computador achou que você estava tentando executar o molde como se fosse uma função matemática normal. 
**A Solução:** Para fabricar instâncias a partir de Classes, o `new` é obrigatório.

### Erro 2: O Desespero do `this`
**O Sintoma:** Você cria o método `receberDano` assim:
```javascript
receberDano(dano) {
  vida = vida - dano; // ERRO! ReferenceError: vida is not defined
}
```
**A Causa:** Variáveis dentro da classe pertencem à "Instância" (ao próprio bonequinho individual). O JavaScript é muito rígido. Se você chamar só `vida`, ele acha que é uma variável genérica do arquivo.
**A Solução:** Você **SEMPRE** precisa usar o `this.` na frente das propriedades da classe para dizer "Ei, altere a MINHA vida". Correção: `this.vida -= dano`.

---

## 🚀 Desafio Prático

**Contexto:** Um banco (estilo Nubank) precisa controlar as contas correntes dos usuários.
**Tarefa:**
1. Crie a classe `ContaBancaria`.
2. O `constructor` deve receber o `titular` e iniciar o `saldo` sempre com 0.
3. Crie o método `depositar(valor)`. Ele deve aumentar o saldo e imprimir a mensagem no console.
4. Crie o método `sacar(valor)`. Ele deve primeiro checar com um `if` se existe saldo suficiente. Se não tiver saldo, imprima "Saldo insuficiente". Se tiver, desconte do saldo e libere o saque.
5. "Asse" uma nova conta usando o `new ContaBancaria("Seu Nome")`, tente sacar 50 reais (deve falhar), deposite 100, e tente sacar 50 de novo (deve funcionar).
