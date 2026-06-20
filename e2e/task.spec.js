const { test, expect } = require('@playwright/test');

test('creates and deletes a task', async ({ page }) => {
    
    page.on('console', msg => {
    console.log('BROWSER:', msg.text());
    });

    page.on('pageerror', err => {
        console.log('PAGE ERROR:', err.message);
    });

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

    await page.waitForTimeout(3000);

    console.log(
        await page.locator('#taskMessage').textContent()
    );

    console.log(
        await page.locator('#taskList').innerHTML()
    );

    await expect(
        page.getByRole('heading', { name: taskTitle }).first()
    ).toBeVisible();
    await expect(page.getByText(taskDescription)).toBeVisible();
    await expect(page.getByText(taskPriority)).toBeVisible();
    await expect(page.getByText(taskDueDate)).toBeVisible();

    const taskCard = page.locator('.task-card')
        .filter({ hasText: taskTitle })
        .first();

    await taskCard.locator('.deleteTaskButton').click();

    await expect(
        page.locator('.task-card').filter({ hasText: taskTitle }).first()
    ).toHaveCount(0);
});