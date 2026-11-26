# Week 3 Assignment: Design the Visual Identity of Your Budget Tracker

## Overview
This project builds directly on the Week 1 and Week 2 files for **My Budget Tracker** in **Web Development Fundamentals** at [PLP Academy](https://academy.powerlearnprojectafrica.org/explore-courses), without changing the HTML structure or adding new functionality. It focuses on visual identity through a consistent color palette, a Google Fonts pairing, refined form and table styling, and intentional CSS Box Model cards.

## Repository Files
- `index.html` — Preserves the existing semantic markup, form controls, expense table, wallet icon, collapsible guide, and embedded budgeting video while adding the Google Fonts stylesheet link.
- `style.css` — Implements the visual palette, typography rules, form and table styles, and card layout spacing using the CSS Box Model.
- `README.md` — Documents the visual design choices, files, and browser verification steps.

## Visual Identity & Styling Highlights
1. **Cohesive Color Palette**: Uses a deep teal primary (`#0f766e` / `#115e59`), an indigo accent (`#4338ca` / `#e0e7ff`), slate neutrals (`#f1f5f9`, `#ffffff`, `#f8fafc`, `#cbd5e1`), and high-contrast slate/white text across the page background, headings, buttons, table headers, borders, and focus states.
2. **Typography Hierarchy**: Pairs **Space Grotesk** for headings, table headers, and primary action buttons with **Plus Jakarta Sans** for body copy, labels, form fields, and table data, keeping consistent sizing and readable line height across the interface.
3. **Expense Table & Form Styling**: Adds generous cell and input padding, crisp borders, rounded corners (`border-radius`), a styled indigo table header (`<thead>`), alternating row shading (`nth-child(even)`), row hover highlights, and cohesive button/focus states.
4. **CSS Box Model Cards**: Separates the page header card, Add Expense form card, Your Expenses table card, and Budgeting Tips card using distinct margins, internal padding, borders, and rounded corners.

## How to View & Verify
1. Open `index.html` in a web browser (such as Google Chrome) with internet access so Google Fonts load.
2. Check that the page header, Add Expense card, and Expense Table card each display clear spacing, borders, and rounded corners.
3. Test typing in form fields, opening a category `<select>`, hovering over table rows, clicking **Add Expense**, and toggling **How to use this tracker**.
