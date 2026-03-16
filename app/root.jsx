import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./app.css";

export function meta() {
  return [
    { charset: "utf-8" },
    { title: "POS" },
    { viewport: "width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css",
      integrity:
        "sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==",
      crossorigin: "anonymous",
      referrerpolicy: "no-referrer",
    },
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
