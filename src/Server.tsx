import { useGameContext } from "./components/GameServerContext";
import { Player } from "./components/Player";
import { PlayerControls } from "./components/PlayerControls";

export const Server = () => {
  const gameContext = useGameContext();

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
