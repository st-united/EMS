import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { URL } from "@/constants/url.constant";

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = (values: Record<string, unknown>) => {
    // TODO: Implement actual registration logic here
    console.log("Success:", values);
    navigate(URL.LOGIN);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-[#050819] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-[#191D2A] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("auth.register.title", "Tạo tài khoản")}
          </h1>
          <p className="text-sm text-[#99A1AF]">
            {t("auth.register.subtitle", "Bắt đầu quản lý năng lượng hôm nay")}
          </p>
        </div>

        <Form
          name="register"
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

          <Form.Item
            label={<span className="text-white">Mật khẩu</span>}
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
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
            label={<span className="text-white">Xác nhận mật khẩu</span>}
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!"),
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
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-[#99A1AF]">
            Đã có tài khoản?{" "}
            <Link
              to={URL.LOGIN}
              className="font-medium text-[#1890ff] hover:text-blue-400"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
