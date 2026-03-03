import { Outlet, createBrowserRouter } from "react-router-dom";

import privateRoutes from "./private.router";
import publicRoutes from "./public.router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);
