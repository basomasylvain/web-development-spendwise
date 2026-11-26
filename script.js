/**
 * SpendWise — Interactive Budget & Expense Tracker
 * Connects conditionals, arrays, loops, DOM manipulation, and event listeners
 * to dynamically manage budgets and expenses directly on the webpage.
 */

console.info("SpendWise production bundle initialized — live at https://spendwise-site.netlify.app/");

// 1. Application Configuration & Initial Dataset (Arrays & Objects)
const CURRENCY_SYMBOL = "$";

const CATEGORY_CONFIG = [
  { name: "Food", tag: "Groceries & Dining", limit: 250.0 },
  { name: "Transport", tag: "Commute & Transit", limit: 100.0 },
  { name: "Rent", tag: "Housing", limit: 450.0 },
  { name: "Entertainment", tag: "Leisure & Media", limit: 80.0 },
  { name: "Savings", tag: "Emergency & Goals", limit: 150.0 },
  { name: "Utilities", tag: "Power, Water & Data", limit: 120.0 }
];

const INITIAL_EXPENSES = [
  { id: 1, name: "Weekly Groceries & Produce", amount: 185.0, category: "Food", date: "2026-11-02" },
  { id: 2, name: "Monthly Commute Pass", amount: 68.5, category: "Transport", date: "2026-11-04" },
  { id: 3, name: "Apartment Rent", amount: 450.0, category: "Rent", date: "2026-11-05" },
  { id: 4, name: "Cinema & Streaming Bundle", amount: 46.0, category: "Entertainment", date: "2026-11-10" },
  { id: 5, name: "Emergency Fund Transfer", amount: 75.0, category: "Savings", date: "2026-11-12" },
  { id: 6, name: "Fiber Internet & Power", amount: 55.5, category: "Utilities", date: "2026-11-15" }
];

// Mutable Application State
let monthlyBudget = 1150.0;
let expenses = INITIAL_EXPENSES.map((item) => ({ ...item }));
let activeCategoryFilter = "All";
let nextExpenseId = 7;

// 2. Cached DOM References
const monthlyBudgetInput = document.getElementById("monthly-budget-input");
const updateBudgetBtn = document.getElementById("update-budget-btn");
const headerTotalSpent = document.getElementById("header-total-spent");
const headerBudgetBadge = document.getElementById("header-budget-badge");
const sidebarRatioMeta = document.getElementById("sidebar-ratio-meta");
const sidebarCountMeta = document.getElementById("sidebar-count-meta");
const sidebarRemainingValue = document.getElementById("sidebar-remaining-value");
const sidebarUsageText = document.getElementById("sidebar-usage-text");
const kpiBudget = document.getElementById("kpi-budget");
const kpiSpent = document.getElementById("kpi-spent");
const kpiRemaining = document.getElementById("kpi-remaining");
const budgetStatusBanner = document.getElementById("budget-status-banner");
const categoryGrid = document.getElementById("category-grid");
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategorySelect = document.getElementById("expense-category");
const expenseDateInput = document.getElementById("expense-date");
const resetDemoBtn = document.getElementById("reset-demo-btn");
const formFeedback = document.getElementById("form-feedback");
const categoryFilterSelect = document.getElementById("category-filter");
const expensesTableBody = document.getElementById("expenses-table-body");
const emptyTableMessage = document.getElementById("empty-table-message");

// 3. Helper Formatting & Loop-Based Calculation Functions

function formatCurrency(amount) {
  const numericValue = Number(amount);
  const absFormatted = Math.abs(numericValue).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return numericValue < 0 ? `-${CURRENCY_SYMBOL}${absFormatted}` : `${CURRENCY_SYMBOL}${absFormatted}`;
}

/**
 * Uses a loop to calculate total spending across all stored expense records.
 */
function calculateTotalExpenses(records) {
  let total = 0;
  for (let i = 0; i < records.length; i++) {
    total += records[i].amount;
  }
  return total;
}

/**
 * Uses a loop to compute total spending for a specific category.
 */
function calculateCategorySpent(categoryName) {
  let categorySum = 0;
  for (const expense of expenses) {
    if (expense.category === categoryName) {
      categorySum += expense.amount;
    }
  }
  return categorySum;
}

