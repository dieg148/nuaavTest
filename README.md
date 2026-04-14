# 🧪 NUAAV Test Automation Project

## ✅ Prerequisites

Before running this project, make sure you have configure:

* **Node.js** (recommended: v18 or higher)
  Check version:

  ```bash
  node -v
  ```

* Install dependencies:

  ```bash
  npm install
  ```

* Install Playwright:

  ```bash
  npx playwright install
  ```

---

## ▶️ How to Run All Tests

Run all tests using:

```bash
npx playwright test
```

### ✅ Expected Output

* Tests executed across configured browsers
* Summary showing:

  * Passed tests ✅
  * Failed tests ❌ (if something failed)
* Example:

```
✓ 23 passed (50.7s)
```

---

## 🎯 Run a Specific Test

### ▶️ Run a specific file

```bash
npx playwright test tests/auth/errorLogin.spec.ts
```
```bash
npx playwright test tests/folder/Name.spec.ts
```


---

### ▶️ Run a test by name

```bash
npx playwright test -g "sort by price"
```

---

## 📊 View HTML Report

After running tests, open the HTML report:

```bash
npx playwright show-report
```

👉 This will open a browser with:

* Test results
* Screenshots (on failure)
* Traces (on failure)

---

## 🧠 Design Decisions

This project follows a **Page Object Model (POM)** structure to improve maintainability and readability. Each page encapsulates its selectors and actions, allowing tests to remain clean and focused on behavior rather than implementation details.

Test isolation is handled by leveraging Playwright’s built-in fixtures and, where applicable, `storageState` to reuse authentication without repeating login steps. However, for negative login scenarios, authentication is intentionally not reused to ensure accurate validation, same for the valid login, we wanted to valdiate the steps.

Some helper methods could be further generalized, but the current structure ensures tests are easy to understand and debug while maintaining good scalability for future expansion.
Timeout was decreased to 10 seconds, since the app is a demo and it's very fast.

---

## 🔐 Authentication Strategy (auth.setup + storageState)

This project leverages Playwright’s **`storageState`** feature to avoid repeated logins and significantly improve test execution speed.

---

### 🔹 How It Works

1. **Login is executed once**
   A dedicated setup file (`auth.setup.ts`) performs the authentication step before any tests run.

2. **Session state is persisted**
   After a successful login, the browser context is saved to a file:

   ```ts
   await page.context().storageState({
     path: 'playwright/.auth/user.json',
   });
   ```

3. **Tests reuse the authenticated session**
   All test projects load this saved state:

   ```ts
   use: {
     storageState: 'playwright/.auth/user.json',
   }
   ```

4. **Setup is configured as a dependency**
   Ensures authentication runs before tests:

   ```ts
   {
     name: 'setup',
     testDir: './setup',
     testMatch: /.*\.setup\.ts/,
   },
   {
     name: 'chromium',
     dependencies: ['setup'],
   }
   ```

---

### ⚠️ Test Isolation Note

Tests that validate **invalid login scenarios** intentionally bypass the shared session to ensure correctness:

```ts
test.use({ storageState: undefined });
```

---

### 🧠 Design Insight

This approach balances **performance and isolation**:

* Positive flows reuse authentication for speed
* Negative scenarios run independently for accuracy

---


---

## 🚀 Notes

* Tests are designed to run independently
* Avoid shared state unless explicitly handled (e.g., auth setup)
* Use `await` properly to ensure stability in UI interactions

---
