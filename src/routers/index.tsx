import { Outlet, createBrowserRouter } from "react-router-dom";

import privateRoutes from "./private.router";
import publicRoutes from "./public.router";
import { NotFoundPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFoundPage />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);
