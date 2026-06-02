// app.js – lógica da To‑Do List SPA (ES6 module)

const STORAGE_KEY = 'todo-items';

/** Load tasks from localStorage */
export function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/** Save tasks to localStorage */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/** Add a new task */
export function addTask(tasks, title) {
  const newTask = { id: Date.now(), title, completed: false };
  const updated = [...tasks, newTask];
  saveTasks(updated);
  return updated;
}

/** Toggle completed flag */
export function toggleTask(tasks, id) {
  const updated = tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveTasks(updated);
  return updated;
}

/** Delete a task */
export function deleteTask(tasks, id) {
  const updated = tasks.filter(t => t.id !== id);
  saveTasks(updated);
  return updated;
}

/** Render UI */
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
        <button class="toggle" aria-label="Marcar como concluída">✓</button>
        <button class="delete" aria-label="Remover tarefa">✖</button>
      </div>`;
    list.appendChild(li);
  });
}

/** Initialise listeners */
document.addEventListener('DOMContentLoaded', () => {
  let tasks = loadTasks();
  render(tasks);

  const form = document.getElementById('task-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('new-task');
    const title = input.value.trim();
    if (!title) return;
    tasks = addTask(tasks, title);
    input.value = '';
    render(tasks);
  });

  const ul = document.getElementById('task-list');
  ul.addEventListener('click', e => {
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
