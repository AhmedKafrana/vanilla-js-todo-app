class TodoApp {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.currentFilter = 'all';
    this.todoIdCounter =
      this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;

    this.initializeElements();
    this.bindEvents();
    this.render();
  }

  initializeElements() {
    this.todoInput = document.getElementById('todoInput');
    this.addBtn = document.getElementById('addBtn');
    this.todoList = document.getElementById('todoList');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.pendingCount = document.querySelector('.pending-count');
    this.clearCompletedBtn = document.getElementById('clearCompleted');
  }

  bindEvents() {
    // Add todo events
    this.addBtn.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });

    // Filter events
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        this.setFilter(e.target.dataset.filter);
      });
    });

    // Clear completed event
    this.clearCompletedBtn.addEventListener('click', () =>
      this.clearCompleted()
    );

    // Todo list events (using event delegation)
    this.todoList.addEventListener('click', e => {
      const todoItem = e.target.closest('.todo-item');
      if (!todoItem) {
        return;
      }

      const todoId = parseInt(todoItem.dataset.id);

      if (e.target.classList.contains('todo-checkbox')) {
        this.toggleTodo(todoId);
      } else if (e.target.classList.contains('delete-btn')) {
        this.deleteTodo(todoId);
      }
    });
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) {
      return;
    }

    const newTodo = {
      id: this.todoIdCounter++,
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.unshift(newTodo); // Add to beginning of array
    this.todoInput.value = '';
    this.saveTodos();
    this.render();

    // Add a subtle animation
    setTimeout(() => {
      const newItem = this.todoList.querySelector(`[data-id="${newTodo.id}"]`);
      if (newItem) {
        newItem.style.transform = 'translateY(-10px)';
        newItem.style.opacity = '0';
        setTimeout(() => {
          newItem.style.transform = 'translateY(0)';
          newItem.style.opacity = '1';
        }, 10);
      }
    }, 10);
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;

    // Update active filter button
    this.filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    this.render();
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.saveTodos();
    this.render();
  }

  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'pending':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }

  render() {
    const filteredTodos = this.getFilteredTodos();

    // Clear current list
    this.todoList.innerHTML = '';

    if (filteredTodos.length === 0) {
      this.renderEmptyState();
    } else {
      filteredTodos.forEach(todo => {
        this.renderTodoItem(todo);
      });
    }

    this.updateStats();
  }

  renderEmptyState() {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-state';

    let message = '';
    switch (this.currentFilter) {
      case 'pending':
        message =
          this.todos.length === 0
            ? '<h3>No tasks yet</h3><p>Add your first task above!</p>'
            : '<h3>All caught up!</h3><p>No pending tasks remaining.</p>';
        break;
      case 'completed':
        message =
          '<h3>No completed tasks</h3><p>Complete some tasks to see them here.</p>';
        break;
      default:
        message =
          '<h3>No tasks yet</h3><p>Add your first task above to get started!</p>';
    }

    emptyDiv.innerHTML = message;
    this.todoList.appendChild(emptyDiv);
  }

  renderTodoItem(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
            <div class="todo-checkbox ${todo.completed ? 'checked' : ''}"></div>
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <button class="delete-btn">×</button>
        `;

    this.todoList.appendChild(li);
  }

  updateStats() {
    const pendingCount = this.todos.filter(t => !t.completed).length;
    const completedCount = this.todos.filter(t => t.completed).length;

    // Update pending count
    this.pendingCount.textContent = `${pendingCount} ${pendingCount === 1 ? 'task' : 'tasks'} remaining`;

    // Show/hide clear completed button
    this.clearCompletedBtn.style.display =
      completedCount > 0 ? 'block' : 'none';
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});

// Add some helpful keyboard shortcuts
document.addEventListener('keydown', e => {
  // Ctrl/Cmd + / to focus input
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    document.getElementById('todoInput').focus();
  }

  // Escape to clear input
  if (e.key === 'Escape') {
    const input = document.getElementById('todoInput');
    if (input === document.activeElement) {
      input.value = '';
      input.blur();
    }
  }
});
