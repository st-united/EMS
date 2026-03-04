import { Layout, Menu, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { Logo } from "@/assets/images";
import { URL } from "@/constants";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export const TenantSidebar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
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
        <select
          className="w-full rounded-md border border-[#1d2136] bg-[#1F2937] p-2 text-sm text-white outline-none"
          aria-label={t("tenant.sidebar.currentLocation")}
        >
          <option>Căn hộ 1203 • Vinhomes Central Park, Q. Bình Thạnh</option>
        </select>
      </div>

      <div className="mt-2 px-3 text-[#99A1AF]!">
        <Menu
          mode="inline"
          defaultSelectedKeys={["overview"]}
          className="mt-2 bg-[#0F1118]!"
          items={[
            {
              key: URL.OVERVIEW,
              label: t("tenant.sidebar.menu.overview"),
              onClick: () => navigate(URL.OVERVIEW),
            },
            {
              key: URL.TRACKING,
              label: t("tenant.sidebar.menu.consumption"),
              onClick: () => navigate(URL.TRACKING),
            },
            {
              key: URL.INVOICE,
              label: t("tenant.sidebar.menu.bills"),
              onClick: () => navigate(URL.INVOICE),
            },
            {
              key: URL.PROFILE,
              label: t("tenant.sidebar.menu.profile"),
              onClick: () => navigate(URL.PROFILE),
            },
          ]}
        />
      </div>
    </Sider>
  );
};
