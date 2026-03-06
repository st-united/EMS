import { useTranslation } from "react-i18next";

export const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">
        {t("pages.profile.title")}
      </h1>
    </div>
  );
};
