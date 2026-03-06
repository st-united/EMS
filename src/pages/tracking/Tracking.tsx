import { useTranslation } from "react-i18next";

export const TrackingPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">
        {t("pages.tracking.title")}
      </h1>
    </div>
  );
};
