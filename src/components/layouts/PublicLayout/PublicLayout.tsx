import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

export const PublicLayout = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
