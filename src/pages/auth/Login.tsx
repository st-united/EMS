import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useLogin } from "@/hooks";
import { URL } from "@/constants/url.constant";
import type { Credentials } from "@/interfaces";

export const LoginPage = () => {
  const { t } = useTranslation();
  const { mutate: loginMutate, isPending } = useLogin();

  const onFinish = (values: Credentials) => {
    loginMutate(values);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-[#050819] px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#191D2A] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("auth.login.title")}
          </h1>
          <p className="text-sm text-[#99A1AF]">{t("auth.login.subtitle")}</p>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="text-white"
          disabled={isPending}
        >
          <Form.Item
            label={<span className="text-white">{t("auth.login.email")}</span>}
            name="email"
            rules={[
              { required: true, message: t("auth.login.emailRequired") },
              { type: "email", message: t("auth.login.emailInvalid") },
            ]}
          >
            <Input
              size="large"
              placeholder="name@company.com"
              className="bg-[#0F1118]! border-[#1d2136]! text-white! placeholder-[#99A1AF]! hover:border-[#1890ff]! focus:border-[#1890ff]!"
              style={{ color: "white" }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-white">{t("auth.login.password")}</span>
            }
            name="password"
            rules={[
              { required: true, message: t("auth.login.passwordRequired") },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              className="bg-[#0F1118]! border-[#1d2136]! text-white! placeholder-[#99A1AF]! hover:border-[#1890ff]! focus:border-[#1890ff]! [&_input::placeholder]:text-[#99A1AF]!"
              styles={{
                input: { backgroundColor: "transparent", color: "white" },
              }}
            />
          </Form.Item>

          <div className="mb-6 flex items-center justify-between">
            <Link
              to={URL.FORGOT_PASSWORD}
              className="text-sm font-medium text-[#1890ff] hover:text-blue-400"
            >
              {t("auth.login.forgotPassword")}
            </Link>
          </div>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full font-medium"
              loading={isPending}
            >
              {t("auth.login.submit")}
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-[#99A1AF]">
            {t("auth.login.noAccount")}{" "}
            <Link
              to={URL.REGISTER}
              className="font-medium text-[#1890ff] hover:text-blue-400"
            >
              {t("auth.login.registerNow")}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
