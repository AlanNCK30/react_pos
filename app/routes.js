import { index, layout, route } from "@react-router/dev/routes";

export default [
  route("login", "./routes/LoginPage.jsx"),
  layout("./layouts/CustomerLayout.jsx", [
    route("customer", "./routes/CustomerLandingPage.jsx"),
    route("customer/menu", "./routes/CustomerMenuPage.jsx"),
    route("customer/checkout", "./routes/CustomerCheckoutPage.jsx"),
    route("customer/checkout/success", "./routes/CustomerCheckoutSuccessPage.jsx"),
  ]),
  layout("./layouts/RootLayout.jsx", [
    index("./routes/DashboardPage.jsx"),
    route("pos", "./routes/PosPage.jsx"),
    route("employee", "./routes/EmployeePage.jsx"),
    route("employee/new", "./routes/EmployeeCreatePage.jsx"),
    route("order-history", "./routes/OrderHistoryPage.jsx"),
    route("order-history/:orderId", "./routes/OrderDetailPage.jsx"),
    route("inventory", "./routes/InventoryPage.jsx"),
    route("product-catalog", "./routes/ProductCatalog.jsx"),
    route("product-management", "./routes/ProductManagement.jsx"),
    route("kitchen-display", "./routes/KitchenDisplayPage.jsx"),
    route("sales-analytics", "./routes/AnalyticsPage.jsx"),
    route("membership", "./routes/MembershipPage.jsx"),
  ]),
];
