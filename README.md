# POS React Projects (React + Tailwind CSS)

src/
├── app/ ← ALL PARENT JSX PAGES LIVE HERE
│ ├── routes.jsx ← Main React Router setup (defines all 20 routes)
│ ├── layouts/
│ │ ├── RootLayout.jsx ← Navbar + Sidebar + Outlet
│ │ └── CashierLayout.jsx ← Protected layout for cashier
│ ├── pages/ ← ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
│ │ ├── DashboardPage.jsx ← /dashboard
│ │ ├── PosPage.jsx ← /pos ← Main POS terminal
│ │ ├── CustomizePage.jsx ← /pos/customize/:drinkId
│ │ ├── CartPage.jsx ← /pos/cart
│ │ ├── PaymentPage.jsx ← /pos/payment
│ │ ├── ReceiptPage.jsx ← /pos/receipt
│ │ ├── OrdersPage.jsx ← /orders
│ │ ├── InventoryPage.jsx ← /inventory
│ │ ├── MenuPage.jsx ← /menu
│ │ ├── ReportsPage.jsx ← /reports
│ │ ├── StaffPage.jsx ← /staff
│ │ ├── CustomersPage.jsx ← /customers
│ │ └── SettingsPage.jsx ← /settings
│ └── hooks/ ← Shared routing hooks
│ └── useAuthRedirect.js
│
├── features/ ← NO PARENT PAGES HERE (only logic + feature components)
│ ├── pos/
│ │ ├── store/ ← Zustand store for POS
│ │ │ └── cartStore.js
│ │ ├── hooks/
│ │ │ ├── useDrinkCustomizer.js
│ │ │ └── useLivePriceCalculator.js
│ │ ├── components/
│ │ │ ├── DrinkCard.jsx
│ │ │ ├── CustomizerPanel.jsx ← The big customization UI
│ │ │ ├── ToppingSelector.jsx
│ │ │ └── OrderSummaryMini.jsx
│ │ └── utils/
│ │ └── calculatePrice.js
│ │
│ ├── menu/
│ │ ├── store/
│ │ │ └── menuStore.js
│ │ ├── hooks/
│ │ │ └── useMenu.js
│ │ └── components/
│ │ └── MenuItemEditor.jsx
│ │
│ ├── inventory/
│ │ ├── store/
│ │ │ └── inventoryStore.js
│ │ └── components/
│ │ └── LowStockAlert.jsx
│ │
│ ├── auth/
│ │ ├── store/
│ │ │ └── authStore.js
│ │ └── hooks/
│ │ └── useLogin.js
│ │
│ └── reports/
│ ├── store/
│ │ └── reportsStore.js
│ └── components/
│ └── SalesChart.jsx
│
├── components/ ← Reusable UI components (used everywhere)
│ ├── ui/ ← shadcn/ui components (Button, Card, Dialog, etc.)
│ ├── common/
│ │ ├── BubbleAnimation.jsx
│ │ ├── DrinkCard.jsx ← (also used in features/pos)
│ │ ├── LoadingSpinner.jsx
│ │ └── Toast.jsx
│ └── layout/
│ ├── Navbar.jsx
│ └── Sidebar.jsx
│
├── lib/ ← Global utilities & stores
│ ├── stores/ ← Root Zustand stores (if needed)
│ ├── api/ ← Fake API simulation
│ │ └── fakeApi.js
│ ├── utils/
│ │ ├── formatCurrency.js
│ │ ├── generateOrderId.js
│ │ └── localStorageUtils.js
│ └── constants.js ← Tax rate, default sweetness levels, etc.
│
├── data/ ← Mock data (JSON)
│ ├── menuData.js ← 50+ boba drinks with prices
│ ├── toppingsData.js
│ └── promotionsData.js
│
├── assets/
│ ├── icons/ ← Lucide icons + custom SVGs
│ ├── images/
│ │ └── boba-hero.png
│ └── animations/ ← Lottie or SVG bubble files
│
├── styles/
│ └── globals.css ← Tailwind + custom boba theme
│
├── App.jsx ← Root component
└── main.jsx ← Vite entry point
