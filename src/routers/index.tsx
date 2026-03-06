import { Outlet, createBrowserRouter } from "react-router-dom";

import privateRoutes from "./private.router";
import publicRoutes from "./public.router";
import { HomePage, NotFoundPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...publicRoutes,
      ...privateRoutes,
    ],
  },
]);
