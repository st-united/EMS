import { Layout } from "antd";
import { useTranslation } from "react-i18next";

const { Footer } = Layout;

export const TenantFooter = () => {
  const { t } = useTranslation();

  return (
    <Footer className="flex items-center justify-between px-6 pt-12 text-xs bg-[#000000]! text-[#a0a4b8]!">
      <span>
        {t("tenant.footer.copyright", {
          year: new Date().getFullYear(),
        })}
      </span>
      <div className="flex gap-4">
        <button className="hover:text-white">{t("tenant.footer.help")}</button>
        <button className="hover:text-white">
          {t("tenant.footer.contact")}
        </button>
        <button className="hover:text-white">{t("tenant.footer.terms")}</button>
      </div>
    </Footer>
  );
};
