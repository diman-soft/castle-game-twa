import {BASE_URL} from "../configs/config";
import {SaveData, useProfileStore} from "../store/profileStore";
import {useAuthStore} from "../store/authStore";
import {useTgAuth} from "./useTgAuth";
import axiosInstance from "../services/axios";

export function useGameData() {
  const access_token = useAuthStore((state) => state.access_token);
  const {setProfileData, setSaveData} = useProfileStore((state) => state);

  async function loadGameData() {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const {data} = await axiosInstance.get("v1/users/me", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });
        setProfileData(data);
      }
    } catch (error: any) {
      // if (error.response && error.response!.status === 400) {
      //   await loginWithTelegram();
      //   loadGameData();
      // }
      console.error("Unable to Get Game Data: " + error);
    }
  }

  async function saveGameData(saveData: SaveData) {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        await axiosInstance.post(
          "v1/users/save-game",
          {...saveData},
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );

        setSaveData(saveData);
      }
    } catch (error: any) {
      // if (error.response && error.response!.status === 401) {
      //   await loginWithTelegram();
      //   loadGameData();
      // }
      console.error("Unable to Get Game Data: " + error);
    }
  }

  return {loadGameData, saveGameData};
}
