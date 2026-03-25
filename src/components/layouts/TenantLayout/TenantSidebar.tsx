import { Layout, Menu, Select, Typography } from "antd";
import {
  BarChartOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Logo } from "@/assets/images";
import { URL } from "@/constants";
import { useUserLocations } from "@/hooks/useLocation";

const { Sider } = Layout;

export interface TenantSidebarProps {
  /** Desktop: narrow sidebar with icon-only menu */
  collapsed?: boolean;
  /** Synced with Sider when using header toggle */
  onCollapse?: (collapsed: boolean) => void;
  /** When true, render inner content only (used inside mobile Drawer) */
  mobileDrawer?: boolean;
  /** Close mobile drawer after navigation */
  onNavigate?: () => void;
}

export const TenantSidebar = ({
  collapsed = false,
  onCollapse,
  mobileDrawer = false,
  onNavigate,
}: TenantSidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { id: locationIdFromUrl } = useParams<{ id: string }>();

  const currentPath = routeLocation.pathname.split("/").pop() || "";
  const activeMenuKey =
    currentPath === locationIdFromUrl || currentPath === URL.TENANT_BASE
      ? URL.OVERVIEW
      : currentPath;

  const { locations, isLoading } = useUserLocations();

  const selectedLocation =
    locations.find((l) => l.id === locationIdFromUrl) || null;
  const isLocationSelected = !!selectedLocation;

  const handleLocationChange = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId);
    if (location) {
      const targetPath =
        currentPath &&
        currentPath !== URL.TENANT_BASE &&
        currentPath !== locationIdFromUrl
          ? currentPath
          : URL.OVERVIEW;
      navigate(`/tenant/${locationId}/${targetPath}`);
    }
    onNavigate?.();
  };

  const handleClear = () => {
    navigate("/");
    onNavigate?.();
  };

  const locationOptions = locations.map((loc) => ({
    value: loc.id,
    label: loc.name,
  }));

  const menuItems = [
    {
      key: URL.OVERVIEW,
      icon: <HomeOutlined />,
      label: t("tenant.sidebar.menu.overview"),
      disabled: !isLocationSelected,
      onClick: () => {
        if (isLocationSelected) navigate(URL.OVERVIEW);
        onNavigate?.();
      },
    },
    {
      key: URL.TRACKING,
      icon: <BarChartOutlined />,
      label: t("tenant.sidebar.menu.consumption"),
      disabled: !isLocationSelected,
      onClick: () => {
        if (isLocationSelected) navigate(URL.TRACKING);
        onNavigate?.();
      },
    },
    {
      key: URL.INVOICE,
      icon: <FileTextOutlined />,
      label: t("tenant.sidebar.menu.bills"),
      disabled: !isLocationSelected,
      onClick: () => {
        if (isLocationSelected) navigate(URL.INVOICE);
        onNavigate?.();
      },
    },
    {
      key: URL.PROFILE,
      icon: <UserOutlined />,
      label: t("tenant.sidebar.menu.profile"),
      onClick: () => {
        navigate(URL.PROFILE);
        onNavigate?.();
      },
    },
  ];

  const showCollapsedChrome = collapsed && !mobileDrawer;

  const inner = (
    <>
      <div
        className={
          showCollapsedChrome
            ? "flex items-center justify-center px-2 py-4"
            : "flex items-center gap-3 px-6 py-4"
        }
      >
        <img src={Logo} alt="logo" className="h-8 w-8 shrink-0" />
        {!showCollapsedChrome && (
          <div className="flex flex-col min-w-0">
            <span className="text-2xl font-medium text-white">EMS</span>
          </div>
        )}
      </div>

      {!showCollapsedChrome && (
        <div className="border-b border-[#1d2136] px-4 py-4">
          <Typography.Text className="mb-2 block text-xs text-[#99A1AF]!">
            {t("tenant.sidebar.currentLocation")}
          </Typography.Text>
          <Select
            className="tenant-location-select w-full"
            placeholder={t("tenant.sidebar.selectLocation", "Chọn địa điểm...")}
            value={selectedLocation?.id || undefined}
            onChange={handleLocationChange}
            loading={isLoading}
            options={locationOptions}
            allowClear
            onClear={handleClear}
            suffixIcon={<EnvironmentOutlined style={{ color: "#99A1AF" }} />}
            styles={{
              popup: {
                root: { backgroundColor: "#1F2937" },
              },
            }}
            style={{ backgroundColor: "#1F2937" }}
            variant="outlined"
            getPopupContainer={(trigger) =>
              trigger.parentElement ?? document.body
            }
          />
        </div>
      )}

      <div className="tenant-sidebar-menu mt-2 px-3">
        <Menu
          theme="dark"
          mode="inline"
          inlineCollapsed={showCollapsedChrome}
          selectedKeys={[activeMenuKey]}
          className="mt-2 border-none! bg-transparent!"
          items={menuItems}
        />
      </div>
    </>
  );

  if (mobileDrawer) {
    return (
      <div className="min-h-full bg-[#0F1118] pb-6" role="navigation">
        {inner}
      </div>
    );
  }

  return (
    <Sider
      width={320}
      collapsedWidth={80}
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsible
      trigger={null}
      className="tenant-sidebar-sider bg-[#0F1118]!"
    >
      {inner}
    </Sider>
  );
};
