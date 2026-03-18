import { type RouteObject } from "react-router-dom";

import { PrivateLayout, TenantLayout } from "@/components/layouts";
import { URL } from "@/constants";
import {
  InvoiceDetailPage,
  InvoicePage,
  OverviewPage,
  ProfilePage,
  TrackingPage,
} from "@/pages";

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
            path: URL.OVERVIEW,
            element: <OverviewPage />,
          },
          {
            path: URL.TRACKING,
            element: <TrackingPage />,
          },
          {
            path: URL.INVOICE,
            element: <InvoicePage />,
          },
          {
            path: URL.INVOICE_DETAIL,
            element: <InvoiceDetailPage />,
          },
          {
            path: URL.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
];

export default routes;
