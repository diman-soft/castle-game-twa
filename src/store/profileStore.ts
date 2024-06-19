import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface SaveData {
  score: number;
  gem: number;
  saveData: string;
}

interface Profile extends SaveData {
  id: string;
  chatId: string;
  tgUsername: string;
  isPremium: boolean;
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileData {
  profile?: Profile;

  setProfileData: ({...profile}) => void;
  setSaveData: (data: SaveData) => void;
}

export const useProfileStore = create<ProfileData>()((set) => ({
  setProfileData(profile: any) {
    //set({...profile});
    set((state) => {
      state.profile = {
        ...profile,
      };
      return state;
    });
  },
  setSaveData(data) {
    set((state) => {
      state.profile = {
        ...state.profile!,
        ...data,
      };
      // window.alert(JSON.stringify(state.profile));
      return state;
    });
  },
}));
