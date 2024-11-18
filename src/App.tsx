import { Player } from "./components/Player";

function App() {
  return (
    <>
      <Player
        p={{
          id: 0,
          x: 0,
          y: 0,
          rotation: 0,
          moveDirection: "",
          turnDirection: "",
        }}
        viewBox={50}
      />
    </>
  );
}

export default App;
