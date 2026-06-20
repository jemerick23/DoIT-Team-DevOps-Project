const { test, expect } = require('@playwright/test');

test('creates and deletes a task', async ({ page }) => {
    const taskTitle = 'Automated Test Task';
    const taskDescription = 'Description for automated test task';
    const taskName = 'Complete test case';
    const taskPriority = 'High';
    const taskDueDate = '2025-12-31';

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