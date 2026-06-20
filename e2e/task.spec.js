const { test, expect } = require('@playwright/test');

test('creates and deletes a task', async ({ page }) => {

    const taskTitle = 'Automated Test Task';
    const taskDescription = 'Description for automated test task';
    const taskPriority = 'High';

    await page.goto('http://localhost:5500/tasks/DoIT_Task_Screen.html');

    await page.locator('#taskTitle').fill(taskTitle);
    await page.locator('#taskDescription').fill(taskDescription);
    await page.locator('#taskPriority').selectOption(taskPriority);
    await page.locator('#taskDueDate').fill('2025-12-31');

    await expect(
        page.getByRole('heading', { name: taskTitle }).first()
    ).toBeVisible();
    const taskCard = page.locator('.task-card')
        .filter({ hasText: taskTitle })
        .first();
    
    await expect(taskCard).toContainText(taskDescription);
    await expect(taskCard).toContainText(taskPriority);

    await taskCard.locator('.deleteTaskButton').click();

});