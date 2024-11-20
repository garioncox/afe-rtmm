import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GameServerContextProvider } from "./components/GameServerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameServerContextProvider>
      <App />
    </GameServerContextProvider>
  </StrictMode>
);
