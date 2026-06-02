---
title: "State Management Escalável"
keywords: ["state management", "redux", "zustand", "context api", "pleno"]
module: "Arquitetura e Design de Código"
lesson: "03 - State Management Escalável"
---

# Aula 03 - State Management Escalável

## 🎯 O Conceito (Pareto 80/20)

Gerenciar o "estado" (os dados que a aplicação exibe e altera) é a parte mais complexa no desenvolvimento de Single Page Applications (SPAs).

O problema central: **O "Prop Drilling"**. Se o App raiz tem o "Usuário Logado" e um componente Avatar na Navbar, que está dentro do Header, precisa dessa info... você tem que repassar essa prop por componentes que não se importam com ela.

Soluções de Estado Global:
1. **Flux Pattern (Redux):** Muito verboso, previsível, excelente para apps gigantes (nível bancário).
2. **Atomic/Proxy (Zustand / Jotai):** Pouquíssimo código (boilerplate quase zero), não precisa envolver a aplicação em Context Providers. É o "Pareto" atual da comunidade React.
3. **Server State (React Query):** Dados que vieram do banco NÃO são estado global. São "Estado do Servidor". Use ferramentas de Server State para cachear e não misture com Redux/Zustand.

---

## 💻 Deep Dive (Passo a Passo)

Vamos ver como sair do pesadelo do Redux antigo e criar um estado global limpo usando o **Zustand**.

### Passo 1: Entendendo a diferença de Boilerplate
Com Redux clássico, você precisa criar: Actions, Action Types, Reducers, e o Store. Tudo em arquivos separados. Com Zustand, tudo fica num único Hook.

Instale no seu projeto: `npm install zustand`

### Passo 2: Criando a Store (O Banco de Dados do Frontend)
Crie o arquivo `useCarrinhoStore.js`:

```javascript
import { create } from 'zustand';

// O método 'set' serve para atualizar o estado mesclando os dados
export const useCarrinhoStore = create((set) => ({
  // 1. O Estado Inicial
  itens: [],
  total: 0,

  // 2. Ações (Mutations)
  adicionarItem: (novoItem) => set((state) => ({ 
    itens: [...state.itens, novoItem],
    total: state.total + novoItem.preco 
  })),

  limparCarrinho: () => set({ itens: [], total: 0 }),
}));
```

### Passo 3: Consumindo o Estado em qualquer lugar
A mágica do Zustand é que você não precisa colocar um `<Provider>` gigantesco no seu `App.jsx`. Você simplesmente chama o hook.

Crie um componente `BotaoComprar.jsx`:
```jsx
import { useCarrinhoStore } from './useCarrinhoStore';

export function BotaoComprar() {
  // Extraímos APENAS a ação de adicionar. Se o total mudar, este componente NÃO re-renderiza.
  const adicionar = useCarrinhoStore((state) => state.adicionarItem);

  const produto = { id: 1, nome: 'Teclado Mecânico', preco: 250 };

  return (
    <button onClick={() => adicionar(produto)}>
      Adicionar Teclado
    </button>
  );
}
```

Crie o componente `ResumoCarrinho.jsx`:
```jsx
import { useCarrinhoStore } from './useCarrinhoStore';

export function ResumoCarrinho() {
  // Este componente "escuta" o total. Se o total mudar, ele re-renderiza sozinho.
  const total = useCarrinhoStore((state) => state.total);
  const quantidade = useCarrinhoStore((state) => state.itens.length);

  return (
    <div className="resumo">
      <p>Itens: {quantidade}</p>
      <p>Total a pagar: R$ {total}</p>
    </div>
  );
}
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Re-renderizações Desnecessárias (O "Tudo Renderiza")
**O Sintoma:** Toda vez que você altera UM dado na Store global, a sua aplicação inteira pisca na tela.
**O Motivo:** No Zustand/Redux, se você extrair o estado inteiro `const estadoCompleto = useStore()`, seu componente será notificado de *qualquer* alteração no estado.
**A Solução:** Use Seletores. Extraia apenas o dado específico que você precisa: `const userName = useStore(state => state.user.name)`.

### Erro 2: Salvar a resposta da API no Estado Global
**O Sintoma:** Você faz um `fetch` para pegar a lista de produtos, salva numa variável `produtos` no Redux/Zustand, e constrói a tela. 5 minutos depois, o banco de dados muda, mas a tela do usuário continua com os produtos antigos.
**A Solução:** Separe o Estado da UI do Estado do Servidor. Use o **TanStack Query (React Query)** para chamadas de API. Ele lida com Caching, Revalidação em Background, e estados de *Loading/Error* automaticamente. Deixe o Zustand apenas para UI (Modais abertos, Carrinho, Dark Mode).

---

## 🚀 Desafio Prático

**Contexto:** Você está desenvolvendo um App com um "Modo Escuro" (Dark Mode) que precisa ser lembrado mesmo se o usuário fechar a aba do navegador.
**Tarefa:**
1. Crie uma Store Zustand chamada `useTemaStore`.
2. Ela deve ter a variável `tema` ("light" ou "dark") e uma ação `alternarTema()`.
3. Pesquise na documentação oficial do Zustand como usar o Middleware **`persist`**. Aplique o middleware na sua Store para que o estado seja automaticamente salvo no `localStorage` e recuperado quando a página recarregar, sem você precisar escrever lógica de `localStorage.setItem` manualmente.
