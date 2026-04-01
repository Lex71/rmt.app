import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

/**
 * Creates and configures the Axios instance
 * Uses IIFE pattern to ensure single instance
 */
export const axiosClient: AxiosInstance = (() => {
  console.log("#####------ INIT axiosClient ------#####");
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds
    withCredentials: true,
  });
})();

export const request = async (options: AxiosRequestConfig<unknown>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (response: { data: any }) => {
    console.log("##### REQUEST success", response?.data.data);
    return response?.data.data;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: { response: { data: any } }) => {
    console.log("##### REQUEST error", error);
    // return Promise.reject(error.response?.data);
    return Promise.reject(error);
  };

  return axiosClient(options).then(onSuccess).catch(onError);
};

export default axiosClient;
