/*
    DoIT Task Management Functionality
    Initial Development by Justin Emerick
    COM 430 Software Engineering
*/

// DOM Element References

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "./DoIT_taskAPI.js";

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDueDate = document.getElementById("taskDueDate");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");
const taskCounter = document.getElementById("taskCounter");


document.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
    const tasks = await getTasks();

    taskList.innerHTML = "";

    taskCounter.textContent = `Total Tasks: ${tasks.length}`;

    tasks.forEach(createTaskCard);
}

// Create task container

function createTaskCard(task) {

    const taskCard = document.createElement("div");

    taskCard.innerHTML = `
        <h3>${task.title}</h3>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Due Date:</strong> ${task.due_date || task.dueDate}</p>
        <p>${task.description}</p>
        <button class="deleteTaskButton">Delete Task</button>
    `;

    // Delete Task Event

    const deleteTaskButton =
        taskCard.querySelector(".deleteTaskButton");

    deleteTaskButton.addEventListener("click", async () => {
        await deleteTask(task.task_id);
        loadTasks();
    });

    // Add task to page

    taskList.appendChild(taskCard);
}

    // Create Task Event

addTaskButton.addEventListener("click", async function () {

    // Store user input values

    const title = taskTitle.value;
    const description = taskDescription.value;
    const priority = taskPriority.value;
    const dueDate = taskDueDate.value;

    // Basic validation

    if (
        title === "" ||
        description === "" ||
        priority === "" ||
        dueDate === ""
    ) {
        alert("Please complete all fields.");
        return;
    }

    const taskData = {
        project_id: 1,
        sprint_id: 1,
        assigned_to: 1,
        title,
        description,
        priority,
        status: "Backlog",
        story_points: 1,
        due_date: dueDate
    };

    await createTask(taskData);

    // Clear form after task creation

    taskTitle.value = "";
    taskDescription.value = "";
    taskPriority.value = "";
    taskDueDate.value = "";

    loadTasks();
});