// 4. Conditional Decision-Making for Budget Feedback
function evaluateBudgetHealth(budget, spent) {
  const remaining = budget - spent;
  const usagePercent = budget > 0 ? (spent / budget) * 100 : 100;

  if (remaining < 0) {
    return {
      remaining,
      usagePercent,
      cssClass: "status-danger",
      message: `Over Budget Alert: You exceeded your ${formatCurrency(budget)} budget by ${formatCurrency(Math.abs(remaining))} (${usagePercent.toFixed(1)}% used).`
    };
  } else if (usagePercent >= 80) {
    return {
      remaining,
      usagePercent,
      cssClass: "status-warning",
      message: `Approaching Limit: You have used ${usagePercent.toFixed(1)}% of your budget with only ${formatCurrency(remaining)} left.`
    };
  } else if (usagePercent >= 50) {
    return {
      remaining,
      usagePercent,
      cssClass: "status-moderate",
      message: `Moderate Pace: You have used ${usagePercent.toFixed(1)}% of your monthly budget (${formatCurrency(remaining)} remaining).`
    };
  } else {
    return {
      remaining,
      usagePercent,
      cssClass: "status-good",
      message: `Healthy Budget Status: Only ${usagePercent.toFixed(1)}% spent so far — ${formatCurrency(remaining)} available.`
    };
  }
}

// 5. DOM Rendering Functions

function renderSummaryMetrics() {
  const totalSpent = calculateTotalExpenses(expenses);
  const evaluation = evaluateBudgetHealth(monthlyBudget, totalSpent);

  headerTotalSpent.textContent = `Total Spent: ${formatCurrency(totalSpent)}`;
  headerBudgetBadge.textContent = `Budget: ${formatCurrency(monthlyBudget)}`;

  kpiBudget.textContent = formatCurrency(monthlyBudget);
  kpiSpent.textContent = formatCurrency(totalSpent);
  kpiRemaining.textContent = formatCurrency(evaluation.remaining);

  sidebarRemainingValue.textContent = formatCurrency(evaluation.remaining);
  sidebarUsageText.textContent = `${evaluation.usagePercent.toFixed(1)}% of budget used`;
  sidebarRatioMeta.textContent = `${formatCurrency(totalSpent)} / ${formatCurrency(monthlyBudget)}`;
  sidebarCountMeta.textContent = `${expenses.length} ${expenses.length === 1 ? "Entry" : "Entries"}`;

  if (evaluation.remaining < 0) {
    sidebarRemainingValue.classList.add("is-negative");
  } else {
    sidebarRemainingValue.classList.remove("is-negative");
  }

  budgetStatusBanner.className = `status-banner ${evaluation.cssClass}`;
  budgetStatusBanner.textContent = evaluation.message;
}

/**
 * Loops through CATEGORY_CONFIG and dynamically builds each category card in the DOM.
 */
