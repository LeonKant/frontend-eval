import { useState } from "react";
import {
  checkIfWinner,
  getInitBoardState,
  getInitPointersState,
} from "../_util";

const useConnectFour = () => {
  const [playerTurnState, setPlayerTurnState] = useState<boolean>(false);
  const [boardState, setBoardState] = useState<Array<Array<null | number>>>(
    getInitBoardState()
  );

  // const dropPointers = useRef<number[]>(Array.from({ length: 7 }, () => 0));
  const [dropPointersState, setDropPointersState] = useState<number[]>(
  getInitPointersState()
  );
  const [gameOverState, setGameOverState] = useState<boolean>(false);
  const [drawState, setDrawState] = useState<boolean>(false);

  const checkIfDraw = (dropPointersState: number[]) =>
    dropPointersState.every((val) => val === 6);

  const handleDrop = (cind: number) => () => {
    if (dropPointersState[cind] >= 6) {
      return;
    }
    const newBoardState = [...boardState.map((r) => [...r])];
    newBoardState[cind][dropPointersState[cind]] = playerTurnState ? 1 : 2;
    setBoardState(newBoardState);

    if (
      checkIfWinner(
        playerTurnState,
        cind,
        dropPointersState[cind],
        newBoardState
      )
    ) {
      setGameOverState(true);
      return;
    }

    const newPointersState = [
      ...dropPointersState.slice(0, cind),
      Math.min(6, dropPointersState[cind] + 1),
      ...dropPointersState.slice(cind + 1),
    ];

    if (checkIfDraw(newPointersState)) {
      setGameOverState(true);
      setDrawState(true);
      return;
    }

    setDropPointersState(newPointersState);
    setPlayerTurnState((prev) => !prev);
  };

  const handlePlayAgain = () => {
    setBoardState(getInitBoardState());
    setPlayerTurnState(false);
    setDropPointersState(getInitPointersState());
    setGameOverState(false);
    setDrawState(false);
  };

  return {
    playerTurnState,
    setPlayerTurnState,
    boardState,
    setBoardState,
    dropPointersState,
    setDropPointersState,
    gameOverState,
    setGameOverState,
    drawState,
    setDrawState,
    handleDrop,
    handlePlayAgain,
  };
};

export default useConnectFour;
