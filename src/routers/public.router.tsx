import { type RouteObject, Navigate } from "react-router-dom";

import { PublicLayout } from "@/components/layouts";
import { URL } from "@/constants/url.constant";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/pages";

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={URL.LOGIN} replace />,
      },
      {
        path: URL.LOGIN,
        element: <LoginPage />,
      },
      {
        path: URL.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: URL.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
    ],
  },
];

export default routes;
