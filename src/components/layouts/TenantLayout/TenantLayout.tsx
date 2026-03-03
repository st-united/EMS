import { Layout } from "antd";
import { Outlet } from "react-router-dom";

export const TenantLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
