/// <reference types="vite/client" />
interface Window {
  Telegram;
  saveGameData: (data: string) => void;
  ShowAd: (data: string) => void;
}

interface Telegram {
  WebApp: {
    initData: string;
    initDataUnsafe: object;
    version: string;
    platform: string;
    colorScheme: "light" | "dark";
    themeParams: object;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isExpanded: boolean;
    backButton: {
      isVisible: boolean;
      show: () => void;
      hide: () => void;
      onClick: (callback: () => void) => void;
    };
    MainButton: {
      text: string;
      color: string;
      textColor: string;
      isVisible: boolean;
      isActive: boolean;
      show: () => void;
      hide: () => void;
      enable: () => void;
      disable: () => void;
      setParams: (params: {
        text?: string;
        color?: string;
        textColor?: string;
      }) => void;
    };
    HapticFeedback: {
      impactOccurred: (style: "light" | "medium" | "heavy") => void;
      notificationOccurred: (type: "error" | "success" | "warning") => void;
      selectionChanged: () => void;
    };
    openInvoice: (url: string) => void;
    close: () => void;
    expand: () => void;
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
  };
}
