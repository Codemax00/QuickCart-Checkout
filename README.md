# QuickCart Checkout

QuickCart Checkout is a front-end demo project that combines a basic login/registration screen with a simple checkout calculator UI.

## Problem Statement

This project demonstrates how a lightweight e-commerce flow can be built using only HTML, CSS, and JavaScript:
- User sign up/sign in in the browser
- A checkout form with product, quantity, delivery, gift wrap, and coupon handling
- Live total calculation without a backend

## Features

- Tab-based Sign In / Sign Up interface
- Client-side validation for registration and login forms
- Local browser storage for registered demo users
- Session-based route guard for `dashboard.html`
- Checkout calculation with:
  - Product price
  - Quantity
  - Delivery type
  - Gift wrap charge
  - `SAVE10` coupon support
- Reset and logout actions

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Browser `localStorage` and `sessionStorage`

## Project Structure

```text
QuickCart-Checkout/
├── index.html        # Sign in / sign up page
├── dashboard.html    # Checkout page
├── script.js         # Authentication and checkout logic
├── style.css         # Shared styling
└── _config.yml       # GitHub Pages/Jekyll metadata
```

## Setup and Installation

No build step is required.

1. Clone the repository.
2. Open `index.html` in a browser.

Alternative (recommended for local development):
1. Start any static file server in the repository root.
2. Open the served URL in your browser.

## Usage

1. Open `index.html`.
2. Register a user in **Sign Up**.
3. Sign in with either:
   - Registered credentials, or
   - Demo tester credentials configured in `script.js`.
4. On the checkout page:
   - Select a product
   - Enter quantity
   - Optionally apply coupon `SAVE10`
   - Choose delivery type
   - Optionally enable gift wrap
5. Click **Calculate Total**.

## Demo / Screenshots

- No screenshots or hosted demo link are currently included in this repository.

## Current Results

- End-to-end demo flow works fully in-browser.
- No backend service or database is required for execution.

## Limitations

- Authentication is client-side only and not secure for production.
- Passwords are stored in browser storage for demo purposes.
- No persistent server-side sessions or API integration.
- Coupon and product catalog are hardcoded.

## Future Improvements

- Add backend authentication and secure password handling.
- Replace hardcoded catalog/coupons with API-driven data.
- Add unit/integration tests.
- Improve accessibility and responsive behavior for smaller screens.
- Add CI checks and deployment workflow documentation.

## Security Notes

- No API keys or external secrets were found in the repository.
- A hardcoded demo login credential exists in `script.js`; treat it as sample data and remove it for production use.
