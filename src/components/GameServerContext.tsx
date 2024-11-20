import { createContext, ReactNode, useContext, useState } from "react";
import { IPlayer, MoveDirection, TurnDirection } from "./Player";

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
    // Update vehicle
  };

  return (
    <gameContext.Provider value={{ currentVehicle, updateVehicle }}>
      {children}
    </gameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(gameContext);
};
