# SpendWise — Personal Budget & Expense Tracker

## Project Description
**SpendWise** is a personal budget and expense tracker web application built across the **Web Development Fundamentals** module at [PLP Academy](https://academy.powerlearnprojectafrica.org/dashboard). Users can set a monthly budget target, view real-time budget health status alerts, monitor spending across six categories (**Food**, **Transport**, **Rent**, **Entertainment**, **Savings**, and **Utilities**), add or delete expenses via an interactive form and table, filter entries by category, and watch an embedded budgeting guide.

## Technologies Used
- **HTML5:** Semantic dashboard structure (`<aside>`, `<header>`, `<main>`, `<section>`, `<form>`, `<table>`, `<details>`) and accessible form controls.
- **CSS3:** CSS Grid and Flexbox layouts, custom CSS variables (`:root`) for light and dark (`@media (prefers-color-scheme: dark)`) themes, hover/focus micro-interactions, and responsive breakpoints below `768px`.
- **JavaScript (ES6+):** State management with arrays and objects, `for` / `for...of` loops, `if / else if / else` budget threshold and validation logic, dynamic DOM rendering, and event delegation.
- **Git & GitHub:** Version control and source code hosting.
- **Netlify:** Continuous deployment and live web hosting.

## GitHub Repository Information
- **Repository:** [basomasylvain/web-development-spendwise](https://github.com/basomasylvain/web-development-spendwise)
- **Branch:** `main`
- **Project Files:** `index.html`, `style.css`, `script.js`, and `README.md` at the repository root.

## Live Netlify Website URL
- **Live Site:** [https://spendwise-site.netlify.app/](https://spendwise-site.netlify.app/)
- **Custom Subdomain:** Configured to `spendwise-site` on Netlify.

## Deployment Process Summary
1. Organized all static frontend files (`index.html`, `style.css`, `script.js`, and `README.md`) cleanly in the root of the public [web-development-spendwise](https://github.com/basomasylvain/web-development-spendwise) GitHub repository.
2. Connected the GitHub repository to **Netlify** (`main` branch) and deployed the site with no build step required for static root assets.
3. Renamed the default Netlify site subdomain to a project-specific name (`spendwise-site`) so the live URL is clear and memorable.
4. Pushed updated code changes to GitHub and verified that Netlify automatically triggered a new build and updated the live website.
5. Tested the deployed site in the browser across desktop and mobile viewports to confirm HTML, CSS, JavaScript interactivity, and embedded media load cleanly.

## Challenges Encountered During Deployment
- **Verifying Automatic Redeployments After Pushing Updates:** After pushing changes to `main`, it was important to confirm the latest commit actually reached production rather than viewing a cached earlier build. **Resolution:** Added a visible `Netlify Live` badge in the dashboard header and checked Netlify's deploy log and hard-refreshed the live site after pushing to GitHub.
- **Ensuring Relative Paths & Responsive Layout Work in Production:** Mixing local file previews with hosted assets can sometimes expose broken relative paths or narrow-screen overflow. **Resolution:** Kept relative asset paths (`style.css` and `script.js`) clean at the project root and tested the live Netlify URL at mobile widths (`< 768px`) as well as in DevTools Console.

## Lessons Learned
- Connecting a public GitHub repository directly to Netlify creates a smooth continuous deployment workflow where pushing to `main` automatically publishes updates to a live URL.
- Clear repository structure, relative file paths, and browser DevTools verification catch layout or script issues early before sharing a live link.
- Documenting the live URL, deployment steps, and troubleshooting notes inside `README.md` makes a project much easier for reviewers and future contributors to run and understand.
