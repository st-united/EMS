import { type RouteObject } from "react-router-dom";

import { PublicLayout } from "@/components/layouts";
import { URL } from "@/constants/url.constant";
import { LoginPage, ForgotPasswordPage } from "@/pages";

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: URL.LOGIN,
        element: <LoginPage />,
      },
      {
        path: URL.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
    ],
  },
];

export default routes;
