/**
 * SpendWise — Week 5 JavaScript Foundation
 * Demonstrates variables, data types, user input prompts,
 * budget calculations, reusable functions, and console output.
 */

// 1. Verify Script Load
console.log("SpendWise JavaScript foundation loaded successfully!");

// 2. Store Application Data (Constants & Variables with Clear Data Types)
const CURRENCY_SYMBOL = "$"; // String
const DEFAULT_MONTHLY_BUDGET = 1150.0; // Number
const BUDGET_PERIOD = "November 2026"; // String
let isOverBudget = false; // Boolean

// Existing baseline expenses matching the SpendWise dashboard
const baselineExpenses = [
  { name: "Food (Groceries & Dining)", amount: 185.0, category: "Food" },
  { name: "Transport (Commute & Transit)", amount: 68.5, category: "Transport" },
  { name: "Apartment Rent", amount: 450.0, category: "Rent" },
  { name: "Entertainment & Media", amount: 46.0, category: "Entertainment" },
  { name: "Savings Allocation", amount: 75.0, category: "Savings" },
  { name: "Utilities (Power, Water & Data)", amount: 55.5, category: "Utilities" }
];

// 5. Reusable Functions for Formatting, Calculations & Budget Logic

/**
 * Formats a numeric value into a readable currency string.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return `${CURRENCY_SYMBOL}${Number(amount).toFixed(2)}`;
}

/**
 * Calculates total spending across an array of expense objects.
 * @param {Array<{name: string, amount: number, category: string}>} expensesList
 * @returns {number}
 */
function calculateTotalExpenses(expensesList) {
  let total = 0;
  for (let i = 0; i < expensesList.length; i++) {
    total += expensesList[i].amount;
  }
  return total;
}

/**
 * Calculates the remaining budget balance after subtracting total expenses.
 * @param {number} totalBudget
 * @param {number} totalSpent
 * @returns {number}
 */
function calculateRemainingBalance(totalBudget, totalSpent) {
  return totalBudget - totalSpent;
}

/**
 * Calculates the percentage of the budget already spent.
 * @param {number} totalBudget
 * @param {number} totalSpent
 * @returns {number}
 */
function calculateBudgetUsagePercentage(totalBudget, totalSpent) {
  if (totalBudget <= 0) {
    return 0;
  }
  return (totalSpent / totalBudget) * 100;
}

/**
 * Safely parses user prompt text into a valid non-negative number.
 * @param {string | null} rawInput
 * @param {number} fallbackValue
 * @returns {number}
 */
function parseNumericInput(rawInput, fallbackValue) {
  if (rawInput === null || rawInput.trim() === "") {
    return fallbackValue;
  }
  const parsed = Number(rawInput);
  if (Number.isNaN(parsed) || parsed < 0) {
    return fallbackValue;
  }
  return parsed;
}

// 3. Collect User Input via JavaScript Prompts
function collectUserBudgetData() {
  const budgetPrompt = prompt(
    `Welcome to SpendWise (${BUDGET_PERIOD})!\nEnter your total monthly budget in USD:`,
    String(DEFAULT_MONTHLY_BUDGET)
  );
  const monthlyBudget = parseNumericInput(budgetPrompt, DEFAULT_MONTHLY_BUDGET);

  const expenseNamePrompt = prompt(
    "Enter a new expense name to record:",
    "Weekly Groceries"
  );
  const newExpenseName =
    expenseNamePrompt && expenseNamePrompt.trim() !== ""
      ? expenseNamePrompt.trim()
      : "Weekly Groceries";

  const expenseAmountPrompt = prompt(
    `Enter the amount spent on "${newExpenseName}":`,
    "45"
  );
  const newExpenseAmount = parseNumericInput(expenseAmountPrompt, 45.0);

  const expenseCategoryPrompt = prompt(
    "Enter the category (Food, Transport, Rent, Entertainment, Savings, Utilities):",
    "Food"
  );
  const newExpenseCategory =
    expenseCategoryPrompt && expenseCategoryPrompt.trim() !== ""
      ? expenseCategoryPrompt.trim()
      : "Food";

  return {
    monthlyBudget,
    newExpense: {
      name: newExpenseName,
      amount: newExpenseAmount,
      category: newExpenseCategory
    }
  };
}

// 4 & 6. Perform Budget Calculations & Display Clearly Labeled Results in Console
function runSpendWiseCalculator() {
  const userData = collectUserBudgetData();

  // Combine existing baseline expenses with the user's newly entered expense
  const updatedExpenses = [...baselineExpenses, userData.newExpense];

  const previousTotalSpent = calculateTotalExpenses(baselineExpenses);
  const updatedTotalSpent = calculateTotalExpenses(updatedExpenses);
  const remainingBalance = calculateRemainingBalance(
    userData.monthlyBudget,
    updatedTotalSpent
  );
  const usagePercentage = calculateBudgetUsagePercentage(
    userData.monthlyBudget,
    updatedTotalSpent
  );

  isOverBudget = remainingBalance < 0;

  console.group(`=== SpendWise Budget Summary (${BUDGET_PERIOD}) ===`);
  console.log("Monthly Budget Set:      ", formatCurrency(userData.monthlyBudget));
  console.log("Previous Total Spent:    ", formatCurrency(previousTotalSpent));
  console.log(
    "New Expense Added:       ",
    `${userData.newExpense.name} (${userData.newExpense.category}) — ${formatCurrency(userData.newExpense.amount)}`
  );
  console.log("Updated Total Spending:  ", formatCurrency(updatedTotalSpent));
  console.log("Remaining Balance:       ", formatCurrency(remainingBalance));
  console.log("Budget Used (%):         ", `${usagePercentage.toFixed(1)}%`);
  console.log(
    "Budget Status:           ",
    isOverBudget
      ? "WARNING: You have exceeded your monthly budget!"
      : "ON TRACK: You are within your monthly budget."
  );
  console.table(updatedExpenses);
  console.groupEnd();
}

// Run automatically when the page loads
runSpendWiseCalculator();

// Also attach to the header button so the user can re-run prompts anytime
const promptButton = document.getElementById("run-budget-prompt-btn");
if (promptButton) {
  promptButton.addEventListener("click", runSpendWiseCalculator);
}
