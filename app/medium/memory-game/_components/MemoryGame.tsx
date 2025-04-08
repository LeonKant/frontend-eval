"use client";

import "../_css/memory-game.css";
import useMemoryGame from "../_hooks";
import GameTile from "./GameTile";

export default function MemoryGame() {
  const {
    gameoverState,
    boardState,
    removedState,
    clickedState,
    timerState,
    updateClickedState,
    setGameoverState,
  } = useMemoryGame();

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
                onClick={() => !timerState && updateClickedState(ind)}
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
