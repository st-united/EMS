import { Layout } from "antd";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
