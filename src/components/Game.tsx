import {useTonConnect} from "../hooks/useTonConnect";
import {useFaucetJettonContract} from "../hooks/useFaucetJettonContract";
import {Card, FlexBoxCol, FlexBoxRow, Button, Ellipsis} from "./styled/styled";
import {Unity, useUnityContext} from "react-unity-webgl";
import {useGameData} from "../hooks/useGameData";
import {useEffect, useState} from "react";
import {useProfileStore} from "../store/profileStore";
import Character from "../assets/Character.png";
export function Game() {
  // const {connected} = useTonConnect();
  // const {mint, jettonWalletAddress, balance} = useFaucetJettonContract();

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 2,
    height: window.innerHeight,
  });
  // window.alert(scale);
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
      profileData.setSaveData({
        gem: profileData.profile?.gem || 0,
        score: profileData.profile?.score || 0,
        saveData:
          profileData.profile?.saveData == null
            ? ""
            : profileData.profile?.saveData,
      });
      sendMessage("Data", "LoadGameData", JSON.stringify(profileData.profile));

      window.saveGameData = (data: string) => {
        saveGameData(JSON.parse(data));
      };

      window.ShowAd = (key: string) => {
        //Show a Ad video
        interface ShowPromiseResult {
          done: boolean; // true if user watch till the end, otherwise false
          description: string; // event description
          state: "load" | "render" | "playing" | "destroy"; // banner state
          error: boolean; // true if event was emitted due to error, otherwise false
        }
        const AdController = (window as any).Adsgram.init({blockId: key});
        AdController.show()
          .then((result: ShowPromiseResult) => {
            // user watch ad till the end
            // your code to reward user
            sendMessage("Ads", "Result", JSON.stringify(result));
          })
          .catch((result: ShowPromiseResult) => {
            // user skipped video or get error during playing ad
            // do nothing or whatever you want
            sendMessage("Ads", "Result", JSON.stringify(result));
          });
      };
    }
    // const resizeGame = () => {
    //   const width = window.innerWidth * 2;
    //   const height = window.innerHeight * 2;
    //   setDimensions({width, height});
    // };
    // window.addEventListener("resize", resizeGame);
    // resizeGame();

    if (isLoaded) {
      loadGame();
    }

    // return () => {
    //   window.removeEventListener("resize", resizeGame);
    // };
  }, [isLoaded, profileData, profileData.profile]);

  return (
    <div title="Game" className="h-dvh">
      {unityProvider && (
        <Unity
          style={{
            width: "100%",
            height: "100%",
          }}
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
