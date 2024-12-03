import { PlayerIcon } from "./PlayerIcon";

export const TurnDegrees = 2;
export const MoveAmount = 2;

export type IPlayer = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  turnDirection: TurnDirection;
  moveDirection: MoveDirection;
};

export enum TurnDirection {
  "LEFT",
  "RIGHT",
  "NONE",
}

export enum MoveDirection {
  "BACKWARDS",
  "FORWARDS",
  "NONE",
}

export function Player({
  p,
  viewBox,
}: {
  p: IPlayer | undefined;
  viewBox: number;
}) {
  if (!p) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "fixed",
        rotate: `${p.rotation + 90}deg`,
        fill: "#999999",
        width: `${viewBox}px`,
        height: `${viewBox}px`,
        top: `${p.x}px`,
        left: `${p.y}px`,
      }}
    >
      <PlayerIcon />
    </div>
  );
}
