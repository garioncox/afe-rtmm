import { ReactNode, useEffect, useState } from "react";
import { useGameContext, vehicleAction } from "./GameServerContext";

export const PlayerControls = ({ children }: { children: ReactNode }) => {
  const context = useGameContext();

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w": {
          context.updateVehicle(1, "moveForward");
          break;
        }
        case "a": {
          context.updateVehicle(1, "turnLeft");
          break;
        }
        case "s": {
          context.updateVehicle(1, "moveBackward");
          break;
        }
        case "d": {
          context.updateVehicle(1, "turnRight");
          break;
        }
        default: {
          break;
        }
      }
      // console.log("Key Down:", e.key);
    };

    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case "w": {
          context.updateVehicle(1, "stopForwards");
          break;
        }
        case "a": {
          context.updateVehicle(1, "stopLeft");
          break;
        }
        case "s": {
          context.updateVehicle(1, "stopBackwards");
          break;
        }
        case "d": {
          context.updateVehicle(1, "stopRight");
          break;
        }
        default: {
          break;
        }
      }
      // console.log("Key Up:", e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return children;
};
