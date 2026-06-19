# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> tasks navigation works
- Location: dashboard.spec.js:17:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/dashboard/DoIT_Dashboard.html
Call log:
  - navigating to "http://localhost:3000/dashboard/DoIT_Dashboard.html", waiting until "domcontentloaded"

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test('calendar navigation works', async ({ page }) => {
  4   | 
  5   | 
  6   | await page.goto(
  7   |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  8   |     { waitUntil: 'domcontentloaded' }
  9   | );
  10  | 
  11  | await page.click('a[href="#calendar"]');
  12  | 
  13  | await expect(page).toHaveURL(/calendar\/DoIT_calendar\.html/);
  14  | 
  15  | });
  16  | 
  17  | test('tasks navigation works', async ({ page }) => {
  18  | 
  19  | 
> 20  | await page.goto(
      |            ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/dashboard/DoIT_Dashboard.html
  21  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  22  |     { waitUntil: 'domcontentloaded' }
  23  | );
  24  | 
  25  | await page.click('a[href="#tasks"]');
  26  | 
  27  | await expect(page).toHaveURL(/tasks\/DoIT_Task_Screen\.html/);
  28  | 
  29  | 
  30  | });
  31  | 
  32  | test('team messages navigation works', async ({ page }) => {
  33  | 
  34  | 
  35  | await page.goto(
  36  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  37  |     { waitUntil: 'domcontentloaded' }
  38  | );
  39  | 
  40  | await page.click('a[href="#team-messages"]');
  41  | 
  42  | await expect(page).toHaveURL(/teams\/DoIT_teamMessages\.html/);
  43  | 
  44  | 
  45  | });
  46  | 
  47  | test('team members navigation works', async ({ page }) => {
  48  | 
  49  | 
  50  | await page.goto(
  51  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  52  |     { waitUntil: 'domcontentloaded' }
  53  | );
  54  | 
  55  | await page.click('a[href="#view-team-members"]');
  56  | 
  57  | await expect(page).toHaveURL(/teams\/DoIT_teamMembers\.html/);
  58  | 
  59  | 
  60  | });
  61  | 
  62  | test('settings navigation works', async ({ page }) => {
  63  | 
  64  | 
  65  | await page.goto(
  66  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  67  |     { waitUntil: 'domcontentloaded' }
  68  | );
  69  | 
  70  | await page.click('a[href="#settings"]');
  71  | 
  72  | await expect(page).toHaveURL(/settings\/DoIT_Settings\.html/);
  73  | 
  74  | 
  75  | });
  76  | 
  77  | test('logout navigation works', async ({ page }) => {
  78  | 
  79  | 
  80  | await page.goto(
  81  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  82  |     { waitUntil: 'domcontentloaded' }
  83  | );
  84  | 
  85  | await page.click('a[href="#logout"]');
  86  | 
  87  | await expect(page).toHaveURL(/auth\/DoIT_Login_Screen\.html/);
  88  | 
  89  | 
  90  | });
  91  | 
  92  | test('AI assistant button is visible', async ({ page }) => {
  93  | 
  94  | 
  95  | await page.goto(
  96  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  97  |     { waitUntil: 'domcontentloaded' }
  98  | );
  99  | 
  100 | await expect(
  101 |     page.locator('#assistant-btn')
  102 | ).toBeVisible();
  103 | 
  104 | 
  105 | });
  106 | 
  107 | test('AI assistant opens when clicked', async ({ page }) => {
  108 | 
  109 | 
  110 | await page.goto(
  111 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  112 |     { waitUntil: 'domcontentloaded' }
  113 | );
  114 | 
  115 | await page.click('#assistant-btn');
  116 | 
  117 | await expect(
  118 |     page.locator('#assistant-box')
  119 | ).toBeVisible();
  120 | 
```