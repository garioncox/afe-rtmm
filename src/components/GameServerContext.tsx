import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPlayer, MoveDirection, TurnDegrees, TurnDirection } from "./Player";
import { moveVehicle } from "./vehicleUtils";

export interface IGameServerContext {
  currentVehicles: IPlayer[];
  updateVehicle: (id: number, vehicleAction: vehicleAction) => void;
  addVehicle: (player: IPlayer) => void;
}

export const gameContext = createContext<IGameServerContext>({
  currentVehicles: [
    {
      id: 0,
      x: 0,
      y: 0,
      rotation: 0,
      turnDirection: TurnDirection.NONE,
      moveDirection: MoveDirection.NONE,
    },
  ],
  updateVehicle: (id: number, vehicleAction: string) => {},
  addVehicle: (player: IPlayer) => {},
});

export type vehicleAction =
  | "moveForward" // 'w' pressed
  | "moveBackward" // 's' pressed
  | "turnLeft" // 'a' pressed
  | "turnRight" // 'd' pressed
  | "stopForwards" // when user lets go of 'w' key
  | "stopBackwards" // when user lets go of 's' key
  | "stopLeft" // when user lets go of 'a' key
  | "stopRight";

export const GameServerContextProvider = ({
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

  const updateVehicle = (id: number, vehicleAction: vehicleAction) => {
    setCurrentVehicles((oldVehicles) => {
      const newVehicle = oldVehicles.find((v) => v.id === id)!;

      switch (vehicleAction) {
        case "moveForward": {
          newVehicle.moveDirection = MoveDirection.FORWARDS;
          break;
        }
        case "moveBackward": {
          newVehicle.moveDirection = MoveDirection.BACKWARDS;
          break;
        }
        case "turnLeft": {
          newVehicle.turnDirection = TurnDirection.LEFT;
          break;
        }
        case "turnRight": {
          newVehicle.turnDirection = TurnDirection.RIGHT;
          break;
        }
        case "stopForwards": {
          newVehicle.moveDirection = MoveDirection.NONE;
          break;
        }
        case "stopBackwards": {
          newVehicle.moveDirection = MoveDirection.NONE;
          break;
        }
        case "stopLeft": {
          newVehicle.turnDirection = TurnDirection.NONE;
          break;
        }
        case "stopRight": {
          newVehicle.turnDirection = TurnDirection.NONE;
          break;
        }
        default: {
          break;
        }
      }

      // oldVehicles[newVehicle.id]
      const sameVehicle = oldVehicles.filter((v) => v.id !== id);

      return [...sameVehicle, newVehicle];
    });
  };

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
      newSocket.send(JSON.stringify(currentVehicles));
    });

    // Listen for messages
    newSocket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });
  }, []);

  useEffect(() => {
    const move = () => {
      setCurrentVehicles((oldVehicles) => {
        return oldVehicles.map((v) => moveVehicle(v));
      });
    };

    const broadcastMessage = () => {
      if (socket) {
        socket.send(JSON.stringify(currentVehicles));
      }
    };

    const loop = () => {
      setTimeout(() => {
        move();
        broadcastMessage();
        loop();
      }, 1000 / 100);
    };

    loop();
  }, []);

  return (
    <gameContext.Provider
      value={{ currentVehicles, updateVehicle, addVehicle }}
    >
      {children}
    </gameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(gameContext);
};
