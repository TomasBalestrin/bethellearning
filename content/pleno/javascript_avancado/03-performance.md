---
title: "Performance (Memoization, Debouncing, Throttling)"
keywords: ["javascript", "performance", "memoization", "debouncing", "throttling", "pleno"]
module: "JavaScript / TypeScript Avançado"
lesson: "03 - Performance"
---

# Aula 03 - Performance (Memoization, Debouncing, Throttling)

## 🎯 O Conceito (Pareto 80/20)

Um desenvolvedor Junior foca em fazer o código funcionar. Um Pleno garante que o código funcione **sob carga**. Estes três padrões resolvem 80% dos travamentos de interface e chamadas desnecessárias à API.

1. **Debouncing (Atraso Intencional):** "Espere o usuário terminar de digitar/mexer antes de eu executar a função pesada". Útil para barras de busca.
2. **Throttling (Estrangulamento):** "Execute esta função no MÁXIMO a cada X milissegundos, não importa quantas vezes o evento ocorra". Útil para Scroll de página.
3. **Memoization (Cache em Memória):** "Se eu já calculei a resposta para esta pergunta difícil, guarde na memória e me dê a resposta direto da próxima vez". Útil para cálculos matemáticos caros.

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: Construindo um Debounce do zero
A lógica do Debounce é resetar o relógio a cada novo evento. Se o relógio conseguir chegar a zero, a função roda.
Crie um arquivo `debounce.js`:

```javascript
// A função de ordem superior (Higher-Order Function) que cria o Debounce
function debounce(funcaoAlvo, atrasoMilissegundos) {
  let timeoutId;

  return function(...args) {
    // 1. Limpamos o temporizador anterior (se houver)
    clearTimeout(timeoutId);
    
    // 2. Iniciamos um novo temporizador
    timeoutId = setTimeout(() => {
      // 3. Só rodamos a função original se o temporizador não for cancelado
      funcaoAlvo.apply(this, args);
    }, atrasoMilissegundos);
  };
}

// Simulando uma API de busca
const buscarNaAPI = (termo) => console.log(`🔍 Buscando no banco de dados por: ${termo}`);

const buscaDebounced = debounce(buscarNaAPI, 1000); // Espera 1 segundo

// O usuário digita super rápido:
buscaDebounced("r");
buscaDebounced("re");
buscaDebounced("rea");
buscaDebounced("react");

// Resultado: A API só será chamada UMA vez, com "react", após 1 segundo.
```

### Passo 2: Construindo um Throttle do zero
A lógica do Throttle é usar uma bandeira (`flag`) para trancar a porta de entrada até o tempo passar.

```javascript
function throttle(funcaoAlvo, intervalo) {
  let portaAberta = true; // Flag de controle

  return function(...args) {
    if (portaAberta) {
      // Executa imediatamente
      funcaoAlvo.apply(this, args);
      portaAberta = false; // Tranca a porta

      // Inicia o cronômetro para abrir a porta novamente
      setTimeout(() => {
        portaAberta = true;
      }, intervalo);
    }
  };
}

const atualizarScroll = throttle(() => console.log("📜 Posição da tela atualizada"), 2000);

// Usuário roda o scroll furiosamente 100 vezes por segundo...
setInterval(atualizarScroll, 10); 
// Resultado: O console só mostra a mensagem a cada 2 segundos.
```

### Passo 3: Implementando Memoization
A memoização salva respostas num objeto ou Map.

```javascript
function memoize(fn) {
  const cache = new Map(); // Nosso "banco de dados" em memória

  return function(...args) {
    const key = JSON.stringify(args); // A chave do cache é baseada nos argumentos
    
    if (cache.has(key)) {
      console.log("⚡ Retornando do Cache rápido!");
      return cache.get(key);
    }
    
    console.log("⏳ Calculando e salvando no Cache...");
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const calculoPesado = memoize((num) => num * num * num);

console.log(calculoPesado(50)); // Imprime: "Calculando..." e depois 125000
console.log(calculoPesado(50)); // Imprime: "Retornando do Cache..." e depois 125000
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: O React "esquece" o Debounce a cada renderização
**O Sintoma:** Você usa sua função `debounce` dentro de um componente React, mas ela roda múltiplas vezes ignorando o atraso.
**O Motivo:** No React, toda vez que o estado muda, a função do componente roda de novo, recriando uma NOVA função de debounce do zero.
**A Solução:** Você deve colocar o Debounce dentro de um `useCallback` ou `useMemo`, ou usar um hook de terceiros como `useDebounce`.

### Erro 2: Vazamento de Memória na Memoization
**O Sintoma:** A aba do navegador começa a consumir 2GB de RAM após a aplicação ficar aberta por muito tempo.
**A Causa:** Sua função `memoize` está salvando todos os parâmetros infinitamente no `Map` e eles nunca são apagados.
**A Solução:** Usar cache do tipo LRU (Least Recently Used) que apaga dados velhos se atingir um limite máximo (ex: 100 itens no cache), ou usar `WeakMap` para objetos.

---

## 🚀 Desafio Prático

**Contexto:** Você está criando a funcionalidade de "Auto-Save" para um editor de textos estilo Google Docs.
**Tarefa:** 
1. Crie uma página HTML simples com um `<textarea id="editor">` e um elemento `<span id="status"></span>`.
2. Escreva um script JS que capture o evento de `input` (quando o usuário digita no textarea).
3. Utilize a técnica de **Debounce** (com atraso de 2 segundos) para disparar a função `salvarNoServidor()`.
4. A função `salvarNoServidor()` deve simular uma chamada de rede atualizando o `<span id="status">` para "Salvando..." e, após 1 segundo (usando `setTimeout` simples), mudando para "Salvo na nuvem!".
5. Como bônus extra: implemente Memoização para não salvar se o texto exato for igual ao texto anterior já salvo.
