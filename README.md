# Week 6 Assignment: Make SpendWise Interactive

## Overview
**SpendWise** is a personal budget and expense tracker dashboard built for **Web Development Fundamentals** at [PLP Academy](https://academy.powerlearnprojectafrica.org/dashboard). In Week 6, SpendWise evolves from console-based `prompt()` scripts into a fully interactive web application where users can update their monthly budget, add or remove expenses through live form controls, filter transactions by category, and see real-time budget health warnings directly in the browser UI.

## Improvements Made This Week
- **Eliminated Browser `prompt()` Dialogs:** Replaced blocking `prompt()` popups with an inline **Monthly Budget Target** editor and connected the **Add Expense** form directly to JavaScript state.
- **Live Budget Status & KPI Strip:** Added real-time KPI boxes (**Total Budget**, **Total Spent**, **Remaining**) and a color-coded **Budget Status Banner** that reacts immediately to every budget or expense change.
- **Dynamic Category Cards & Table Management:** Converted static HTML category cards and table rows into data-driven components rendered from JavaScript arrays, complete with a **Category Filter** dropdown, per-row **Delete** buttons, and a **Reset Sample Data** button.

## How Conditionals Are Used
- **Budget Health Evaluation (`evaluateBudgetHealth`):** Uses `if / else if / else` statements to compare total spending against the user's monthly budget:
  - `remaining < 0` displays a red **Over Budget Alert**.
  - `usagePercent >= 80` displays an amber **Approaching Limit** warning.
  - `usagePercent >= 50` displays a **Moderate Pace** notice.
  - Otherwise displays a green **Healthy Budget Status** message.
- **Category Limit Checks (`renderCategoryCards`):** Evaluates whether each category's spending exceeds its target limit (`difference < 0`) or approaches it (`percentUsed >= 85`) to highlight cards that need attention.
- **Form & Budget Validation (`handleAddExpenseSubmit`, `handleBudgetUpdate`):** Checks for empty names, missing categories/dates, or non-positive numbers (`<= 0` or `NaN`) and shows inline validation feedback without crashing or adding invalid records.

## How Arrays Are Used to Store Data
- `CATEGORY_CONFIG` stores an array of category objects (`{ name, tag, limit }`) defining the six budget categories (**Food**, **Transport**, **Rent**, **Entertainment**, **Savings**, **Utilities**).
- `expenses` stores an array of expense objects (`{ id, name, amount, category, date }`). Adding a new expense pushes/prepends a structured object to `expenses`, and deleting an entry builds a filtered array without that `id`.

## How the DOM Is Updated
- **Loops + `document.createElement()`:** `renderCategoryCards()` and `renderExpenseTable()` iterate over `CATEGORY_CONFIG` and `expenses` using `for` and `for...of` loops, building fresh `<article>` cards and `<tr>` table rows dynamically.
- **Targeted Metric Updates:** `renderSummaryMetrics()` updates `.textContent` and `.className` on the header badges, sidebar summary, KPI cards, and status banner whenever application state changes.

## How User Interactions Are Handled Through Events
- `submit` on `#expense-form` (`handleAddExpenseSubmit`) intercepts form submission with `event.preventDefault()`, validates fields, adds the new expense, resets the form, and re-renders the dashboard.
- `click` and `keydown` (`Enter`) on `#update-budget-btn` / `#monthly-budget-input` update the monthly budget target live.
- `change` on `#category-filter` filters visible rows in the expense table by category.
- `click` (event delegation) on `#expenses-table-body` detects clicks on any row's **Delete** button via `data-expense-id` and removes that specific record.
- `click` on `#reset-demo-btn` restores the initial sample dataset.

## Challenges Encountered & How They Were Resolved
- **Keeping Category Cards, KPIs, and Table Rows Synchronized:** Updating multiple sections individually risked stale totals when deleting an expense or changing the monthly budget. **Resolution:** Centralized state in `monthlyBudget` and `expenses` and routed every state mutation through a single `updateDashboard()` pipeline that recalculates totals via loops and re-renders all dependent UI sections together.
- **Handling Dynamically Created Delete Buttons:** Newly added expense rows do not exist when the page first loads. **Resolution:** Used event delegation on the parent `#expenses-table-body` element and attached a `data-expense-id` attribute to each button so dynamically rendered rows remain interactive without re-binding listeners.
