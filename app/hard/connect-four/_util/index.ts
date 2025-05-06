"use client";

export const getInitBoardState = () =>
  Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => null));

export const getInitPointersState = () => Array.from({ length: 6 }, () => 0);

export const checkIfDraw = (dropPointersState: number[]) =>
  dropPointersState.every((val) => val === 6);

export const checkIfWinner = (
  playerTurnState: boolean,
  r: number,
  c: number,
  newBoardState: Array<Array<null | number>>
) => {
  const newColor = playerTurnState ? 1 : 2;
  const directionSets = [
    [
      [-1, 0],
      [1, 0],
    ],
    [
      [0, -1],
      [0, 1],
    ],
    [
      [-1, 1],
      [1, -1],
    ],
    [
      [1, 1],
      [-1, -1],
    ],
  ];

  const directionValues = Array.from({ length: 4 }, () => 1);

  const inBounds = (p: number[]) => p[0] >= 0 && p[1] < newBoardState.length;
  const sameColor = (p: number[]) => newBoardState[p[0]][p[1]] === newColor;

  for (let i = 0; i < directionSets.length; ++i) {
    for (const d of directionSets[i]) {
      const currPointer = [r + d[0], c + d[1]];

      while (inBounds(currPointer) && sameColor(currPointer)) {
        directionValues[i]++;
        currPointer[0] += d[0];
        currPointer[1] += d[1];
      }
    }
  }
  return directionValues.some((v) => v === 4);
};
