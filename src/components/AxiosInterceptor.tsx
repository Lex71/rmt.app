import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { useAuth } from "../hooks/useAuth";
import { axiosClient } from "../services/axiosClient";
import { refresh } from "../services/urls/auth";

// Add custom _retry property to InternalAxiosRequestConfig
declare module "axios" {
  interface InternalAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
  }
}

interface ErrorResponse {
  message: string;
  code: string;
}

class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const AxiosInterceptor = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { authToken, setAuthToken, setIsAuthenticated, setUser } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (authToken && config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (error: Error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosClient.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,

      async (error: AxiosError<ErrorResponse>): Promise<never> => {
        const originalRequest:
          | (AxiosRequestConfig<unknown> & { _retry?: boolean })
          | undefined = error.config;
        // Access Token was expired
        if (
          error.response &&
          error.response.status === 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          // Handle 401 Unauthorized errors
          originalRequest._retry = true;

          try {
            // Attempt to refresh token
            const data = await refresh();
            setUser(data.user);
            setAuthToken(data.accessToken);
            setIsAuthenticated(true);

            // Update authorization header
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            }
            axiosClient.defaults.headers.common["Authorization"] =
              `Bearer ${data.accessToken}`;

            // Retry original request
            return axiosClient(originalRequest);
          } catch (refreshError) {
            console.log("refreshError: ", refreshError);
            // Handle refresh token failure
            navigate("/auth/login");
            // return Promise.reject(refreshError);
          }
        }
        // const apiError: ApiError = {
        //   // message: error.response?.statusText || "An unexpected error occurred",
        //   message:
        //     error?.response?.data.message || "An unexpected error occurred",
        //   code: error.code || "UNKNOWN_ERROR",
        //   status: error.response?.status || 500,
        // };

        // ApiError is defined in global namespace (src/types/global.d.ts)
        const apiError = new ApiError(
          error?.response?.data.message || "An unexpected error occurred",
          error.code || "UNKNOWN_ERROR",
          error.response?.status || 500,
        );
        // Any other error
        return Promise.reject(apiError);
      },
    );

    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
      axiosClient.interceptors.response.eject(responseIntercept);
    };
  });

  return children;
};

export default AxiosInterceptor;
