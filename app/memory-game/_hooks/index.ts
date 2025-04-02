import { useEffect, useState } from "react";
import { createBoard } from "../_utils";

export default function useMemoryGame() {
  const [boardState, setBoardState] = useState<number[]>([]);
  const [clickedState, setClickedState] = useState<Set<number>>(new Set());
  const [removedState, setRemovedState] = useState<Set<number>>(new Set());
  const [timerState, setTimerState] = useState<boolean>(false);
  const [gameoverState, setGameoverState] = useState<boolean>(false);

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
    for (let i = 0; i < 6; ++i) {
      console.log(board.slice(i * 6, i * 6 + 6));
    }
    console.log()
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

  useEffect(() => {
    if (
      !gameoverState &&
      removedState.size > 0 &&
      removedState.size === boardState.length
    ) {
      setGameoverState(true);
    }
  }, [removedState, boardState, gameoverState]);

  return {
    boardState,
    setBoardState,
    clickedState,
    setClickedState,
    removedState,
    setRemovedState,
    timerState,
    setTimerState,
    gameoverState,
    setGameoverState,
    updateClickedState,
  };
}
