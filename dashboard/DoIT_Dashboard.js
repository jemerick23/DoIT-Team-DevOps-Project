import {initializeDashboardWidgets}
from "./DoIT_DashboardWidgets.js";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDashboardWidgets();
    }
);

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
 
 
    if(text.includes("task")){
 
 
        let reply = "Here are your current tasks:\n\n";
 
 
        tasks.forEach((task,index)=>{
 
 
            reply += 
            `${index+1}. ${task.name} - ${task.status} (${task.priority} priority)\n`;
 
        });
 
 
        return reply;
 
 
    }
 
 
    if(text.includes("hello") || text.includes("hi")){
 
 
        return "Hey 👋 I can help you with tasks, schedules, and productivity.";
 
    }
 
 
    if(text.includes("deadline")){
 
 
        return "You can review upcoming deadlines by checking your task list.";
 
    }
 
 
    return "I can help you find tasks, deadlines, and project information.";
 
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

