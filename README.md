# Week 2 Assignment: Budget Tracker Upgrade (HTML Tables, Forms, Media & Advanced CSS)

## Overview
This project builds directly on the Week 1 static skeleton for **My Budget Tracker** in **Web Development Fundamentals** at [PLP Academy](https://academy.powerlearnprojectafrica.org/dashboard). It upgrades the page with a structured expense table, a `<form>` containing a category `<select>` dropdown, multimedia elements (`<img>` and `<iframe>`), a collapsible `<details>` guide, and advanced CSS selectors.

## Project Structure
- `index.html` — Upgraded HTML5 markup containing the header with logo image, the `<form>` for adding expenses, a `<details>`/`<summary>` usage guide, a structured expense table (`<thead>` and `<tbody>`), and an embedded YouTube budgeting video.
- `style.css` — Expanded stylesheet preserving Week 1 selectors while adding table styling, hover/pointer states, and advanced CSS selectors.
- `README.md` — Documentation describing the features added in Week 2 and how each component works.

## What Was Built
1. **Expense Table (`#expenses-table`)**: Replaced the Week 1 placeholder text with a semantic `<table>` using `<thead>`, `<tbody>`, `<th>` headers (`Name`, `Amount`, `Category`, `Date`), and five sample rows of `<td>` expense entries. Styled with `border-collapse: collapse`, cell padding, a colored header row, alternating `nth-child(even)` shading, and row `:hover` feedback.
2. **Upgraded Add Expense Form (`#expense-form`)**: Wrapped form controls inside a `<form>` element with matching `id` attributes (`expense-name`, `expense-amount`, `expense-category`, `expense-date`), a `<select>` dropdown with five options (`Food`, `Transport`, `Rent`, `Entertainment`, `Other`), and a `<button type="button">` with `cursor: pointer`.
3. **Multimedia Elements**: Added an `<img>` icon next to the main `<h1>` heading (with `src`, `alt`, and `width` attributes) and embedded a YouTube budgeting video via `<iframe>` (with `src`, `width`, `height`, `title`, and `frameborder` attributes).
4. **Interactive `<details>` & `<summary>`**: Added a collapsible `"How to use this tracker"` section explaining how to use the form.
5. **Advanced CSS Selectors**: Applied descendant (`.expenses-section td`), direct child (`.add-expense-section > form`), positional pseudo-class (`#expenses-table tbody tr:nth-child(even)`), negation pseudo-class (`input:not([type="button"])`), and `:focus` states (`input:focus, select:focus`).

## How to Run
1. Open `index.html` in any modern web browser (such as Google Chrome).
2. Test expanding/collapsing **How to use this tracker**, hovering over rows in **Your Expenses**, focusing on form fields, and playing the embedded video.
