// Array to store tasks
let tasks = [];
let taskIdCounter = 1;

// DOM elements (will be initialized when DOM is ready)
let todoInput;
let addBtn;
let todoList;

// Load tasks from localStorage on page load
function loadTasksFromStorage() {
  const storedTasks = localStorage.getItem('todoTasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    // Update counter to avoid ID conflicts
    if (tasks.length > 0) {
      taskIdCounter = Math.max(...tasks.map(task => task.id)) + 1;
    }
  }
}

// Save tasks to localStorage
function saveTasksToStorage() {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Function to show error message for blank inputs
function showErrorMessage(message) {
  // Remove any existing error message
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Create and show new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = '#dc3545';
  errorDiv.style.fontSize = '14px';
  errorDiv.style.marginTop = '5px';

  // Insert after the todo-input div
  const todoInputDiv = document.querySelector('.todo-input');
  todoInputDiv.insertAdjacentElement('afterend', errorDiv);

  // Remove error message after 3 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 3000);
}

// Function to clear any error messages
function clearErrorMessage() {
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}

// Function to read input value
function getInputValue() {
  if (!todoInput) {
    console.error('todoInput not initialized');
    return '';
  }
  return todoInput.value.trim();
}

// Function to validate input
function validateInput(inputValue) {
  if (inputValue === '') {
    showErrorMessage('Please enter a task before adding.');
    return false;
  }

  if (inputValue.length < 2) {
    showErrorMessage('Task must be at least 2 characters long.');
    return false;
  }

  if (inputValue.length > 100) {
    showErrorMessage('Task cannot exceed 100 characters.');
    return false;
  }

  return true;
}

// Function to push new tasks into array
function addTaskToArray(taskText) {
  const newTask = {
    id: taskIdCounter++,
    text: taskText,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);

  // Save to localStorage after adding
  saveTasksToStorage();

  return newTask;
}

// Function to render tasks into the UL with delete buttons
function renderTasks() {
  if (!todoList) {
    console.error('todoList not initialized');
    return;
  }

  // Clear existing list
  todoList.innerHTML = '';

  // Render each task
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <div class="todo-checkbox ${task.completed ? 'checked' : ''}"></div>
      <span class="todo-text">${escapeHtml(task.text)}</span>
      <button class="delete-btn">Delete</button>
    `;

    todoList.appendChild(li);
  });

  // Update task counter
  updateTaskCounter();
}

// Function to clear the input after adding
function clearInput() {
  if (todoInput) {
    todoInput.value = '';
  }
}

// Function to handle adding a new task
function handleAddTask() {
  const inputValue = getInputValue();

  // Validate input with error handling
  if (!validateInput(inputValue)) {
    return; // Don't proceed if validation fails
  }

  // Clear any existing error messages
  clearErrorMessage();

  // Add task to array (which also saves to localStorage)
  addTaskToArray(inputValue);

  // Re-render tasks
  renderTasks();

  // Clear input
  clearInput();
}

// Function to handle deleting a task
function handleDeleteTask(taskId) {
  // Remove task from array
  tasks = tasks.filter(task => task.id !== parseInt(taskId));

  // Save to localStorage after deletion
  saveTasksToStorage();

  // Re-render tasks
  renderTasks();
}

// Function to handle toggling task completion
function handleToggleTask(taskId) {
  const task = tasks.find(task => task.id === parseInt(taskId));
  if (task) {
    task.completed = !task.completed;

    // Save to localStorage after toggle
    saveTasksToStorage();

    renderTasks();
  }
}

// Function to update task counter
function updateTaskCounter() {
  const pendingCount = tasks.filter(task => !task.completed).length;
  const pendingCountElement = document.querySelector('.pending-count');
  if (pendingCountElement) {
    pendingCountElement.textContent = `${pendingCount} ${pendingCount === 1 ? 'task' : 'tasks'} remaining`;
  }
}

// Function to handle filter button clicks
function handleFilterClick(filter) {
  // Update active filter button
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  // Filter and render tasks based on selection
  let filteredTasks = tasks;
  switch (filter) {
  case 'pending':
    filteredTasks = tasks.filter(task => !task.completed);
    break;
  case 'completed':
    filteredTasks = tasks.filter(task => task.completed);
    break;
  default:
    filteredTasks = tasks;
  }

  renderFilteredTasks(filteredTasks);
  updateTaskCounter();
}

// Function to render filtered tasks
function renderFilteredTasks(filteredTasks) {
  if (!todoList) {
    return;
  }

  todoList.innerHTML = '';

  if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.style.textAlign = 'center';
    emptyMessage.style.color = '#999';
    emptyMessage.style.padding = '20px';
    emptyMessage.textContent = 'No tasks found';
    todoList.appendChild(emptyMessage);
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <div class="todo-checkbox ${task.completed ? 'checked' : ''}"></div>
      <span class="todo-text">${escapeHtml(task.text)}</span>
      <button class="delete-btn">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

// Function to clear completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasksToStorage();
  renderTasks();
  updateTaskCounter();
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize the app
function initializeApp() {
  // Get DOM elements
  todoInput = document.getElementById('todoInput');
  addBtn = document.getElementById('addBtn');
  todoList = document.getElementById('todoList');

  // Check if elements exist
  if (!todoInput || !addBtn || !todoList) {
    console.error('Required DOM elements not found');
    return;
  }

  // Set up event listeners
  addBtn.addEventListener('click', handleAddTask);

  todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  });

  // Event listener for delete actions (using event delegation)
  todoList.addEventListener('click', function (e) {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) {
      return;
    }

    const taskId = todoItem.dataset.id;

    if (e.target.classList.contains('delete-btn')) {
      handleDeleteTask(taskId);
    } else if (e.target.classList.contains('todo-checkbox')) {
      handleToggleTask(taskId);
    }
  });

  // Clear error message when user starts typing
  todoInput.addEventListener('input', clearErrorMessage);

  // Add event listeners for filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      handleFilterClick(btn.dataset.filter);
    });
  });

  // Add event listener for clear completed button
  const clearCompletedBtn = document.getElementById('clearCompleted');
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
  }

  // Load tasks from localStorage and render
  loadTasksFromStorage();
  renderTasks();
  updateTaskCounter();

  console.log('App initialized successfully!');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
