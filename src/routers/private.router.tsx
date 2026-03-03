import { type RouteObject } from "react-router-dom";

import { PrivateLayout, TenantLayout } from "@/components/layouts";
import { URL } from "@/constants";
import { TenantPage } from "@/pages";

const routes: RouteObject[] = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: URL.TENANT,
        element: <TenantLayout />,
        children: [
          {
            index: true,
            element: <TenantPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
