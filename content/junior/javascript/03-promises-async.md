---
title: "Promises e Async/Await"
keywords: ["javascript", "promises", "async", "await", "fetch", "junior"]
module: "JavaScript Moderno (ES6+)"
lesson: "03 - Promises e Async/Await"
---

# Aula 03 - Promises e Async/Await (O Tempo e a Internet)

## 🎯 O Conceito (Pareto 80/20)

Até agora, todo o nosso código acontecia instantaneamente. O JavaScript lia a linha 1 e depois a linha 2, na velocidade da luz. (Síncrono).

Mas a vida real envolve a Internet. Se você pedir a foto de perfil do usuário pro servidor do Instagram, a resposta não vai ser instantânea. Pode demorar 2 segundos, pode demorar 10, ou a internet pode cair. O JavaScript não pode travar o computador inteiro do usuário esperando essa foto chegar.

O JavaScript precisa trabalhar de forma **Assíncrona**.
Ele pede a foto, deixa um "bilhete" dizendo "Me avisa quando chegar", e continua renderizando o resto do site.

Esse bilhete mágico se chama **Promise** (Uma Promessa de que a resposta vai chegar no futuro, seja com sucesso ou com erro). E a forma moderna de lidar com Promises é a dupla **`async / await`**.

---

## 💻 Deep Dive (Passo a Passo)

Vamos criar um robô que pede dados na internet usando o comando `fetch`.

### Passo 1: O problema sem o `await`
Se você não esperar pela promessa, o código tenta ler a foto antes dela chegar.

```javascript
// ❌ O jeito que todo iniciante tenta primeiro (e falha)
function pegarDadosDoGitHub() {
  const resposta = fetch("https://api.github.com/users/github");
  console.log(resposta); // Imprime: Promise { <pending> } 
  // (Ou seja: "Ei, ainda estou esperando a resposta chegar!")
}
```

### Passo 2: O jeito antigo (Com `.then`)
Antigamente usávamos o `.then` (E então...). Era chato de escrever.

```javascript
function pegarNoJeitoAntigo() {
  // Vá na API...
  fetch("https://api.github.com/users/github")
    // ... E ENTÃO quando terminar, pegue a resposta...
    .then((resposta) => resposta.json())
    // ... E ENTÃO quando transformar em json, imprima.
    .then((dados) => console.log(dados.name))
    // ... SE DER ERRO, caia aqui.
    .catch((erro) => console.log("Ops, falhou: ", erro));
}
```

### Passo 3: O Padrão Ouro (Async / Await com Try/Catch)
A revolução do ES6. O `await` diz ao JavaScript: "Congele esta linha aqui. Espere a internet responder. Só quando chegar, jogue o valor na variável e vá para a linha de baixo."

```javascript
// Para usar o await dentro de uma função, a função DEVE ter a palavra 'async' antes!
async function pegarNoJeitoModerno() {
  // Try (Tente fazer isso)
  try {
    console.log("Iniciando a busca...");
    
    // Congele e espere!
    const resposta = await fetch("https://api.github.com/users/github");
    
    // Congele e espere transformar em JSON!
    const dados = await resposta.json();
    
    console.log("O nome verdadeiro é: " + dados.name);
    
  } 
  // Catch (Se qualquer await lá em cima der problema de internet, caia aqui)
  catch (erro) {
    console.error("Algo deu errado na rede!", erro);
  }
}

pegarNoJeitoModerno();
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Esquecer a palavra `async`
**O Sintoma:** O console mostra um erro de sintaxe vermelho: `SyntaxError: await is only valid in async functions`.
**A Causa:** O JavaScript proíbe você de pausar o tempo (usar `await`) se não avisar com antecedência na assinatura da função que ela é assíncrona (`async`).
**A Solução:** Coloque a palavra `async` antes de `function` ou antes dos parênteses da Arrow Function (`const fazerFetch = async () => {}`).

### Erro 2: Esquecer de usar `await` antes do `fetch` ou do `.json()`
**O Sintoma:** Você tenta ler `dados.name` e dá `undefined`, ou a tela do app não renderiza a lista.
**A Causa:** Você não esperou o tempo passar. Você guardou a caixa fechada (Promise) na variável em vez de esperar a caixa abrir.
**A Solução:** Toda função que retorna uma Promise precisa de um `await` antes dela. O `fetch` e o `.json()` são os exemplos mais clássicos. Lembre-se: são **DOIS** awaits num request HTTP normal.

---

## 🚀 Desafio Prático

**Contexto:** Você está desenvolvendo a Pokédex oficial. A API pública do Pokémon retorna dados.
**Tarefa:**
Escreva uma função moderna (com `async`/`await` e tratamento de erros via `try/catch`) chamada `buscarPokemon(nomeDoPokemon)`.
1. A função deve fazer um fetch para a URL: `https://pokeapi.co/api/v2/pokemon/[NOME_AQUI]`.
2. Se a busca for um sucesso, extraia o JSON e dê um `console.log` dizendo "Pokemon encontrado: [nome], ID: [id]".
3. Force um erro (chame a função buscando um nome inventado como "monstrinho123"). O console deve entrar no `catch` e avisar "Este pokemon não existe".
