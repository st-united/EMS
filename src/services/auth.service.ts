import axios from "axios";

import { API_URL } from "@/constants";
import {
  type Credentials,
  type RegisterCredentials,
  type ForgotPasswordPayload,
} from "@/interfaces";

export const loginApi = (credentials: Credentials) =>
  axios.post(API_URL.LOGIN, credentials);

export const registerApi = (credentials: RegisterCredentials) =>
  axios.post(API_URL.REGISTER, credentials);

export const forgotPasswordApi = (payload: ForgotPasswordPayload) =>
  axios.post(API_URL.FORGOT_PASSWORD, payload);

export const refreshTokenApi = () => axios.get(API_URL.REFRESH_TOKEN);

export const getLogout = () => axios.get(API_URL.LOGOUT);

export const getActivateAccount = (token: string) =>
  axios.get(`${API_URL.ACTIVATE_ACCOUNT}?token=${token}`);
