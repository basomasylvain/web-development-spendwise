# Week 4 Assignment: Rebuild the Tracker's Layout with Flexbox and Grid

## Overview
This project upgrades the **SpendWise** tracker shell for **Web Development Fundamentals** at [PLP Academy](https://academy.powerlearnprojectafrica.org/dashboard) using modern CSS layout techniques while preserving your existing expense form, expense table, usage guide, and budgeting video. It remains a static layout shell with no JavaScript interactivity required yet.

## What Each Part Does
- `index.html` — Structures the **SpendWise Dashboard Shell** with a sidebar navigation menu (`#sidebar-nav`), header bar (`#dashboard-header`), six static category cards (**Food**, **Transport**, **Rent**, **Entertainment**, **Savings**, **Utilities**), and the retained expense entry form, expense table, collapsible guide, and embedded budgeting video.
- `style.css` — Implements CSS Grid for the overall page and category card layout, Flexbox inside the sidebar, header, and category cards, `:root` CSS custom properties for light and dark (`@media (prefers-color-scheme: dark)`) themes, responsive single-column behavior below `768px`, and `200ms` hover/focus card micro-interactions.
- `README.md` — Documents the dashboard architecture, file responsibilities, and browser verification steps.

## How to View & Verify
1. Open `index.html` in a browser (such as Google Chrome) and verify that the sidebar, header, six category cards, form, table, and video render cleanly.
2. Open **DevTools Device Toolbar**, resize below `768px`, and confirm the layout collapses into a single-column stack without horizontal overflow or `position: absolute` layout hacks.
3. Hover and `Tab` (`:focus-visible`) across the category cards to confirm smooth `transform` and `box-shadow` transitions within `250ms`, and test dark color scheme emulation in DevTools.
