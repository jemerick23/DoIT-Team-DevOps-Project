# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> roles section is displayed
- Location: dashboard.spec.js:181:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/dashboard/DoIT_Dashboard.html
Call log:
  - navigating to "http://localhost:3000/dashboard/DoIT_Dashboard.html", waiting until "domcontentloaded"

```

# Test source

```ts
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
  121 | 
  122 | });
  123 | 
  124 | test('AI assistant accepts user input', async ({ page }) => {
  125 | 
  126 | 
  127 | await page.goto(
  128 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  129 |     { waitUntil: 'domcontentloaded' }
  130 | );
  131 | 
  132 | await page.fill(
  133 |     '#assistant-input',
  134 |     'Show my tasks'
  135 | );
  136 | 
  137 | await expect(
  138 |     page.locator('#assistant-input')
  139 | ).toHaveValue('Show my tasks');
  140 | 
  141 | 
  142 | });
  143 | 
  144 | test('AI assistant send button can be clicked', async ({ page }) => {
  145 | 
  146 | 
  147 | await page.goto(
  148 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  149 |     { waitUntil: 'domcontentloaded' }
  150 | );
  151 | 
  152 | await page.fill(
  153 |     '#assistant-input',
  154 |     'What tasks are due today?'
  155 | );
  156 | 
  157 | await page.click('#assistant-send');
  158 | 
  159 | await expect(
  160 |     page.locator('#assistant-messages')
  161 | ).toBeVisible();
  162 | 
  163 | 
  164 | });
  165 | 
  166 | test('dashboard task section is displayed', async ({ page }) => {
  167 | 
  168 | 
  169 | await page.goto(
  170 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  171 |     { waitUntil: 'domcontentloaded' }
  172 | );
  173 | 
  174 | await expect(
  175 |     page.locator('#dashboardTaskList')
  176 | ).toBeVisible();
  177 | 
  178 | 
  179 | });
  180 | 
  181 | test('roles section is displayed', async ({ page }) => {
  182 | 
  183 | 
> 184 | await page.goto(
      |            ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/dashboard/DoIT_Dashboard.html
  185 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  186 |     { waitUntil: 'domcontentloaded' }
  187 | );
  188 | 
  189 | await expect(
  190 |     page.locator('#roleList')
  191 | ).toBeVisible();
  192 | 
  193 | 
  194 | });
  195 | 
  196 | test('progress section is displayed', async ({ page }) => {
  197 | 
  198 | 
  199 | await page.goto(
  200 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  201 |     { waitUntil: 'domcontentloaded' }
  202 | );
  203 | 
  204 | await expect(
  205 |     page.locator('#progressList')
  206 | ).toBeVisible();
  207 | 
  208 | 
  209 | });
  210 | 
  211 | test('welcome header is displayed', async ({ page }) => {
  212 | 
  213 | 
  214 | await page.goto(
  215 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  216 |     { waitUntil: 'domcontentloaded' }
  217 | );
  218 | 
  219 | await expect(
  220 |     page.locator('.welcome')
  221 | ).toContainText('Dashboard');
  222 | 
  223 | 
  224 | });
  225 | 
```