import { refresh as apiRefresh } from "@/services/urls/auth";

const useRefreshToken = () => {
  const refresh = async (): Promise<string | undefined> => {
    try {
      const response = await apiRefresh();
      const accessToken = response.accessToken as string;
      return accessToken;
    } catch (error) {
      console.error("Refresh token error:", error);
      Promise.reject(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
