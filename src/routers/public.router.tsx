import { type RouteObject } from "react-router-dom";

import { PublicLayout } from "@/components/layouts";

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <h1>Public Layout</h1>,
      },
    ],
  },
];

export default routes;
