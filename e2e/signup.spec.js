const { test, expect } = require('@playwright/test');

test('successful signup redirects to login page', async ({ page }) => {

    const email = `test${Date.now()}@example.com`;

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Signup successful!');
        await dialog.accept();
    });

    await page.goto('http://localhost:3000/auth/DoIT_SignUp_Screen.html');

    await page.fill('#first_name', 'Angel');
    await page.fill('#last_name', 'Perez');
    await page.fill('#email', email);
    await page.fill('#password', 'password123');

    await page.click('#signupBtn');

    await expect(page).toHaveURL(/DoIT_Login_Screen\.html/);
});