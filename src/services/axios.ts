import axios from "axios";
import {BASE_URL} from "../configs/config";
import {useAuthStore} from "../store/authStore";
import {useTgAuth} from "../hooks/useTgAuth";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (window.Telegram && window.Telegram.WebApp) {
          const {id, first_name, last_name, username} =
            window.Telegram.WebApp.initDataUnsafe.user;

          const {data} = await axiosInstance.post("v1/auth/login", {
            tgChatId: id.toString(),
            tgUsername: username,
            platform: window.Telegram.WebApp.platform,
            tgFirstName: first_name,
            tgLastName: last_name,
          });

          useAuthStore.getState().setAccessToken(data.access_token);
        }

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (err: any) {
        //window.alert(err.message);
        // Handle the error if refreshing the token fails
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
