import "./App.css";
import {TonConnectButton} from "@tonconnect/ui-react";
import styled from "styled-components";
import {FlexBoxCol, FlexBoxRow} from "./components/styled/styled";
import {useTonConnect} from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import {Game} from "./components/Game";
import {useEffect} from "react";
import {useTgAuth} from "./hooks/useTgAuth";
import {ifError} from "assert";
import {useAuthStore} from "./store/authStore";
import {useGameData} from "./hooks/useGameData";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  // const {network} = useTonConnect();
  const {loginWithTelegram} = useTgAuth();
  const {loadGameData} = useGameData();
  const {access_token} = useAuthStore();

  useEffect(() => {
    // Check if Telegram Web App is available
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        // Expand the web app to full screen
        tg.expand();

        // Set the header color to a matching background color
        const backgroundColor = "#424A5B"; // Replace with your actual background color
        tg.setHeaderColor(backgroundColor);

        //Get Confirm on Exit (Prevent Sudden Exit)
        tg.enableClosingConfirmation();

        return () => {
          // Clean up the event listener when component unmounts
          //tg.offEvent("backButtonClicked");
        };
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    async function login() {
      if (!access_token || access_token.length == 0) await loginWithTelegram();
      await loadGameData();
    }

    login();
  }, [access_token]);

  return <Game />;
}

export default App;
