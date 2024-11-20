import { KeyboardEvent, ReactNode, useEffect, useState } from "react";
import { vehicleAction } from "./GameServerContext";

export const PlayerControls = ({ children }: { children: ReactNode }) => {
  const [movementFlag, setMovementFlag] = useState<vehicleAction>();

  //   useEffect(() => {
  //     console.log(keyInput);
  //   }, [keyInput]);

  const keyboardInput = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key);
  };

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      console.log(e.key);
    });
  }, []);
};
