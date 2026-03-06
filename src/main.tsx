import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import i18n from "@/configs/i18n";
import { router } from "./routers";
import store from "./redux/store";
import "@/configs/axios";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </Provider>
      </I18nextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
