import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPlayer, MoveDirection, TurnDegrees, TurnDirection } from "./Player";
import { IGameContext, vehicleAction } from "./GameServerContext";

export const gameClientContext = createContext<IGameContext>({
  currentVehicles: [],
  updateVehicle: (id: number, vehicleAction: vehicleAction) => {},
  addVehicle: (player: IPlayer) => {},
});

export const GameClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentVehicles, setCurrentVehicles] = useState<IPlayer[]>([]);

  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  const addVehicle = (vehicle: IPlayer) => {
    if (socket && socket.readyState == socket.OPEN) {
      console.log("Adding vehicle");
      socket.send(
        JSON.stringify({
          eventType: "updateVehicle",
          vehicle: vehicle,
        })
      );
    }
  };

  const updateVehicle = (id: number, vehicleAction: string) => {
    if (socket && socket.readyState == socket.OPEN) {
      console.log("Updating vehicle");
      socket.send(
        JSON.stringify({
          eventType: "updateVehicle",
          vehicleId: id,
          vehicleAction: vehicleAction,
        })
      );
    }
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
        setCurrentVehicles(vehicles);
      }
    });
  }, []);

  useEffect(() => {
    console.log("here");
    addVehicle({
      id: 1,
      x: 100,
      y: 100,
      rotation: 0,
      turnDirection: TurnDirection.NONE,
      moveDirection: MoveDirection.NONE,
    });
  }, [socket?.readyState]);

  return (
    <gameClientContext.Provider
      value={{ currentVehicles, updateVehicle, addVehicle }}
    >
      {children}
    </gameClientContext.Provider>
  );
};

export const useGameClientContext = () => {
  return useContext(gameClientContext);
};
