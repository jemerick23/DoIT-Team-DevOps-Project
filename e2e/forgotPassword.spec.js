const { test, expect } = require('@playwright/test');

test('successful password change redirects to login page', async ({ page }) => {


    await page.goto('http://localhost:3000/auth/DoIT_ForgotPassword_Screen.html', {
        waitUntil: 'domcontentloaded'
    });

    await page.fill('#email', 'kbryce@example.com');
    await page.fill('#newPassword', 'password111#');
    await page.fill('#confirmPassword', 'password111#');

    await page.click('#changePasswordBtn');

    await expect(page).toHaveURL(/DoIT_Login_Screen\.html/);
});