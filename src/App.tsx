import { useGameContext } from "./components/GameServerContext";
import { Player } from "./components/Player";
import { PlayerControls } from "./components/PlayerControls";

function App() {
  const context = useGameContext();

  // context.updateVehicle(1, "stopForwards");

  return (
    <PlayerControls
      vehicleId={0}
      forwardsKey={"w"}
      backwardsKey={"s"}
      leftKey={"a"}
      rightKey={"d"}
    >
      <Player p={context.currentVehicles[0]} viewBox={100} />
    </PlayerControls>
  );
}

export default App;
