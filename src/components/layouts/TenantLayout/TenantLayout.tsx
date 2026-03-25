import { Drawer, Grid, Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import "./TenantLayout.css";

import { useProfile } from "@/hooks/useProfile";
import { setAuth } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

import { TenantSidebar } from "./TenantSidebar";
import { TenantHeader } from "./TenantHeader";
import { TenantFooter } from "./TenantFooter";

const { Content } = Layout;

export const TenantLayout = () => {
  const dispatch = useAppDispatch();
  const { data: profileData } = useProfile();

  const screens = Grid.useBreakpoint();
  const isMobile = screens.lg === false;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (profileData?.data) {
      dispatch(setAuth({ user: profileData.data, permissions: [] }));
    }
  }, [profileData?.data, dispatch]);

  useEffect(() => {
    if (!isMobile) {
      setMobileDrawerOpen(false);
    }
  }, [isMobile]);

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileDrawerOpen(true);
    } else {
      setSidebarCollapsed((c) => !c);
    }
  };

  return (
    <Layout id="tenant-layout" className="bg-[#050819] h-screen text-white!">
      {!isMobile && (
        <TenantSidebar
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />
      )}

      {isMobile && (
        <Drawer
          placement="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          width={320}
          closable
          className="tenant-mobile-drawer"
          styles={{
            body: { padding: 0, background: "#0F1118" },
            header: {
              background: "#0F1118",
              borderBottom: "1px solid #1d2136",
            },
          }}
          title={null}
        >
          <TenantSidebar
            mobileDrawer
            onNavigate={() => setMobileDrawerOpen(false)}
          />
        </Drawer>
      )}

      <Layout>
        <TenantHeader onMenuClick={handleMenuClick} />

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
