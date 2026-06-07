/*
    DoIT Task Management Functionality
    Initial Development by Justin Emerick
    COM 430 Software Engineering
*/

// DOM Element References

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDueDate = document.getElementById("taskDueDate");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");


// Create Task Event

addTaskButton.addEventListener("click", function () {

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

    // Create task container

    const taskCard = document.createElement("div");

    taskCard.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
        <p>${description}</p>
        <button class="deleteTaskButton">Delete Task</button>
    `;

    // Delete Task Event

    const deleteTaskButton =
        taskCard.querySelector(".deleteTaskButton");

    deleteTaskButton.addEventListener("click", function () {

        taskCard.remove();

    });

    // Add task to page

    taskList.appendChild(taskCard);

    // Clear form after task creation

    taskTitle.value = "";
    taskDescription.value = "";
    taskPriority.value = "";
    taskDueDate.value = "";

});