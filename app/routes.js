import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/RootLayout.jsx", [
    index("./routes/DashboardPage.jsx"),
    route("pos", "./routes/PosPage.jsx"),
  ]),
];
