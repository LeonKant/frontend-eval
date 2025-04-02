"use client";

import { useState } from "react";
import "../_css/undoable-counter.css";

// action, before, after
type HistoryItemT = [number, number, number];

interface HistoryListItemT {
  hItem: HistoryItemT;
}
function HistoryListItem({ hItem }: HistoryListItemT) {
  const [action, before, after] = hItem;
  return (
    <>
      <div>{`${action < 0 ? action : `+${action}`}`}</div>
      <div>{`(${before} -> ${after})`}</div>
    </>
  );
}

export default function UndoableCounter() {
  const [counterState, setCounterState] = useState<number>(0);
  const [historyState, setHistoryState] = useState<HistoryItemT[]>([]);
  const [redoState, setRedoState] = useState<HistoryItemT[]>([]);

  const updateCounter = (action: number) => {
    setRedoState([]);
    const before = counterState;
    const after = before + action;
    setHistoryState((prev) => {
      if (prev.length === 50) {
        prev.shift();
      }
      return [...prev, [action, before, after]];
    });
    setCounterState(after);
  };

  const undo = () => {
    const newHistory = [...historyState];
    const h = newHistory.pop();
    if (!h) return;

    const [, before] = h;

    setHistoryState(newHistory);
    setCounterState(before);
    setRedoState((prev) => [...prev, h]);
  };

  const redo = () => {
    const newRedo = [...redoState];

    const h = newRedo.pop();
    if (!h) return;

    const [, , after] = h;

    setHistoryState((prev) => [...prev, h]);
    setCounterState(after);
    setRedoState(newRedo);
  };

  const displayHistory = [...historyState].reverse();

  return (
    <div className={`undo-counter`}>
      <div className="button-cont">
        <button onClick={undo} disabled={historyState.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={redoState.length === 0}>
          Redo
        </button>
      </div>
      <div className="main-buttons">
        <div className="button-cont">
          <button onClick={() => updateCounter(-100)}>-100</button>
          <button onClick={() => updateCounter(-10)}>-10</button>
          <button onClick={() => updateCounter(-1)}>-1</button>
        </div>
        <span>{counterState}</span>
        <div className="button-cont">
          <button onClick={() => updateCounter(1)}>+1</button>
          <button onClick={() => updateCounter(10)}>+10</button>
          <button onClick={() => updateCounter(100)}>+100</button>
        </div>
      </div>
      <div className="main-history">
        <h1>History</h1>
        {displayHistory.length > 0 && (
          <div className="history-cont">
            {displayHistory.map((h, ind) => (
              <HistoryListItem key={`${ind}-${h[0]}`} hItem={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
