const API_URL = "http://localhost:3000/api/tasks";
//Get tasks
export async function getTasks() {
    const response = await fetch(API_URL);
    return await response.json();
}
//Create task
export async function createTask(taskData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });

    return await response.json();
}
//Update task
export async function updateTask(taskId, taskData) {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
    });

    return await response.json();
}
//Delete task
export async function deleteTask(taskId) {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE"
    });

    return await response.json();
}

console.log("API URL:", API_URL);