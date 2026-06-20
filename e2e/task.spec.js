const { test, expect } = require('@playwright/test');

test('creates and deletes a task', async ({ page }) => {
    const taskTitle = 'Automated Test Task';
    const taskDescription = 'Description for automated test task';
    const taskPriority = 'High';
    const taskDueDate = '2025-12-31';

    await page.goto('http://localhost:5500/tasks/DoIT_Task_Screen.html');

    await page.locator('#taskTitle').fill(taskTitle);
    await page.locator('#taskDescription').fill(taskDescription);
    await page.locator('#taskPriority').selectOption({ label: taskPriority });
    await page.locator('#taskDueDate').fill(taskDueDate);
    await page.locator('#addTaskButton').click();

    await expect(page.getByText(taskTitle)).toBeVisible();
    await expect(page.getByText(taskDescription)).toBeVisible();
    await expect(page.getByText(taskPriority)).toBeVisible();
    await expect(page.getByText(taskDueDate)).toBeVisible();

    const taskCard = page.locator('.task-card').filter({
        hasText: taskTitle
    });

    await taskCard.locator('.deleteTaskButton').click();

    await expect(page.getByText(taskTitle)).not.toBeVisible();
});