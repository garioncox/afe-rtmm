import { useEffect, useState } from "react";
import { useGameContext } from "./components/GameServerContext";
import { MoveDirection, Player, TurnDirection } from "./components/Player";
import { PlayerControls } from "./components/PlayerControls";

function App() {
  const context = useGameContext();
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  // context.updateVehicle(1, "stopForwards");
  useEffect(() => {
    context.addVehicle({
      id: 1,
      x: 100,
      y: 100,
      rotation: 0,
      turnDirection: TurnDirection.NONE,
      moveDirection: MoveDirection.NONE,
    });
  }, []);

  return (
    <>
      <PlayerControls
        vehicleId={0}
        forwardsKey={"w"}
        backwardsKey={"s"}
        leftKey={"a"}
        rightKey={"d"}
      >
        <Player p={context.currentVehicles[0]} viewBox={100} />
      </PlayerControls>

      {context.currentVehicles.length > 1 && (
        <PlayerControls
          vehicleId={1}
          forwardsKey={"i"}
          backwardsKey={"k"}
          leftKey={"j"}
          rightKey={"l"}
        >
          <Player p={context.currentVehicles[1]} viewBox={100} />
        </PlayerControls>
      )}
    </>
  );
}

export default App;