function renderCategoryCards() {
  categoryGrid.innerHTML = "";

  for (let i = 0; i < CATEGORY_CONFIG.length; i++) {
    const category = CATEGORY_CONFIG[i];
    const spent = calculateCategorySpent(category.name);
    const difference = category.limit - spent;
    const percentUsed = category.limit > 0 ? (spent / category.limit) * 100 : 0;

    let statusText = `${percentUsed.toFixed(1)}% used • ${formatCurrency(difference)} left`;
    let statusClass = "card-status";
    let cardExtraClass = "category-card";

    if (difference < 0) {
      statusText = `Over limit by ${formatCurrency(Math.abs(difference))} (${percentUsed.toFixed(0)}%)`;
      statusClass = "card-status status-alert";
      cardExtraClass = "category-card is-over-limit";
    } else if (percentUsed >= 85) {
      statusText = `Near limit (${percentUsed.toFixed(0)}%) • ${formatCurrency(difference)} left`;
      statusClass = "card-status status-caution";
    }

    const card = document.createElement("article");
    card.className = cardExtraClass;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-top">
        <h3 class="category-title">${category.name}</h3>
        <span class="category-tag">${category.tag}</span>
      </div>
      <div class="card-amounts">
        <strong class="spent-amount">${formatCurrency(spent)}</strong>
        <span class="budget-limit">of ${formatCurrency(category.limit)}</span>
      </div>
      <p class="${statusClass}">${statusText}</p>
    `;

    categoryGrid.appendChild(card);
  }
}

/**
 * Loops through stored expenses, applies active category filter, and updates table rows.
 */
function renderExpenseTable() {
  expensesTableBody.innerHTML = "";
  let renderedCount = 0;

  for (let i = 0; i < expenses.length; i++) {
    const item = expenses[i];

    if (activeCategoryFilter !== "All" && item.category !== activeCategoryFilter) {
      continue;
    }

    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    const amountCell = document.createElement("td");
    amountCell.textContent = formatCurrency(item.amount);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = item.category;

    const dateCell = document.createElement("td");
    dateCell.textContent = item.date;

    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.expenseId = String(item.id);
    actionCell.appendChild(deleteBtn);

    row.appendChild(nameCell);
    row.appendChild(amountCell);
    row.appendChild(categoryCell);
    row.appendChild(dateCell);
    row.appendChild(actionCell);

    expensesTableBody.appendChild(row);
    renderedCount++;
  }

  emptyTableMessage.hidden = renderedCount > 0;
}

function updateDashboard() {
  renderSummaryMetrics();
  renderCategoryCards();
  renderExpenseTable();
}

function showFormFeedback(message, isError) {
  formFeedback.textContent = message;
  formFeedback.className = `form-feedback ${isError ? "is-error" : "is-success"}`;
}

// 6. Event Listeners Connecting User Actions to Data & DOM Updates

function handleBudgetUpdate() {
  const newBudget = Number(monthlyBudgetInput.value);

  if (Number.isNaN(newBudget) || newBudget <= 0) {
    showFormFeedback("Please enter a valid monthly budget greater than $0.00.", true);
    monthlyBudgetInput.focus();
    return;
  }

  monthlyBudget = newBudget;
  showFormFeedback(`Monthly budget updated to ${formatCurrency(monthlyBudget)}.`, false);
  updateDashboard();
}

function handleAddExpenseSubmit(event) {
  event.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = Number(expenseAmountInput.value);
  const category = expenseCategorySelect.value;
  const date = expenseDateInput.value;

  if (name === "") {
    showFormFeedback("Please enter an expense name.", true);
    expenseNameInput.focus();
    return;
  }

  if (Number.isNaN(amount) || amount <= 0) {
    showFormFeedback("Please enter a valid expense amount greater than 0.", true);
    expenseAmountInput.focus();
    return;
  }

  if (category === "") {
    showFormFeedback("Please select an expense category.", true);
    expenseCategorySelect.focus();
    return;
  }

  if (date === "") {
    showFormFeedback("Please choose a date for this expense.", true);
    expenseDateInput.focus();
    return;
  }

  const newRecord = {
    id: nextExpenseId++,
    name,
    amount,
    category,
    date
  };

  expenses.unshift(newRecord);
  expenseForm.reset();
  expenseDateInput.value = new Date().toISOString().split("T")[0];

  showFormFeedback(
    `Added "${newRecord.name}" (${formatCurrency(newRecord.amount)}) under ${newRecord.category}.`,
    false
  );
  updateDashboard();
}

function handleTableDeleteClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.dataset.expenseId) {
    return;
  }

  const idToRemove = Number(target.dataset.expenseId);
  const updatedList = [];

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== idToRemove) {
      updatedList.push(expenses[i]);
    }
  }

  expenses = updatedList;
  showFormFeedback("Expense entry removed and totals recalculated.", false);
  updateDashboard();
}

function handleResetDemo() {
  monthlyBudget = 1150.0;
  monthlyBudgetInput.value = "1150";
  expenses = INITIAL_EXPENSES.map((item) => ({ ...item }));
  activeCategoryFilter = "All";
  categoryFilterSelect.value = "All";
  expenseForm.reset();
  expenseDateInput.value = new Date().toISOString().split("T")[0];
  showFormFeedback("Sample dataset and budget restored.", false);
  updateDashboard();
}

// Attach Event Listeners
updateBudgetBtn.addEventListener("click", handleBudgetUpdate);
monthlyBudgetInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleBudgetUpdate();
  }
});

expenseForm.addEventListener("submit", handleAddExpenseSubmit);
expensesTableBody.addEventListener("click", handleTableDeleteClick);
categoryFilterSelect.addEventListener("change", (event) => {
  activeCategoryFilter = event.target.value;
  renderExpenseTable();
});
resetDemoBtn.addEventListener("click", handleResetDemo);

// Initialize default date input & render initial dashboard state
expenseDateInput.value = new Date().toISOString().split("T")[0];
updateDashboard();
