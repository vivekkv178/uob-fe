import axiosInstance from "./axiosInstance"; // Import the Axios instance
import { AxiosRequestConfig } from "axios";
import { useAppSelector } from "./reduxHooks";
import { getCookie } from "cookies-next";
import { COMMON_CONSTANTS } from "./constants";

// Define the useApi custom hook
const useApi = () => {
  const authState = useAppSelector((state) => state.auth);

  const callApi = async (config: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance({
        method: config.method,
        url: config.url,
        data: config?.data,
        headers: {
          Authorization: `Bearer ${getCookie(COMMON_CONSTANTS.ACCESS_TOKEN)}`,
        },
      });
      return response?.data;
    } catch (error: any) {
      // Catch any type of error
      throw error;
    } finally {
    }
  };

  return { callApi };
};

export default useApi;
