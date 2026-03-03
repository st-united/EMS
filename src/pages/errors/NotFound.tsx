import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title={t("NOT_FOUND.TITLE")}
      subTitle={t("NOT_FOUND.SUB_TITLE")}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {t("NOT_FOUND.BACK_HOME")}
        </Button>
      }
    />
  );
};
