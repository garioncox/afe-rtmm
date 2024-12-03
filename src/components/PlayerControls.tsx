import { ReactNode, useEffect } from "react";
import { useGameClientContext } from "./GameClientContext";

export const PlayerControls = ({
  children,
  forwardsKey,
  backwardsKey,
  leftKey,
  rightKey,
  vehicleId,
}: {
  children: ReactNode;
  forwardsKey: string;
  backwardsKey: string;
  leftKey: string;
  rightKey: string;
  vehicleId: number;
}) => {
  const context = useGameClientContext();

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case forwardsKey: {
          context.updateVehicle(vehicleId, "moveForward");
          break;
        }
        case leftKey: {
          context.updateVehicle(vehicleId, "turnLeft");
          break;
        }
        case backwardsKey: {
          context.updateVehicle(vehicleId, "moveBackward");
          break;
        }
        case rightKey: {
          context.updateVehicle(vehicleId, "turnRight");
          break;
        }
        default: {
          break;
        }
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case forwardsKey: {
          context.updateVehicle(vehicleId, "stopForwards");
          break;
        }
        case leftKey: {
          context.updateVehicle(vehicleId, "stopLeft");
          break;
        }
        case backwardsKey: {
          context.updateVehicle(vehicleId, "stopBackwards");
          break;
        }
        case rightKey: {
          context.updateVehicle(vehicleId, "stopRight");
          break;
        }
        default: {
          break;
        }
      }
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
