import {initializeDashboardWidgets}
from "./DoIT_DashboardWidgets.js";

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboardWidgets();

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

const tasks = [
 
    {
        name: "Finish weekly report",
        status: "In Progress",
        priority: "High"
    },
 
    {
        name: "Schedule team meeting",
        status: "Complete",
        priority: "Medium"
    },
 
    {
        name: "Review project notes",
        status: "Pending",
        priority: "Low"
    },
 
    {
        name: "Update personal calendar",
        status: "In Progress",
        priority: "Medium"
    },
 
    {
        name: "Prepare presentation slides",
        status: "Pending",
        priority: "High"
    }
 
];
 
 
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
 
    }
 
    else{
 
        assistantBox.style.display="none";
 
    }
 
 
});
 
 
 
// assistant brain
 
function getReply(message){

    let text = message.toLowerCase();


   
    let foundTasks = tasks.filter(task =>
        text.includes(task.name.toLowerCase()) ||
        task.name.toLowerCase().split(" ").some(word => text.includes(word))
    );


   
    if(text.includes("task")){

        let reply = "I checked your workspace and found your current tasks:\n\n";

        tasks.forEach((task, i)=>{
            reply += `• ${task.name} (${task.status}, ${task.priority} priority)\n`;
        });

        reply += "\nLet me know if you want details on any specific task.";

        return reply;
    }


    
    if(foundTasks.length > 0){

        let task = foundTasks[0];

        return `I found something related to your request:\n\n` +
               `Task: ${task.name}\n` +
               `Status: ${task.status}\n` +
               `Priority: ${task.priority}\n\n` +
               `You can ask me to show updates or related tasks if needed.`;
    }


  
    if(text.includes("project")){

        return "Based on your DoIT dashboard, your project is currently active. You can track progress in the Project Progress section. I can also break down tasks if you want.";
    }


    
    if(text.includes("hello") || text.includes("hi")){

        return "Hey 👋 I’m your DoIT assistant. I can help you track tasks, project progress, and team activity. What do you need?";
    }


    
    return "I’m not fully sure, but I can check your tasks or project data if you guide me a bit more.";
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

