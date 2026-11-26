# Week 5 Assignment: Build the JavaScript Foundation for SpendWise

## Overview
**SpendWise** is a personal budget and expense tracker dashboard built for **Web Development Fundamentals** at [PLP Academy](https://academy.powerlearnprojectafrica.org/dashboard). In Week 5, SpendWise transitions from a static HTML5/CSS3 layout shell into a data-driven web application powered by JavaScript (`script.js`) that collects budgeting inputs, calculates spending totals and remaining balances, and logs structured financial reports to the browser console.

## Project Structure
- `index.html` — Semantic dashboard shell featuring the sidebar navigation, top header bar, six category summary cards, expense form, expense table, budgeting video, and `<script src="script.js" defer></script>`.
- `style.css` — Responsive CSS Grid and Flexbox layout with `:root` light/dark theme variables (`@media (prefers-color-scheme: dark)`), card micro-interactions, and mobile breakpoints below `768px`.
- `script.js` — Core JavaScript logic implementing application state variables, `prompt()` user input collection, reusable budget calculation functions, and formatted console reporting.
- `README.md` — Documentation explaining the application architecture and JavaScript concepts used.

## JavaScript Concepts Implemented
- **Script Linking & Execution:** Linked `script.js` using the `defer` attribute so the script loads reliably alongside the HTML document and confirms initialization in the console.
- **Variables & Data Types (`const`, `let`):**
  - **Strings:** `CURRENCY_SYMBOL`, `BUDGET_PERIOD`, expense names, and category labels.
  - **Numbers:** `DEFAULT_MONTHLY_BUDGET`, individual expense amounts, calculated totals, remaining balance, and percentage utilization.
  - **Booleans:** `isOverBudget` to evaluate whether total spending exceeds the user's monthly budget.
  - **Arrays & Objects:** `baselineExpenses` stores structured expense records (`{ name, amount, category }`) for iteration and aggregation.
- **User Input Collection:** Uses `prompt()` dialogs inside `collectUserBudgetData()` to ask the user for their monthly budget, new expense name, expense amount, and category, while validating numeric values through `parseNumericInput()`.
- **Budget Calculations:** Computes baseline spending, adds the newly entered expense, subtracts total spending from the monthly budget (`totalBudget - totalSpent`) to find the remaining balance, and determines the percentage of the budget consumed.
- **Reusable Functions:** Separates responsibilities into focused, single-purpose functions:
  - `formatCurrency(amount)` — Formats numbers consistently with currency symbols and two decimal places.
  - `calculateTotalExpenses(expensesList)` — Loops through expense records to compute total spending.
  - `calculateRemainingBalance(totalBudget, totalSpent)` — Determines remaining funds.
  - `calculateBudgetUsagePercentage(totalBudget, totalSpent)` — Computes percentage of budget spent.
  - `parseNumericInput(rawInput, fallbackValue)` — Sanitizes and converts string prompt input into safe numbers.
  - `runSpendWiseCalculator()` — Coordinates input collection, calculations, and formatted console output (`console.group`, `console.log`, `console.table`).

## How to Run & Verify
1. Open `index.html` in Google Chrome (or another modern browser).
2. Answer the JavaScript `prompt()` dialogs for your monthly budget and new expense details (or click **Run Budget Prompt** in the top header to re-run at any time).
3. Open **Developer Tools (`F12` or `Ctrl + Shift + I`) → Console** to view the labeled SpendWise budget summary and expense table.
