import {initializeDashboardWidgets}
from "./DoIT_DashboardWidgets.js";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDashboardWidgets();
    }
);

function openSidebar() { //<--This allows the sidebar to open
    document.getElementById("mySidebar").style.width = "240px";
    document.getElementById("mySidebar").classList.add("open");
}

function closeSidebar() { //<--This allows the sidebar to close
    document.getElementById("mySidebar").style.width = "90px";
    document.getElementById("mySidebar").classList.remove("open");
}

function toggleSidebar() { //<--This allows users to open and close using the toggle button
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    sidebar.classList.toggle("open");


if (sidebar.classList.contains("open")){ //<--This format the sidebar when open
    sidebar.style.width = "240px";
    main.style.marginLeft = "240px";
    sidebar.classList.add("open");
    openSidebar();
    
    }else{
        sidebar.style.width = "90px";
        main.style.marginLeft = "90px";
        closeSidebar();
    }
}

//  DOIT ASSISTANT

const assistantBtn = document.getElementById("assistant-btn");
const assistantBox = document.getElementById("assistant-box");
const assistantInput = document.getElementById("assistant-input");
const assistantSend = document.getElementById("assistant-send");
const assistantMessages = document.getElementById("assistant-messages");


if (assistantBox) {
    assistantBox.style.display = "none";
}


if (assistantBtn && assistantBox) {
    assistantBtn.addEventListener("click", () => {
        if (assistantBox.style.display === "none") {
            assistantBox.style.display = "flex";
        } else {
            assistantBox.style.display = "none";
        }
    });
}


function getReply(text) {
    text = text.toLowerCase();

    if (text.includes("task")) return "Check your Tasks section in the dashboard.";
    if (text.includes("role")) return "Roles are listed in the Roles panel.";
    if (text.includes("progress")) return "Your progress is shown in Project Progress section.";
    if (text.includes("hello")) return "Hey 👋 I’m your DoIT assistant.";

    return "Try asking about tasks, roles, or progress.";
}


function sendMessage() {
    if (!assistantInput || !assistantMessages) return;

    const text = assistantInput.value;
    if (!text) return;

    
    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = text;
    assistantMessages.appendChild(userMsg);

   
    const botMsg = document.createElement("div");
    botMsg.className = "bot";
    botMsg.textContent = getReply(text);
    assistantMessages.appendChild(botMsg);

    assistantInput.value = "";

    assistantMessages.scrollTop = assistantMessages.scrollHeight;
}


if (assistantSend) {
    assistantSend.addEventListener("click", sendMessage);
}


if (assistantInput) {
    assistantInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

