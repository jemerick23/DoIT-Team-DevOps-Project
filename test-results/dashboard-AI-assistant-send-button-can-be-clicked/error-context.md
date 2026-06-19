# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> AI assistant send button can be clicked
- Location: dashboard.spec.js:157:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/dashboard/DoIT_Dashboard.html
Call log:
  - navigating to "http://localhost:3000/dashboard/DoIT_Dashboard.html", waiting until "domcontentloaded"

```

# Test source

```ts
  60  | test('team members navigation works', async ({ page }) => {
  61  | 
  62  | 
  63  | await page.goto(
  64  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  65  |     { waitUntil: 'domcontentloaded' }
  66  | );
  67  | 
  68  | await page.click('a[href="#view-team-members"]');
  69  | 
  70  | await expect(page).toHaveURL(/teams\/DoIT_teamMembers\.html/);
  71  | 
  72  | 
  73  | });
  74  | 
  75  | test('settings navigation works', async ({ page }) => {
  76  | 
  77  | 
  78  | await page.goto(
  79  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  80  |     { waitUntil: 'domcontentloaded' }
  81  | );
  82  | 
  83  | await page.click('a[href="#settings"]');
  84  | 
  85  | await expect(page).toHaveURL(/settings\/DoIT_Settings\.html/);
  86  | 
  87  | 
  88  | });
  89  | 
  90  | test('logout navigation works', async ({ page }) => {
  91  | 
  92  | 
  93  | await page.goto(
  94  |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  95  |     { waitUntil: 'domcontentloaded' }
  96  | );
  97  | 
  98  | await page.click('a[href="#logout"]');
  99  | 
  100 | await expect(page).toHaveURL(/auth\/DoIT_Login_Screen\.html/);
  101 | 
  102 | 
  103 | });
  104 | 
  105 | test('AI assistant button is visible', async ({ page }) => {
  106 | 
  107 | 
  108 | await page.goto(
  109 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  110 |     { waitUntil: 'domcontentloaded' }
  111 | );
  112 | 
  113 | await expect(
  114 |     page.locator('#assistant-btn')
  115 | ).toBeVisible();
  116 | 
  117 | 
  118 | });
  119 | 
  120 | test('AI assistant opens when clicked', async ({ page }) => {
  121 | 
  122 | 
  123 | await page.goto(
  124 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  125 |     { waitUntil: 'domcontentloaded' }
  126 | );
  127 | 
  128 | await page.click('#assistant-btn');
  129 | 
  130 | await expect(
  131 |     page.locator('#assistant-box')
  132 | ).toBeVisible();
  133 | 
  134 | 
  135 | });
  136 | 
  137 | test('AI assistant accepts user input', async ({ page }) => {
  138 | 
  139 | 
  140 | await page.goto(
  141 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  142 |     { waitUntil: 'domcontentloaded' }
  143 | );
  144 | 
  145 | await page.fill(
  146 |     '#assistant-input',
  147 |     'Show my tasks'
  148 | );
  149 | 
  150 | await expect(
  151 |     page.locator('#assistant-input')
  152 | ).toHaveValue('Show my tasks');
  153 | 
  154 | 
  155 | });
  156 | 
  157 | test('AI assistant send button can be clicked', async ({ page }) => {
  158 | 
  159 | 
> 160 | await page.goto(
      |            ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/dashboard/DoIT_Dashboard.html
  161 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  162 |     { waitUntil: 'domcontentloaded' }
  163 | );
  164 | 
  165 | await page.fill(
  166 |     '#assistant-input',
  167 |     'What tasks are due today?'
  168 | );
  169 | 
  170 | await page.click('#assistant-send');
  171 | 
  172 | await expect(
  173 |     page.locator('#assistant-messages')
  174 | ).toBeVisible();
  175 | 
  176 | 
  177 | });
  178 | 
  179 | test('dashboard task section is displayed', async ({ page }) => {
  180 | 
  181 | 
  182 | await page.goto(
  183 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  184 |     { waitUntil: 'domcontentloaded' }
  185 | );
  186 | 
  187 | await expect(
  188 |     page.locator('#dashboardTaskList')
  189 | ).toBeVisible();
  190 | 
  191 | 
  192 | });
  193 | 
  194 | test('roles section is displayed', async ({ page }) => {
  195 | 
  196 | 
  197 | await page.goto(
  198 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  199 |     { waitUntil: 'domcontentloaded' }
  200 | );
  201 | 
  202 | await expect(
  203 |     page.locator('#roleList')
  204 | ).toBeVisible();
  205 | 
  206 | 
  207 | });
  208 | 
  209 | test('progress section is displayed', async ({ page }) => {
  210 | 
  211 | 
  212 | await page.goto(
  213 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  214 |     { waitUntil: 'domcontentloaded' }
  215 | );
  216 | 
  217 | await expect(
  218 |     page.locator('#progressList')
  219 | ).toBeVisible();
  220 | 
  221 | 
  222 | });
  223 | 
  224 | test('welcome header is displayed', async ({ page }) => {
  225 | 
  226 | 
  227 | await page.goto(
  228 |     'http://localhost:3000/dashboard/DoIT_Dashboard.html',
  229 |     { waitUntil: 'domcontentloaded' }
  230 | );
  231 | 
  232 | await expect(
  233 |     page.locator('.welcome')
  234 | ).toContainText('Dashboard');
  235 | 
  236 | 
  237 | });
  238 | 
```