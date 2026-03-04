import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import "./TenantLayout.css";

import { TenantSidebar } from "./TenantSidebar";
import { TenantHeader } from "./TenantHeader";
import { TenantFooter } from "./TenantFooter";

const { Content } = Layout;

export const TenantLayout = () => {
  return (
    <Layout id="tenant-layout" className="bg-[#050819] h-screen hidden">
      <TenantSidebar />

      <Layout>
        <TenantHeader />

        <Content className="h-full">
          <div className="tenant-scroll h-full overflow-y-auto overscroll-contain bg-[#191D2A] px-6 py-4 pr-3">
            <Outlet />
          </div>
        </Content>

        <TenantFooter />
      </Layout>
    </Layout>
  );
};
