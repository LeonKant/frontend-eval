"use client";

import { useEffect, useState } from "react";
import "../_css/memory-game.css";
import { createBoard } from "../_utils";

interface GameTileT {
  num: number;
  clicked: boolean;
  onClick?: () => void;
}
const GameTile = ({ num, clicked = false, onClick }: GameTileT) => (
  <div onClick={onClick} className={`board-tile`}>
    {clicked && num}
  </div>
);

export default function MemoryGame() {
  const [boardState, setBoardState] = useState<number[]>([]);
  const [clickedState, setClickedState] = useState<Set<number>>(new Set());
  const [removedState, setRemovedState] = useState<Set<number>>(new Set());
  const [timerState, setTimerState] = useState<boolean>(false);
  const [gameoverState, setGameoverState] = useState<boolean>(true);

  const updateRemovedState = (values: number[]) => {
    setRemovedState((prev) => new Set([...prev.values(), ...values]));
  };
  const updateClickedState = (ind: number) => {
    setClickedState((prev) => {
      const copy = new Set([...prev.values()]);

      if (copy.has(ind)) {
        copy.delete(ind);
      } else {
        copy.add(ind);
      }

      return copy;
    });
  };
  useEffect(() => {
    if (gameoverState) return;

    const board = createBoard();
    setBoardState(board);
    setClickedState(new Set());
    setRemovedState(new Set());
  }, [gameoverState]);

  useEffect(() => {
    if (clickedState.size < 2) return;
    const inds = [...clickedState.values()];
    setTimerState(true);

    setTimeout(() => {
      if (boardState[inds[0]] === boardState[inds[1]]) {
        updateRemovedState(inds);
      }
      setClickedState(new Set());
      setTimerState(false);
    }, 3000);
  }, [clickedState]);

  return (
    <>
      {!gameoverState ? (
        <div className={`board-grid`}>
          {boardState.map((n, ind) =>
            !removedState.has(ind) ? (
              <GameTile
                key={ind}
                num={n}
                clicked={clickedState.has(ind)}
                onClick={() => {
                  if (timerState) return;
                  updateClickedState(ind);
                }}
              />
            ) : (
              <div key={ind} />
            )
          )}
        </div>
      ) : (
        <div className={`play-again-cont`}>
          <button
            onClick={() => {
              setGameoverState(false);
            }}
            className={`play-again`}
          >
            Play Again
          </button>
        </div>
      )}
    </>
  );
}
