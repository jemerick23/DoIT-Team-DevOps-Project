import { fetchDashboardTasks } 
from "./DoIT_DashboardAPI.js";

let allTasks = [];

export async function initializeDashboardWidgets() {

    allTasks = await fetchDashboardTasks();

    loadTasks();
    renderRoleBoard();
    renderStatusBoard();
}

//Display tasks

function loadTasks() {
    const taskList = document.getElementById("dashboardTaskList");
    taskList.innerHTML = "";

    if (allTasks.length === 0) {
        taskList.innerHTML += "<p>No tasks found.</p>";
        return;
    }

    allTasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "dashboard-task";
        div.innerHTML = `
            <strong>${task.title}</strong>
            <span class="task-status">${task.status}</span><br>
            <small>Assigned: ${task.assigned_to} - Priority: ${task.priority}</small>
        `;
        taskList.appendChild(div);
    });
}

function renderRoleBoard() {
    const container = document.getElementById("roleList");

    const grouped = {};
    allTasks.forEach(task => {
        const role = task.assigned_to || "Unassigned";
        if (!grouped[role]) grouped[role] = [];
        grouped[role].push(task);
    });

    container.innerHTML = "";

    Object.keys(grouped).forEach(role => {
        const section = document.createElement("div");
        section.className = "role-section";
        section.innerHTML = `
            <h4>${role}</h4>
            <ul>
                ${grouped[role]
                    .map(t => `<li>${t.title} <span class="badge">${t.status}</span></li>`)
                    .join("")}
            </ul>
        `;
        container.appendChild(section);
    });
}

function renderStatusBoard() {
    const container = document.getElementById("progressList");

    if (!container) return;

    const grouped = {};

    allTasks.forEach(task => {
        if (!grouped[task.status]) grouped[task.status] = [];
        grouped[task.status].push(task);
    });

    container.innerHTML = "";

    Object.keys(grouped).forEach(status => {
        const total = grouped[status].length;
        const section = document.createElement("div");
        section.className = "status-section";
        section.innerHTML = `
            <h4>${status} <span class="badge">${total}</span></h4>
            <ul>
                ${grouped[status]
                    .map(t => `<li>${t.title} (${t.priority})</li>`)
                    .join("")}
            </ul>
        `;
        container.appendChild(section);
    });
}

