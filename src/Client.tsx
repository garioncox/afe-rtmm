import { useEffect } from "react";
import { useGameClientContext } from "./components/GameClientContext";
import { MoveDirection, Player, TurnDirection } from "./components/Player";
import { PlayerControls } from "./components/PlayerControls";

export const Client = () => {
  const playerContext = useGameClientContext();

  return (
    <>
      <PlayerControls
        vehicleId={0}
        forwardsKey={"w"}
        backwardsKey={"s"}
        leftKey={"a"}
        rightKey={"d"}
      >
        <Player p={playerContext.currentVehicles[0]} viewBox={100} />
      </PlayerControls>

      {playerContext.currentVehicles.length > 1 && (
        <PlayerControls
          vehicleId={1}
          forwardsKey={"i"}
          backwardsKey={"k"}
          leftKey={"j"}
          rightKey={"l"}
        >
          <Player p={playerContext.currentVehicles[1]} viewBox={100} />
        </PlayerControls>
      )}
    </>
  );
};
