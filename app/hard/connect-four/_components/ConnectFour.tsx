"use client";

import "../_css/connect-four.css";
import useConnectFour from "../_hooks/useConnectFour";
import Square from "./Square";

export const ConnectFour = () => {
  const {
    gameOverState,
    playerTurnState,
    handleDrop,
    drawState,
    handlePlayAgain,
    boardState,
  } = useConnectFour();

  return (
    <div className="connect-4-main">
      {!gameOverState ? (
        <>
          <h1>{`${playerTurnState ? "Red" : "Yellow"}'s turn`}</h1>
          <div className="drop-buttons">
            {Array.from({ length: 7 }, (_, ind) => (
              <button key={`drop-${ind}`} onClick={handleDrop(ind)}>
                Drop
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {drawState ? (
            <h1>It's a tie!</h1>
          ) : (
            <>
              <h1>{`${playerTurnState ? "Red" : "Yellow"} wins!`}</h1>
              <button onClick={handlePlayAgain}>Play again</button>
            </>
          )}
        </>
      )}
      <div className="game-cont">
        {boardState.flatMap((col, cind) =>
          col
            .toReversed()
            .map((p, rind) => (
              <Square key={`piece ${cind}-${rind}`} piece={p} />
            ))
        )}
      </div>
    </div>
  );
};
