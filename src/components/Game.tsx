import {useTonConnect} from "../hooks/useTonConnect";
import {useFaucetJettonContract} from "../hooks/useFaucetJettonContract";
import {Card, FlexBoxCol, FlexBoxRow, Button, Ellipsis} from "./styled/styled";
import {Unity, useUnityContext} from "react-unity-webgl";

export function Game() {
  const {connected} = useTonConnect();
  const {mint, jettonWalletAddress, balance} = useFaucetJettonContract();
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    unload,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: "build/build.loader.js",
    dataUrl: "build/build.data.unityweb",
    frameworkUrl: "build/build.framework.js.unityweb",
    codeUrl: "build/build.wasm.unityweb",
  });

  return (
    <div title="Game" className="h-dvh aspect-[9/16]">
      {unityProvider && (
        <Unity
          style={{width: "100%", height: "100%"}}
          unityProvider={unityProvider}
        />
      )}
    </div>
  );
}
