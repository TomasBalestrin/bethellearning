# To‑Do List SPA

## Descrição
Aplicação **Single‑Page Application** que permite ao usuário gerenciar uma lista de tarefas. Implementa as funcionalidades essenciais (CRUD) com persistência em `localStorage` e inclui testes unitários via **Jest**.

## Como executar
```bash
# Dentro da pasta do projeto
npm install          # instala Jest (dev) e dependências
npm run start        # abre a aplicação com live‑server (ou abra index.html no navegador)
npm test             # roda os testes unitários
```
> **Live‑server** pode ser instalado globalmente: `npm i -g live-server`.

## Estrutura de pastas
```
project/to-do-list-spa/
│   index.html          # página única
│   styles.css          # layout Flexbox + responsividade
│   app.js              # lógica da SPA (ES6 modules)
│   app.test.js         # testes Jest (unitários)
│   README.md           # este arquivo
```

## Funcionalidades (Pareto) ✅
- Adicionar tarefa
- Marcar como concluída / toggle
- Remover tarefa
- Persistência em `localStorage`
- UI responsiva mínima (Flexbox + media query)
- Testes unitários das funções core

## Próximos passos (fora do escopo Pareto)
- Integração com backend (REST API)
- Drag‑and‑drop para ordenar tarefas
- Autenticação de usuário

---

*Este README faz parte do material de aprendizado: inclui instruções de execução e explicita o foco nas práticas de maior valor.*
