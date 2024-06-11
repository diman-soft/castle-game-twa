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
    loaderUrl: "/build/build.loader.js",
    dataUrl: "/build/build.data.br",
    frameworkUrl: "/build/build.framework.js.br",
    codeUrl: "/build/build.wasm.br",
  });

  return (
    <div title="Jetton" className="h-dvh aspect-[10/16]">
      {unityProvider && (
        <Unity
          style={{width: "100%", height: "100%", aspectRatio: "4/3"}}
          unityProvider={unityProvider}
        />
      )}
    </div>
  );
}
