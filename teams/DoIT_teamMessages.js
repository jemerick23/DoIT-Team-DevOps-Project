import {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
} from "./DoIT_teamMessagesAPI.js";

// DOM Elements
const messageFeed = document.getElementById("messageFeed");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendMessageBtn");

// Load messages when page opens
window.addEventListener("DOMContentLoaded", loadMessages);

// Send button click
sendButton.addEventListener("click", sendMessage);


// Load Messages
async function loadMessages() {

    try {

        const messages = await getMessages();

        messageFeed.innerHTML = "";

        messages.forEach(msg => {

            const card = document.createElement("div");

            card.classList.add("message-card");

            card.innerHTML = `
                <h4>${msg.first_name} ${msg.last_name}</h4>
                <p>${msg.message}</p>
                <small>
                    ${new Date(msg.created_at).toLocaleString()}
                </small>
            `;

            messageFeed.appendChild(card);
        });

    } catch (error) {

        console.error(
            "Error loading messages:",
            error
        );
    }
}

// Create Message

async function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) {
        alert("Please enter a message.");
        return;
    }

    try {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) {
            alert("Please log in first.");
            window.location.href =
                "../auth/DoIT_Login_Screen.html";
            return;
        }

        await createMessage({
            user_id: user.user_id,
            message: text
        });

        messageInput.value = "";

        await loadMessages();

    } catch (error) {

        console.error(
            "Error sending message:",
            error
        );

    }
}