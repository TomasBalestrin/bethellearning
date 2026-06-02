---
title: "Arrays e Objetos"
keywords: ["logica", "javascript", "arrays", "objetos", "junior"]
module: "Lógica de Programação"
lesson: "03 - Arrays e Objetos"
---

# Aula 03 - Arrays e Objetos (Estruturas de Dados Básicas)

## 🎯 O Conceito (Pareto 80/20)

Em 99% do seu trabalho como desenvolvedor, você vai lidar com Sistemas Cadastrais (Listas e Formulários). O Instagram é uma Lista de Fotos. O iFood é uma Lista de Restaurantes.

Para não criar uma variável diferente para cada coisa do mundo (`let aluno1 = "Pedro"; let aluno2 = "Maria";`), inventaram as Estruturas de Dados.

- **Arrays (Listas):** É um vagão de trem onde cada cadeira tem um número (índice). Útil quando a ORDEM ou a QUANTIDADE importa. Representado por colchetes `[]`.
- **Objetos (Dicionários):** É um armário com gavetas com etiquetas. Útil quando você quer agrupar várias informações SOBRE A MESMA COISA. Representado por chaves `{}`.

---

## 💻 Deep Dive (Passo a Passo)

Vamos criar os dados de um App de Loja. Abra o Console do navegador!

### Passo 1: Dominando os Arrays (Listas)
No JavaScript, a contagem dos Arrays começa no ZER0, não no UM.

```javascript
// Criando uma lista de produtos
const carrinho = ["Maçã", "Banana", "Uva"];

console.log(carrinho[0]); // Imprime: "Maçã" (O primeiro item)
console.log(carrinho.length); // Imprime: 3 (O tamanho da lista)

// Adicionando um item no final da lista
carrinho.push("Laranja");
console.log(carrinho); // ["Maçã", "Banana", "Uva", "Laranja"]

// Removendo o último item
carrinho.pop(); 
```

### Passo 2: Dominando os Objetos
Um Objeto junta propriedades (características). 

```javascript
// Criando um Objeto Usuário
const usuario = {
  nome: "Lucas",
  idade: 25,
  ehPremium: true
};

// Como acessar as gavetas (propriedades)
console.log(usuario.nome); // "Lucas"
console.log(usuario.idade); // 25

// Atualizando um valor
usuario.idade = 26;

// Adicionando um valor novo que não existia!
usuario.cidade = "São Paulo";
console.log(usuario);
```

### Passo 3: O Padrão de Ouro (Array de Objetos)
Esse é o padrão universal de dados na internet. É assim que o backend manda dados para o frontend. É uma lista, onde cada item da lista é um objeto cheio de propriedades.

```javascript
// Uma lista (Array) onde cada item é um Objeto
const listaDeFilmes = [
  { titulo: "Matrix", ano: 1999, nota: 9.5 },
  { titulo: "Avatar", ano: 2009, nota: 8.0 },
  { titulo: "Vingadores", ano: 2012, nota: 8.5 }
];

// O poder de combinar! Vamos imprimir o título do primeiro filme:
console.log( listaDeFilmes[0].titulo ); // "Matrix"

// Vamos usar um Loop 'for' para mostrar todos os filmes:
for (let i = 0; i < listaDeFilmes.length; i++) {
  console.log("O filme " + listaDeFilmes[i].titulo + " tirou nota " + listaDeFilmes[i].nota);
}
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Acessar algo que não existe (`undefined`)
**O Sintoma:** O console grita `Cannot read properties of undefined` e sua tela fica em branco.
**A Causa:** Você tentou abrir uma gaveta de um armário que sequer existe.
```javascript
const cliente = { nome: "Ana" };

// Acessar uma gaveta que não existe dá 'undefined'
console.log(cliente.telefone); // undefined

// O ERRO FATAL: Tentar acessar uma propriedade DENTRO de algo que já é undefined
console.log(cliente.telefone.ddd); // 💥 ERRO FATAL! O código morre aqui.
```
**A Solução Moderna:** Use o Optional Chaining (`?.`). Ele protege seu código.
```javascript
// Se telefone não existir, ele para a busca e retorna undefined suavemente, sem dar erro!
console.log(cliente.telefone?.ddd); 
```

### Erro 2: O Último Item do Array
**O Sintoma:** Você quer acessar o último item de um Array, mas não sabe o tamanho dele. Você chuta um número e ele retorna `undefined`.
**A Solução:** Use `.length - 1` (Tamanho total menos um, já que a contagem começa do zero).
```javascript
const fila = ["João", "Maria", "Pedro", "José"];
let ultimo = fila[fila.length - 1]; // Funciona com Arrays de 4 itens ou de 1 milhão!
```

---

## 🚀 Desafio Prático

**Contexto:** Você está programando o inventário de um jogo RPG.
**Tarefa:**
1. Crie um objeto chamado `personagem`.
2. Dê a ele as propriedades: `nome`, `nivel`, e `inventario`.
3. O `inventario` deve ser um **Array** de textos (Ex: `["Espada de Madeira", "Poção de Vida"]`).
4. Depois de criar o objeto, escreva o código para adicionar "Escudo de Ferro" no array de inventário do personagem.
5. Escreva um `console.log` para mostrar: `"O personagem [nome] tem [quantidade] itens no inventário."` (Use o `.length` para calcular a quantidade!).
