---
title: "Módulos ES6"
keywords: ["javascript", "modules", "import", "export", "junior"]
module: "JavaScript Moderno (ES6+)"
lesson: "05 - Módulos ES6"
---

# Aula 05 - Módulos ES6 (Organizando a Bagunça)

## 🎯 O Conceito (Pareto 80/20)

Antigamente (antes do ES6), você tinha que incluir dezenas de tags `<script>` no seu arquivo HTML. O seu arquivo JS principal tinha 5.000 linhas, uma confusão onde todas as variáveis se misturavam no "Escopo Global". Se duas bibliotecas diferentes usassem a mesma variável `let nome`, uma apagava o dado da outra.

A revolução dos **Módulos (ES Modules)** mudou o jogo.
O conceito é que cada arquivo `.js` é uma caixa selada e lacrada. Nada que está lá dentro vaza para fora. Se você quiser que uma função de outro arquivo fique disponível para você usar, esse arquivo precisa jogar a função para fora (usando **`export`**) e o seu arquivo precisa puxar a função para dentro (usando **`import`**).

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir um sistema que separa a matemática da lógica visual.

### Passo 1: O Export Nomeado (Várias saídas)
Crie um arquivo chamado `matematica.js`. Ele tem várias funções que você pode querer usar.

```javascript
// matematica.js

// Usando 'export' na frente, nós jogamos essas funções pra fora da caixa.
export function somar(a, b) {
  return a + b;
}

export function subtrair(a, b) {
  return a - b;
}

// Esta função não tem export! 
// Ela é "privada" deste arquivo, ninguém de fora pode usá-la.
function calcularSecreta() {
  return 42;
}
```

### Passo 2: O Export Padrão (Default)
Às vezes, um arquivo serve inteirinho para uma única coisa (ex: o componente de um Botão no React). Nesses casos, usamos o **`export default`**.

Crie o arquivo `Botao.js`:
```javascript
// Botao.js

function BotaoVermelho() {
  console.log("Desenhando Botão na Tela...");
}

// O default diz: "Se alguém importar este arquivo, entregue esta função"
export default BotaoVermelho;
```

### Passo 3: O Import (Reunindo tudo)
Agora, no seu `app.js` (seu arquivo principal), você pega as peças do Lego e monta.

```javascript
// app.js

// 1. Importando as funções nomeadas (tem que usar as { chaves } e o nome exato)
import { somar, subtrair } from './matematica.js';

// 2. Importando o default (NÃO usa chaves, e você pode dar o nome que quiser!)
import MeuBotao from './Botao.js';

console.log( somar(10, 5) ); // 15
MeuBotao(); // "Desenhando Botão na Tela..."
```

*(Detalhe para HTML: Para o navegador entender o `import`, no seu arquivo `index.html` você precisa chamar o `app.js` dizendo que ele é um módulo: `<script type="module" src="app.js"></script>`)*

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Chaves `{}` no Export Default
**O Sintoma:** Você exportou um componente usando `export default MinhaLista` e depois tentou importar com `import { MinhaLista } from './lista.js'`. O JavaScript dá um erro fatal dizendo que aquele import não existe.
**A Causa:** Import Nomeado exige chaves. Import Default proíbe chaves. Essa é a regra número um que mais derruba desenvolvedores Juniors.
**A Solução:** Mude para `import MinhaLista from './lista.js'` (sem as chaves).

### Erro 2: `Cannot use import statement outside a module`
**O Sintoma:** Você escreve um arquivo no Node.js (backend) usando `import` e a tela explode com esse erro vermelho no terminal.
**A Causa:** Historicamente, o Node.js usava um sistema de módulos antigo chamado `CommonJS` (com `require('coisa')`). Ele não sabia ler o `import` do ES6.
**A Solução (No Node.js):** Vá no seu arquivo `package.json` e adicione a linha `"type": "module",` lá no começo. O Node passará a aceitar os imports modernos imediatamente!

---

## 🚀 Desafio Prático

**Contexto:** Você tem um arquivo chamado `bancoDeDados.js`. Nele você tem uma string secreta com a senha (`let senhaDB = "123"`), uma função `conectar()`, e uma função `desconectar()`.
**Tarefa:**
Escreva o arquivo `bancoDeDados.js` e o arquivo `servidor.js` garantindo que:
1. O arquivo servidor consiga invocar as funções `conectar` e `desconectar`.
2. O arquivo servidor seja COMPLETAMENTE INCAPAZ de imprimir a variável `senhaDB` (Garantindo que ela seja privada do módulo, sem nenhum export).
3. O código deve usar as nomenclaturas exatas do `export` e `import`.
