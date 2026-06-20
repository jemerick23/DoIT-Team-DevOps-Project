import {initializeDashboardWidgets}
from "./DoIT_DashboardWidgets.js";

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboardWidgets();

    loadTasks();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        document.getElementById("userName").textContent =
            `Welcome: ${user.first_name} ${user.last_name}`;

        document.getElementById("userOccupation").textContent =
            user.role || "Not set";
    }
});

function toggleSidebar() { //<--This allows users to open and close using the toggle button
    console.log("Sidebar clicked");
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    sidebar.classList.toggle("open");

    if (sidebar.classList.contains("open")){ //<--This formats the sidebar when open
        sidebar.style.width = "240px";
        if (main) main.style.marginLeft = "240px";
    }else{
        sidebar.style.width = "90px"; //<-- This formats the sidebar when closed
        if (main) main.style.marginLeft = "90px";
    }
}

window.toggleSidebar = toggleSidebar; //<--This is a global reference to the toggleSidebar function.

//  DOIT ASSISTANT

let tasks = [];

async function loadTasks(){

    try {
        const res = await fetch("http://localhost:3000/api/tasks");
        tasks = await res.json();
    } catch (err) {
        console.log("Failed to load tasks", err);
    }
}

const assistantBtn = document.getElementById("assistant-btn");
const assistantBox = document.getElementById("assistant-box");

const assistantInput = document.getElementById("assistant-input");
const assistantSend = document.getElementById("assistant-send");

const assistantMessages = document.getElementById("assistant-messages");

if(assistantBox){
    assistantBox.style.display = "none";
}

assistantBtn.addEventListener("click",()=>{

    if(assistantBox.style.display === "none"){
        assistantBox.style.display="flex";
    } else {
        assistantBox.style.display="none";
    }
});


// assistant brain
function getReply(message){

    let text = message.toLowerCase();


    // ✅ FIXED: use "title" instead of "name"
    let foundTasks = tasks.filter(task =>
        text.includes(task.title.toLowerCase()) ||
        task.title.toLowerCase().split(" ").some(word => text.includes(word))
    );


    // show all tasks
    if(text.includes("task")){

        let reply = `I checked your DoIT system and found ${tasks.length} tasks:\n\n`;

        tasks.forEach((task)=>{
            reply += `• ${task.title} (${task.status}, ${task.priority} priority)\n`;
        });

        reply += "\nLet me know if you want details on any specific task.";

        return reply;
    }


    // specific task match
    if(foundTasks.length > 0){

        let task = foundTasks[0];

        return `I found a matching task in your system:\n\n` +
               `Task: ${task.title}\n` +
               `Status: ${task.status}\n` +
               `Priority: ${task.priority}\n\n` +
               `You can ask me to show all tasks or filter by status.`;
    }


    if(text.includes("project")){

        return "Based on your DoIT dashboard, your project is currently active. You can track progress in the Project Progress section.";
    }


    if(text.includes("hello") || text.includes("hi")){

        return "Hey 👋 I’m your DoIT assistant. I can help you track tasks, project progress, and team activity.";
    }


    return "I can check your tasks or project data if you guide me a bit more.";
}


function sendMessage(){

    let userText = assistantInput.value;

    if(userText==="") return;

    let userMessage=document.createElement("div");
    userMessage.className="user";
    userMessage.textContent=userText;

    assistantMessages.appendChild(userMessage);

    assistantInput.value="";

    let typing=document.createElement("div");
    typing.className="bot";
    typing.textContent="Thinking...";

    assistantMessages.appendChild(typing);

    setTimeout(()=>{

        typing.remove();

        let botMessage=document.createElement("div");
        botMessage.className="bot";
        botMessage.textContent=getReply(userText);

        assistantMessages.appendChild(botMessage);

    },700);
}

assistantSend.addEventListener("click",sendMessage);

assistantInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){
        sendMessage();
    }

});
