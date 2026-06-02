---
title: "Projeto Final – To‑Do List SPA"
keywords: ["project", "todo", "spa", "javascript", "html", "css", "jest"]
module: "Projeto Final"
lesson: "01 - To‑Do List SPA"
---

# Projeto Final – To‑Do List SPA (Pareto)

## Visão geral
Construiremos uma **Single‑Page Application** simples de lista de tarefas (To‑Do List). O objetivo é consolidar os conceitos abordados nos módulos **JavaScript** e **HTML + CSS** e aplicar boas práticas de teste com **Jest**. Focaremos nos 20 % de funcionalidades que entregam 80 % de valor:

1. **Adicionar tarefa**
2. **Marcar como concluída / toggle**
3. **Remover tarefa**
4. **Persistência em `localStorage`**
5. **Testes unitários das funções core**
6. **UI responsiva mínima (Flexbox)**

## Estrutura de pastas
```
content/junior/project/to-do-list-spa/
│   index.html          # página única
│   styles.css          # layout Flexbox + responsividade
│   app.js              # lógica da SPA (ES6 modules)
│   app.test.js         # testes Jest (unitários)
│   README.md           # instruções de execução
```

## Passo a passo (Pareto)
### 1️⃣ Preparar ambiente
```bash
# Dentro da pasta do projeto
npm init -y                # cria package.json
npm i --save-dev jest     # instala Jest
```
Adicionar ao `package.json`:
```json
"scripts": {
  "test": "jest",
  "start": "live-server"   # opcional, para dev rápido
}
```
> **Live‑server** pode ser instalado globalmente (`npm i -g live-server`).

### 2️⃣ `index.html`
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>To‑Do List SPA</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main class="container">
    <h1>Minha Lista</h1>
    <form id="task-form">
      <input type="text" id="new-task" placeholder="Nova tarefa" required />
      <button type="submit">Adicionar</button>
    </form>
    <ul id="task-list"></ul>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
```

### 3️⃣ `styles.css` (Flexbox básico)
```css
body {font-family: Arial, sans-serif; margin:0; padding:0; display:flex; justify-content:center;}
.container {max-width:600px; width:100%; padding:1rem;}
#task-form {display:flex; gap:0.5rem; margin-bottom:1rem;}
#task-list {list-style:none; padding:0;}
#task-list li {display:flex; justify-content:space-between; padding:0.5rem; border-bottom:1px solid #ddd;}
.completed {text-decoration:line-through; color:#888;}
@media (max-width:600px){#task-form{flex-direction:column;}}
```

### 4️⃣ `app.js` – lógica core (ES6 module)
```js
const STORAGE_KEY = 'todo-items';

// ---- Utilidades de persistência ----
export function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---- Operações de tarefa ----
export function addTask(tasks, title) {
  const newTask = { id: Date.now(), title, completed: false };
  const updated = [...tasks, newTask];
  saveTasks(updated);
  return updated;
}

export function toggleTask(tasks, id) {
  const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveTasks(updated);
  return updated;
}

export function deleteTask(tasks, id) {
  const updated = tasks.filter(t => t.id !== id);
  saveTasks(updated);
  return updated;
}

// ---- UI Rendering ----
function render(tasks) {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button class="toggle">✓</button>
        <button class="delete">✖</button>
      </div>`;
    list.appendChild(li);
  });
}

// ---- Event listeners ----
document.addEventListener('DOMContentLoaded', () => {
  let tasks = loadTasks();
  render(tasks);

  const form = document.getElementById('task-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('new-task');
    if (!input.value.trim()) return;
    tasks = addTask(tasks, input.value.trim());
    input.value = '';
    render(tasks);
  });

  document.getElementById('task-list').addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);
    if (e.target.classList.contains('toggle')) {
      tasks = toggleTask(tasks, id);
    } else if (e.target.classList.contains('delete')) {
      tasks = deleteTask(tasks, id);
    }
    render(tasks);
  });
});
```

### 5️⃣ `app.test.js` – testes unitários (Jest)
```js
import { addTask, toggleTask, deleteTask } from './app.js';

// Mock localStorage
beforeEach(() => {
  const store = {};
  global.localStorage = {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => { for (let k in store) delete store[k]; })
  };
});

test('addTask creates a new task', () => {
  const tasks = [];
  const result = addTask(tasks, 'Teste');
  expect(result).toHaveLength(1);
  expect(result[0].title).toBe('Teste');
  expect(result[0].completed).toBe(false);
});

test('toggleTask inverte completed', () => {
  const task = { id: 1, title: 'A', completed: false };
  const result = toggleTask([task], 1);
  expect(result[0].completed).toBe(true);
});

test('deleteTask remove a task', () => {
  const task1 = { id: 1, title: 'A', completed: false };
  const task2 = { id: 2, title: 'B', completed: false };
  const result = deleteTask([task1, task2], 1);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe(2);
});
```

### 6️⃣ `README.md`
```markdown
# To‑Do List SPA

## Como rodar
```bash
npm install          # instala Jest (dev) e dependências
npm run start        # abre a aplicação com live‑server (ou abra index.html)
npm test             # executa os testes unitários
```

## Features cobertas (Pareto)
- CRUD básico (add / toggle / delete)
- Persistência via `localStorage`
- UI responsiva mínima (Flexbox + media query)
- Testes unitários de lógica de negócios

## Próximos passos (fora do escopo Pareto)
- Integração com *backend* (REST API)
- Drag‑and‑drop para ordenar tarefas
- Autenticação de usuário
```

---

**Esta estrutura cobre o núcleo do projeto e fornece tudo que o estudante precisa para implementar, testar e entender a SPA.**

---

> **Próxima ação:** Se estiver tudo certo, irei criar os arquivos físicos (`index.html`, `styles.css`, `app.js`, `app.test.js`, `README.md`) dentro da pasta `content/junior/project/to-do-list-spa/`.
