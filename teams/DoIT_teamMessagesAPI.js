const API_URL = "http://localhost:3000/api/teamMessages";

export async function getMessages() {
    const response = await fetch(API_URL);
    return await response.json();
}

export async function createMessage(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

export async function updateMessage(messageId, messageData) {
    const response = await fetch(`${API_URL}/${messageId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    });

    return await response.json();
}

export async function deleteMessage(messageId) {
    const response = await fetch(`${API_URL}/${messageId}`, {
        method: "DELETE"
    });

    return await response.json();
}

console.log("API URL:", API_URL);