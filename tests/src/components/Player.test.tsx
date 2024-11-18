import { expect, test } from "vitest";
import {
  IPlayer,
  MoveDirection,
  Player,
  TurnDirection,
} from "../../../src/components/Player";
import { moveVehicle } from "../../../src/components/vehicleUtils";

test("A user can turn the vehicle left", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 0,
    turnDirection: TurnDirection.LEFT,
    moveDirection: MoveDirection.NONE,
  };

  expect(moveVehicle(player)).toBe();
});
test("A user can turn the vehicle right", () => {});
test("A user can turn the vehicle not turn if they dont want to", () => {});

test("A user can accelerate directly on the x axis", () => {});
test("A user can accelerate directly on the y axis", () => {});

test("A user can move on a 45 degree angle", () => {});
test("A user can move on a 225 degree angle", () => {});
test("A user can move on a -45 degree angle", () => {});
