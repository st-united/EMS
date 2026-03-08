import { Layout, Menu, Select, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Logo } from "@/assets/images";
import { URL } from "@/constants";
import { useUserLocations } from "@/hooks/useLocation";

const { Sider } = Layout;

export const TenantSidebar = () => {
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
  };

  const handleClear = () => {
    navigate("/");
  };

  const locationOptions = locations.map((loc) => ({
    value: loc.id,
    label: loc.name,
  }));

  const menuItems = [
    {
      key: URL.OVERVIEW,
      label: t("tenant.sidebar.menu.overview"),
      disabled: !isLocationSelected,
      onClick: () => isLocationSelected && navigate(URL.OVERVIEW),
    },
    {
      key: URL.TRACKING,
      label: t("tenant.sidebar.menu.consumption"),
      disabled: !isLocationSelected,
      onClick: () => isLocationSelected && navigate(URL.TRACKING),
    },
    {
      key: URL.INVOICE,
      label: t("tenant.sidebar.menu.bills"),
      disabled: !isLocationSelected,
      onClick: () => isLocationSelected && navigate(URL.INVOICE),
    },
    {
      key: URL.PROFILE,
      label: t("tenant.sidebar.menu.profile"),
      onClick: () => navigate(URL.PROFILE),
    },
  ];

  return (
    <Sider width={320} trigger={null} className="bg-[#0F1118]!">
      <div className="flex items-center gap-3 px-6 py-4">
        <img src={Logo} alt="logo" className="h-8 w-8" />
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-white">EMS</span>
        </div>
      </div>

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
        />
      </div>

      <div className="mt-2 px-3 text-[#99A1AF]!">
        <Menu
          mode="inline"
          selectedKeys={[activeMenuKey]}
          className="mt-2 bg-[#0F1118]!"
          items={menuItems}
        />
      </div>
    </Sider>
  );
};
