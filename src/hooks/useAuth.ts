import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { removeStorageData, setStorageData } from "@/configs/storages";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_PROFILE } from "@/constants";
import { URL } from "@/constants/url.constant";
import type {
  Credentials,
  RegisterCredentials,
  ForgotPasswordPayload,
} from "@/interfaces";
import { login, logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  loginApi,
  registerApi,
  forgotPasswordApi,
  getLogout,
} from "@/services";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      const { data } = await loginApi(credentials);
      return data;
    },
    onSuccess: (response) => {
      toast.success(t("auth.login.success", "Đăng nhập thành công!"));
      dispatch(login());

      setStorageData(ACCESS_TOKEN, response.data.accessToken);
      setStorageData(REFRESH_TOKEN, response.data.refreshToken);

      navigate(`/tenant/${"demo-workspace-001"}`);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 401) {
        toast.error(
          message || t("auth.login.unauthorized", "Sai email hoặc mật khẩu!"),
        );
        return;
      }

      toast.error(t("auth.login.fail", "Đăng nhập thất bại!"));
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await registerApi(credentials);
      return data;
    },
    onSuccess: () => {
      toast.success(
        t(
          "auth.register.success",
          "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.",
        ),
      );
      navigate(URL.LOGIN);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error?.response?.data?.message;

      toast.error(message || t("auth.register.fail", "Đăng ký thất bại!"));
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async () => {
      await getLogout();
    },
    onSuccess: () => {
      removeStorageData(ACCESS_TOKEN);
      removeStorageData(REFRESH_TOKEN);
      removeStorageData(USER_PROFILE);

      dispatch(logout());
      navigate(URL.LOGIN);

      toast.success(t("auth.logout.success", "Đăng xuất thành công!"));
    },
    onError: () => {
      removeStorageData(ACCESS_TOKEN);
      removeStorageData(REFRESH_TOKEN);
      removeStorageData(USER_PROFILE);

      dispatch(logout());
      navigate(URL.LOGIN);
    },
  });
};

export const useForgotPassword = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const { data } = await forgotPasswordApi(payload);
      return data;
    },
    onSuccess: () => {
      toast.success(
        t(
          "auth.forgotPassword.success",
          "Liên kết khôi phục mật khẩu đã được gửi đến email của bạn!",
        ),
      );
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error?.response?.data?.message;

      toast.error(
        message || t("auth.forgotPassword.fail", "Gửi yêu cầu thất bại!"),
      );
    },
  });
};
