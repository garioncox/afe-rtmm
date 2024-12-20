import { expect, test } from "vitest";
import {
  IPlayer,
  MoveDirection,
  Player,
  TurnDirection,
  TurnDegrees,
  MoveAmount,
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

  const expected: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: -TurnDegrees,
    turnDirection: TurnDirection.LEFT,
    moveDirection: MoveDirection.NONE,
  };

  expect(moveVehicle(player)).toEqual(expected);
});

test("A user can turn the vehicle right", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 0,
    turnDirection: TurnDirection.RIGHT,
    moveDirection: MoveDirection.NONE,
  };

  const expected: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: TurnDegrees,
    turnDirection: TurnDirection.RIGHT,
    moveDirection: MoveDirection.NONE,
  };

  expect(moveVehicle(player)).toEqual(expected);
});

test("A user can turn the vehicle not turn if they dont want to", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 0,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.NONE,
  };

  const expected: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 0,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.NONE,
  };

  expect(moveVehicle(player)).toEqual(expected);
});

test("A user can accelerate directly on the x axis", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 90,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  const expected: IPlayer = {
    id: 0,
    x: MoveAmount,
    y: 0,
    rotation: 90,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  expect(moveVehicle(player)).toEqual(expected);
});

test("A user can accelerate directly on the y axis", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 0,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  const expected: IPlayer = {
    id: 0,
    x: 0,
    y: MoveAmount,
    rotation: 0,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  expect(moveVehicle(player)).toEqual(expected);
});

test("A user can move on a 45 degree angle", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 45,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  const expected: IPlayer = {
    id: 0,
    x: 0.71,
    y: 0.71,
    rotation: 45,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  expect(moveVehicle(player)).toEqual(expected);
});
test("A user can move on a 225 degree angle", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: 225,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  const expected: IPlayer = {
    id: 0,
    x: -0.71 * MoveAmount,
    y: -0.71 * MoveAmount,
    rotation: 225,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  expect(moveVehicle(player)).toEqual(expected);
});
test("A user can move on a -45 degree angle", () => {
  const player: IPlayer = {
    id: 0,
    x: 0,
    y: 0,
    rotation: -45,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  const expected: IPlayer = {
    id: 0,
    x: -0.71 * MoveAmount,
    y: 0.71 * MoveAmount,
    rotation: -45,
    turnDirection: TurnDirection.NONE,
    moveDirection: MoveDirection.FORWARDS,
  };

  expect(moveVehicle(player)).toEqual(expected);
});
