# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> logout navigation works
- Location: dashboard.spec.js:77:1

# Error details

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('a[href="#logout"]')

```

```
Error: browserContext.close: Target page, context or browser has been closed
```