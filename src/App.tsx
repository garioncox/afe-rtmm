import { useState } from "react";
import { GameServerContextProvider } from "./components/GameServerContext";
import { GameClientContextProvider } from "./components/GameClientContext";
import { Server } from "./Server";
import { Client } from "./Client";

function App() {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [isClient, setIsClient] = useState<boolean | undefined>(undefined);

  if (isClient == undefined) {
    return (
      <>
        <p>What are you?</p>
        <button onClick={() => setIsClient(true)}>Client</button>
        <button onClick={() => setIsClient(false)}>Server</button>
      </>
    );
  }

  if (!isClient) {
    return (
      <GameServerContextProvider>
        <Server />
      </GameServerContextProvider>
    );
  }

  return (
    <GameClientContextProvider>
      <Client />
    </GameClientContextProvider>
  );
}

export default App;
