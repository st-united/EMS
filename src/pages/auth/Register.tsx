import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useRegister } from "@/hooks";
import { URL } from "@/constants/url.constant";
import type { RegisterCredentials } from "@/interfaces";

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { mutate: registerMutate, isPending } = useRegister();

  const onFinish = (values: RegisterCredentials) => {
    registerMutate(values);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-[#050819] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-[#191D2A] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("auth.register.title")}
          </h1>
          <p className="text-sm text-[#99A1AF]">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label={
              <span className="text-white">{t("auth.register.email")}</span>
            }
            name="email"
            rules={[
              { required: true, message: t("auth.register.emailRequired") },
              { type: "email", message: t("auth.register.emailInvalid") },
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
              <span className="text-white">{t("auth.register.password")}</span>
            }
            name="password"
            rules={[
              { required: true, message: t("auth.register.passwordRequired") },
              { min: 8, message: t("auth.register.passwordMin") },
            ]}
            hasFeedback
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

          <Form.Item
            label={
              <span className="text-white">
                {t("auth.register.confirmPassword")}
              </span>
            }
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("auth.register.confirmPasswordRequired"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("auth.register.passwordMismatch")),
                  );
                },
              }),
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

          <Form.Item className="mt-8 mb-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full font-medium"
              loading={isPending}
            >
              {t("auth.register.submit")}
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-[#99A1AF]">
            {t("auth.register.hasAccount")}{" "}
            <Link
              to={URL.LOGIN}
              className="font-medium text-[#1890ff] hover:text-blue-400"
            >
              {t("auth.register.loginNow")}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
