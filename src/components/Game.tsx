import {useTonConnect} from "../hooks/useTonConnect";
import {useFaucetJettonContract} from "../hooks/useFaucetJettonContract";
import {Card, FlexBoxCol, FlexBoxRow, Button, Ellipsis} from "./styled/styled";
import {Unity, useUnityContext} from "react-unity-webgl";
import {useGameData} from "../hooks/useGameData";
import {useEffect} from "react";
import {useProfileStore} from "../store/profileStore";
import Character from "../assets/Character.png";
export function Game() {
  // const {connected} = useTonConnect();
  // const {mint, jettonWalletAddress, balance} = useFaucetJettonContract();

  const profileData = useProfileStore();
  const {saveGameData} = useGameData();
  const {unityProvider, isLoaded, loadingProgression, sendMessage} =
    useUnityContext({
      loaderUrl: "build/build.loader.js",
      dataUrl: "build/build.data.unityweb",
      frameworkUrl: "build/build.framework.js.unityweb",
      codeUrl: "build/build.wasm.unityweb",
    });

  useEffect(() => {
    async function loadGame() {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(null);
        }, 3000)
      );
      sendMessage("Data", "LoadGameData", JSON.stringify(profileData.profile));

      window.saveGameData = (data: string) => {
        saveGameData(JSON.parse(data));
      };
    }

    if (isLoaded) {
      loadGame();
    }
  }, [isLoaded, profileData, profileData.profile]);

  return (
    <div title="Game" className="h-dvh">
      {unityProvider && (
        <Unity
          style={{width: "100%", height: "100%"}}
          unityProvider={unityProvider}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#424A5B] flex justify-center items-center">
          <div className="text-center text-white font-main font-bold text-2xl">
            <img className="pl-5" src={Character}></img>
            <div className="pt-5 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]">
              Loading {Math.round(loadingProgression * 100)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}