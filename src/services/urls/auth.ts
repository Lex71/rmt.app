import type {
  Login,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  Register,
  RegisterResponse,
  UpdatePassword,
  User,
  WhoamiResponse,
} from "@/types";
import { request } from "../axiosClient";

export const register = (data: Register): Promise<RegisterResponse> =>
  request({
    url: `/auth/register`,
    method: "POST",
    data,
  });

export const updatePassword = (data: UpdatePassword): Promise<User> =>
  request({
    url: `/auth/change-password`,
    method: "POST",
    data,
  });

export const login = (data: Login): Promise<LoginResponse> =>
  request({
    url: `/auth/login`,
    method: "POST",
    data,
  });

export const logout = (): Promise<LogoutResponse> =>
  request({
    url: `/auth/logout`,
    method: "DELETE",
  });

export const whoami = (): Promise<WhoamiResponse> =>
  request({
    url: `/auth/whoami`,
    method: "GET",
  });

export const recoverPassword = (data: { email: string }): Promise<User> =>
  request({
    url: `/forgot-password/`,
    method: "POST",
    data,
  });

export const refresh = (): Promise<RefreshTokenResponse> =>
  request({
    url: `/token/refresh`,
    method: "GET",
  });

export const validateResetToken = (
  userId: string,
  token: string,
): Promise<User> =>
  request({
    url: `/forgot-password/${userId}/${token}`,
    method: "GET",
  });

export const resetPassword = (
  userId: string,
  token: string,
  data: { password: string; passwordConfirm: string },
): Promise<User> =>
  request({
    url: `/forgot-password/${userId}/${token}`,
    method: "POST",
    data,
  });
