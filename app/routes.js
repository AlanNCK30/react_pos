import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("dashboard", "./routes/dashboard.jsx"),
  route("pos", "./routes/pos.jsx"),
];
