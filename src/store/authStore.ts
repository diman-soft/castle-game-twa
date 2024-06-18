import {create} from "zustand";
import {persist} from "zustand/middleware";
type AccessToken = {
  access_token: string;

  setAccessToken: (accessToken: string) => void;
};

export const useAuthStore = create<AccessToken>()(
  persist(
    (set) => ({
      access_token: "",

      setAccessToken: (access_token: string) => {
        set({access_token});
      },
    }),
    {
      name: "castle_access_token",
      // partialize: ({access_token}) => ({
      //   access_token,
      // }),
    }
  )
);
