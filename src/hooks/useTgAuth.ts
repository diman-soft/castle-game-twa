import axios from "axios";
import {BASE_URL} from "../configs/config";
import {useAuthStore} from "../store/authStore";

export function useTgAuth() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  async function loginWithTelegram() {
    try {
      const {id, first_name, last_name, username} =
        window.Telegram.WebApp.initDataUnsafe;
      if (window.Telegram && window.Telegram.WebApp) {
        const {data} = await axios.post(BASE_URL + "v1/auth/login", {
          tgChatId: id.toString(),
          tgUsername: username,
          platform: window.Telegram.WebApp.platform,
          tgFirstName: first_name,
          tgLastName: last_name,
        });
        setAccessToken(data.accessToken);
      }
    } catch (error) {
      window.alert("Unable to Authenticate: " + error);
    }
  }

  return {loginWithTelegram};
}
