const { test, expect } = require('@playwright/test');

test('calendar navigation works', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await page.click('a[href="#calendar"]');

await expect(page).toHaveURL(/calendar\/DoIT_calendar\.html/);

});

test('tasks navigation works', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await page.click('a[href="#tasks"]');

await expect(page).toHaveURL(/tasks\/DoIT_Task_Screen\.html/);


});

test('team messages navigation works', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await page.click('a[href="#team-messages"]');

await expect(page).toHaveURL(/teams\/DoIT_teamMessages\.html/);


});

test('team members navigation works', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await page.click('a[href="#view-team-members"]');

await expect(page).toHaveURL(/teams\/DoIT_teamMembers\.html/);


});

test('settings navigation works', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await page.click('a[href="#settings"]');

await expect(page).toHaveURL(/settings\/DoIT_Settings\.html/);


});

test('logout navigation works', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await page.click('a[href="#logout"]');

await expect(page).toHaveURL(/auth\/DoIT_Login_Screen\.html/);


});

test('AI assistant button is visible', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await expect(
    page.locator('#assistant-btn')
).toBeVisible();


});

test('AI assistant opens when clicked', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await page.click('#assistant-btn');

await expect(
    page.locator('#assistant-box')
).toBeVisible();


});

test('dashboard task section is displayed', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await expect(
    page.locator('#dashboardTaskList')
).toBeVisible();


});

test('roles section is displayed', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await expect(
    page.locator('#roleList')
).toBeVisible();


});

test('progress section is displayed', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await expect(
    page.locator('#progressList')
).toBeVisible();


});

test('welcome header is displayed', async ({ page }) => {


await page.goto(
    'http://localhost:3000/dashboard/DoIT_Dashboard.html',
    { waitUntil: 'domcontentloaded' }
);

await expect(
    page.locator('.welcome')
).toContainText('Dashboard');


});
