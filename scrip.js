const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Load tasks from browser
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    liked: false,
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

// Display tasks
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    li.className = "task";

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
            <input 
                type="checkbox" 
                ${task.completed ? "checked" : ""}
                onchange="toggleComplete(${task.id})"
            >

            <span class="task-text">
                ${task.text}
            </span>

            <button 
                class="like-btn ${task.liked ? "liked" : ""}"
                onclick="toggleLike(${task.id})"
            >
                ${task.liked ? "♥" : "♡"}
            </button>

            <button 
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>
        `;

    taskList.appendChild(li);
  });

  updateStats();
}

// Complete / uncomplete task
function toggleComplete(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

// Like / unlike task
function toggleLike(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      task.liked = !task.liked;
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

// Update counters
function updateStats() {
  const total = tasks.length;

  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  const pending = total - completed;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  pendingTasks.textContent = pending;
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add button
addBtn.addEventListener("click", addTask);

// Press Enter to add
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Initial display
renderTasks();
