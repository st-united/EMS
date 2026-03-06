import { useTranslation } from "react-i18next";

export const InvoicePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">
        {t("pages.invoice.title")}
      </h1>
    </div>
  );
};
