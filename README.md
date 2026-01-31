# Singlish to Sinhala – Playwright Automation

##  Project Description

This project automates **functional** and **UI testing** for the **Singlish to Sinhala transliteration system** available at:

🔗 [https://www.swifttranslator.com/](https://www.swifttranslator.com/)

The automation ensures that Singlish text inputs are correctly converted into Sinhala and that the UI behaves as expected during real-time user interactions.

---

##  Technologies Used

* **Playwright**
* **JavaScript**
* **Node.js**
* **Chromium Browser**

---

##  Setup Instructions

### Install Node.js

Download and install Node.js from:
[https://nodejs.org/](https://nodejs.org/)

Verify installation:

```bash
node -v
npm -v
```

---

###  Clone the Repository

---

###  Install Playwright Browsers

```bash
npm init playwright@latest
```

---

##  Run Tests

###  Run All Tests

```bash
npx playwright test
```

---

###  Run Specific Test Files

**Positive Functional Tests**

```bash
npx playwright test pos_fun.spec.js
```

**Negative Functional Tests**

```bash
npx playwright test neg_fun.spec.js
```

**Positive Negative UI Tests**

```bash
npx playwright test pos_neg_ui.spec.js
```

---


###  Run in Headed Mode (Debugging)

```bash
npx playwright test --headed
```

---

##  Reports

###  Generate HTML Report

```bash
npx playwright test --reporter=html
```

###  Open Last HTML Report

```bash
npx playwright show-report
```

###  List Reporter (Console Output)

```bash
npx playwright test pos_fun.spec.js --reporter=list
npx playwright test neg_fun.spec.js --reporter=list
```

---

##  Test Coverage

*  Positive Functional Tests
*  Negative Functional Tests
*  UI Real-time Output Update Tests


---



##  Browser Support

* Chromium 

---

##  Author

**Hirusha Dilshan**

---

