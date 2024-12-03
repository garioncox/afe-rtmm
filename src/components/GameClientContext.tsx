import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPlayer, MoveDirection, TurnDegrees, TurnDirection } from "./Player";
import { moveVehicle } from "./vehicleUtils";

export interface IGameClientContext {
  currentVehicles: IPlayer[];
  addVehicle: (player: IPlayer) => void;
}

export const gameClientContext = createContext<IGameClientContext>({
  currentVehicles: [],
  addVehicle: (player: IPlayer) => {},
});

export const GameClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentVehicles, setCurrentVehicles] = useState<IPlayer[]>([
    {
      id: 0,
      x: 0,
      y: 0,
      rotation: 0,
      turnDirection: TurnDirection.NONE,
      moveDirection: MoveDirection.NONE,
    },
  ]);

  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  const addVehicle = (vehicle: IPlayer) => {
    vehicle.id = currentVehicles.length;
    setCurrentVehicles((previousVehicles) => [...previousVehicles, vehicle]);
  };

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5054/ws");
    setSocket(newSocket);

    // Connection opened
    newSocket.addEventListener("open", (event) => {
      console.log("Connected to server");
    });

    // Listen for messages
    newSocket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data.eventType === "allVehicles") {
        const vehicles = data.vehicles;
        console.log("Message from server: ", vehicles);
      }
    });
  }, []);

  return (
    <gameClientContext.Provider value={{ currentVehicles, addVehicle }}>
      {children}
    </gameClientContext.Provider>
  );
};

export const useGameClientContext = () => {
  return useContext(gameClientContext);
};
