const { test, expect } = require('@playwright/test');

test('successful login redirects to dashboard page', async ({ page }) => {

    const email = `test${Date.now()}@example.com`;

    await page.goto('http://localhost:3000/auth/DoIT_Login_Screen.html', {
        waitUntil: 'domcontentloaded'
    });

    await page.fill('#email', 'jamie@example.com');
    await page.fill('#password', 'password000#');

    await page.click('#loginBtn');

    await expect(page).toHaveURL(/dashboard\/DoIT_Dashboard\.html/);
});