import { useEffect } from "react";
import { useGameContext } from "./components/GameServerContext";
import { TurnDirection, MoveDirection, Player } from "./components/Player";
import { PlayerControls } from "./components/PlayerControls";

export const Server = () => {
  const gameContext = useGameContext();

  useEffect(() => {
    if (gameContext.currentVehicles.length === 1) {
      gameContext.addVehicle({
        id: 1,
        x: 100,
        y: 100,
        rotation: 0,
        turnDirection: TurnDirection.NONE,
        moveDirection: MoveDirection.NONE,
      });
    }
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
        <Player p={gameContext.currentVehicles[0]} viewBox={100} />
      </PlayerControls>

      {gameContext.currentVehicles.length > 1 && (
        <PlayerControls
          vehicleId={1}
          forwardsKey={"i"}
          backwardsKey={"k"}
          leftKey={"j"}
          rightKey={"l"}
        >
          <Player p={gameContext.currentVehicles[1]} viewBox={100} />
        </PlayerControls>
      )}
    </>
  );
};
