const { test, expect } = require('@playwright/test');

test('creates and deletes a task', async ({ page }) => {
    const taskTitle = 'Automated Test Task';
    const taskDescription = 'Description for automated test task';
    const taskName = 'Complete test case';
    const taskPriority = 'High';
    const taskDueDate = '2025-12-31';

    await page.goto('http://localhost:5500/tasks/DoIT_Task_Screen.html');

    await page.locator('[data-cy=task-title]').fill(taskTitle);
    await page.locator('[data-cy=task-description]').fill(taskDescription);
    await page.locator('[data-cy=task-name]').fill(taskName);
    await page.locator('[data-cy=task-priority]').selectOption({ label: taskPriority });
    await page.locator('[data-cy=task-due-date]').fill(taskDueDate);
    await page.locator('[data-cy=submit-task]').click();

    await expect(page.getByText(taskTitle)).toBeVisible();
    await expect(page.getByText(taskDescription)).toBeVisible();
    await expect(page.getByText(taskName)).toBeVisible();
    await expect(page.getByText(taskPriority)).toBeVisible();
    await expect(page.getByText(taskDueDate)).toBeVisible();

    const taskItem = page.locator('[data-cy=task-item]').filter({
        hasText: taskTitle
    });

    await taskItem.locator('[data-cy=delete-task]').click();

    await expect(page.getByText(taskTitle)).not.toBeVisible();
});