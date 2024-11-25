import {
  IPlayer,
  MoveAmount,
  MoveDirection,
  TurnDegrees,
  TurnDirection,
} from "./Player";

export function moveVehicle(vehicle: IPlayer) {
  let degrees = 0;
  if (vehicle.turnDirection === TurnDirection.LEFT) {
    degrees -= TurnDegrees;
  }
  if (vehicle.turnDirection === TurnDirection.RIGHT) {
    degrees += TurnDegrees;
  }

  let moveDistance = 0;
  if (vehicle.moveDirection === MoveDirection.FORWARDS) {
    moveDistance += MoveAmount;
  }
  if (vehicle.moveDirection === MoveDirection.BACKWARDS) {
    moveDistance -= MoveAmount;
  }

  let yMove = Math.cos(degrees_to_radians(vehicle.rotation)) * moveDistance;
  let xMove = Math.sin(degrees_to_radians(vehicle.rotation)) * moveDistance;

  if (Math.abs(xMove) < 0.01) {
    xMove = 0;
  }
  if (Math.abs(yMove) < 0.01) {
    yMove = 0;
  }

  xMove = Math.round(xMove * 100) / 100;
  yMove = Math.round(yMove * 100) / 100;

  let newRotation = vehicle.rotation + degrees;
  if (newRotation < 0) {
    newRotation += 360;
  }
  if (newRotation >= 360) {
    newRotation -= 360;
  }

  const newVehicle: IPlayer = {
    id: vehicle.id,
    x: vehicle.x + xMove,
    y: vehicle.y + yMove,
    rotation: vehicle.rotation + degrees,
    turnDirection: vehicle.turnDirection,
    moveDirection: vehicle.moveDirection,
  };

  return newVehicle;
}

function degrees_to_radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
