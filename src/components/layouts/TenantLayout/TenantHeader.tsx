import { Layout, Button, Avatar, Dropdown, type MenuProps } from "antd";
import {
  BellOutlined,
  MenuOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { LANGUAGE_DATA, LOCALE_STORAGE, LOCALES } from "@/constants";

const { Header } = Layout;

export const TenantHeader = () => {
  const { t, i18n } = useTranslation();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: t("tenant.header.menu.profile"),
    },
    {
      key: "logout",
      label: t("tenant.header.menu.logout"),
    },
  ];

  const handleChangeLanguage: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key.toString());
    localStorage.setItem(LOCALE_STORAGE, key.toString());
  };

  const languageMenu: MenuProps = {
    items: LANGUAGE_DATA,
    onClick: handleChangeLanguage,
  };

  const currentLang = i18n.language === LOCALES.EN ? LOCALES.EN : LOCALES.VI;

  return (
    <Header className="flex items-center justify-between bg-[#393939]! px-6 text-white!">
      <Button type="text" icon={<MenuOutlined />} className="text-white!" />

      <div className="flex items-center gap-6">
        <Dropdown menu={languageMenu} trigger={["click"]}>
          <button className="flex items-center gap-1 text-white">
            <GlobalOutlined />
            <span className="text-xs font-medium uppercase">{currentLang}</span>
          </button>
        </Dropdown>

        <Button
          type="text"
          shape="circle"
          icon={<BellOutlined />}
          className="text-white!"
        />
        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
          <button className="flex items-center gap-2 text-white">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="text-sm font-medium">Lam Hoang</span>
          </button>
        </Dropdown>
      </div>
    </Header>
  );
};
