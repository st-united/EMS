import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { URL } from "@/constants/url.constant";

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  const onFinish = (values: { email: string }) => {
    // TODO: Implement actual password reset logic here
    console.log("Password reset requested for:", values.email);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-[#050819] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-[#191D2A] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("auth.forgotPassword.title", "Quên mật khẩu")}
          </h1>
          <p className="text-sm text-[#99A1AF]">
            {t(
              "auth.forgotPassword.subtitle",
              "Nhập email của bạn và chúng tôi sẽ gửi liên kết khôi phục mật khẩu.",
            )}
          </p>
        </div>

        <Form
          name="forgotPassword"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              size="large"
              placeholder="name@company.com"
              className="bg-[#0F1118]! border-[#1d2136]! text-white! placeholder-[#99A1AF]! hover:border-[#1890ff]! focus:border-[#1890ff]!"
              style={{ color: "white" }}
            />
          </Form.Item>

          <Form.Item className="mt-8 mb-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full font-medium"
            >
              Gửi liên kết khôi phục
            </Button>
          </Form.Item>

          <div className="text-center text-sm">
            <Link
              to={URL.LOGIN}
              className="font-medium text-[#1890ff] hover:text-blue-400 flex items-center justify-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Quay lại Đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
