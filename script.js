
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        const taskName = document.createElement("span");
        taskName.textContent = task.text;

        if (task.completed) {
            taskName.style.textDecoration = "line-through";
        }

        taskName.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            showTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        });

        li.appendChild(taskName);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    showTasks();

    taskInput.value = "";
});

showTasks();