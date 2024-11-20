import { useGameContext } from "./components/GameServerContext";

function App() {
  const context = useGameContext();

  context.updateVehicle(1, "stopForwards");

  return context.currentVehicle ? "Some" : "None";
}

export default App;
