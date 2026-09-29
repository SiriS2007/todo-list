let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Convert old tasks to the new format
tasks = tasks.map(function(task) {
    if (typeof task === "string") {
        return {
            text: task,
            completed: false
        };
    }

    return task;
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    input.value = "";
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    let taskCount = document.getElementById("taskCount");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        let li = document.createElement("li");

        li.textContent = task.text;

        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        li.onclick = function() {
            task.completed = !task.completed;

            saveTasks();
            displayTasks();
        };

        // Create Edit button
    let editButton = document.createElement("button");

    editButton.textContent = "Edit";

    editButton.onclick = function(event) {
        event.stopPropagation();

        let newTask = prompt("Edit your task:", task.text);

        if (newTask !== null && newTask.trim() !== "") {
            task.text = newTask.trim();

            saveTasks();
            displayTasks();
        }
    };

    // Create Delete button
    let deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

        deleteButton.onclick = function(event) {
            event.stopPropagation();

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        };

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length + " tasks remaining";
}

function clearTasks() {
    tasks = [];

    localStorage.removeItem("tasks");

    displayTasks();
}

displayTasks();
document.getElementById("taskInput").addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        addTask();
    }
});