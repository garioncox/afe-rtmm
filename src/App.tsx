import { useGameContext } from "./components/GameServerContext";
import { Player } from "./components/Player";
import { PlayerControls } from "./components/PlayerControls";

function App() {
  const context = useGameContext();

  // context.updateVehicle(1, "stopForwards");

  return (
    <PlayerControls>
      <Player p={context.currentVehicle} viewBox={100} />
    </PlayerControls>
  );
}

export default App;
