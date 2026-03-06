import { Navigate, Outlet } from "react-router-dom";

import { URL } from "@/constants/url.constant";
import { useAppSelector } from "@/redux/hooks";

export const PrivateLayout = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to={URL.LOGIN} replace />;
  }

  return <Outlet />;
};
