import {BASE_URL} from "../configs/config";
import axiosInstance from "../services/axios";
import {useAuthStore} from "../store/authStore";

export function useTgAuth() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  async function loginWithTelegram() {
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
        setAccessToken(data.access_token);
      }
    } catch (error: any) {
      console.error("Auth Error");
    }
  }

  return {loginWithTelegram};
}
