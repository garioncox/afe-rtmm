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
  currentVehicle: IPlayer;
  updateVehicle: (id: number, vehicleAction: vehicleAction) => void;
}

export const gameContext = createContext<IGameServerContext>({
  currentVehicle: {
    id: 0,
    x: 0,
    y: 0,
    rotation: 0,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.NONE,
  },
  updateVehicle: (id: number, vehicleAction: string) => {},
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
  const [currentVehicle, setCurrentVehicle] = useState<IPlayer>({
    id: 0,
    x: 0,
    y: 0,
    rotation: 0,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.NONE,
  });

  const updateVehicle = (id: number, vehicleAction: vehicleAction) => {
    const newVehicle = { ...currentVehicle };

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

    setCurrentVehicle(newVehicle);
  };

  useEffect(() => {
    console.log(currentVehicle);
    const move = () => {
      setCurrentVehicle((prevVehicle) => {
        const movedVehicle = moveVehicle(prevVehicle);
        return movedVehicle;
      });
    };

    setTimeout(() => move(), 1000);
  }, [currentVehicle]);

  return (
    <gameContext.Provider value={{ currentVehicle, updateVehicle }}>
      {children}
    </gameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(gameContext);
};
