import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./app.css";

export function meta() {
  return [
    { charset: "utf-8" },
    { title: "POS" },
    { viewport: "width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0" },
  ];
}

export default function App() {
  return (
    <html lang="zh-Hant">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
