import { index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./layouts/RootLayout.jsx", [
        index("./routes/DashboardPage.jsx"),
        route("pos", "./routes/PosPage.jsx"),
        route("employee", "./routes/EmployeePage.jsx"),
        // TODO staff : id ,update status
        // TODO create staff, id
        route("order-history", "./routes/OrderHistoryPage.jsx"),
        route("inventory", "./routes/InventoryPage.jsx"),

        // TODO 原料管理
        // TODO 創建原料
    ]),
];
