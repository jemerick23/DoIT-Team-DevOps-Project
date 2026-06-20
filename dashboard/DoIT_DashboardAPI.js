//This API will load tasks into the task box on the DoIT dashboard.
//The roles will also be prefilled with User names and with their associated roles.
//Finally, the project progress and activity will state the current progress of the task.

import { getTasks } from "../tasks/DoIT_taskAPI.js";

export async function fetchDashboardTasks() {
    try {
        const tasks = await getTasks();
        return tasks || [];
    } catch (error) {
        console.error("Error fetching dashboard tasks:", error.message);
        return [];
    }
}






