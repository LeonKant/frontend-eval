"use client";
import { FormEvent, useState } from "react";
import "../_css/dice-roller.css";

type DiceRollerFormSchemaT = {
  numDice: HTMLInputElement;
};

const Dice = ({ num }: { num: number }) => {
  if (num > 6 || num < 1) {
    return <div className={`dice`}></div>;
  }

  const Dot = ({ isBlack = false }: { isBlack?: boolean }) => (
    <div className={`dot ${isBlack ? "black" : ""}`} />
  );
  const n6 = num === 6;
  const n456 = num === 4 || num === 5 || n6;
  const n23456 = num === 2 || num === 3 || n456;
  const n135 = num === 1 || num === 3 || num === 5;

  return (
    <div className={`dice`}>
      <Dot isBlack={n456} />
      <Dot />
      <Dot isBlack={n23456} />

      <Dot isBlack={n6} />
      <Dot isBlack={n135} />
      <Dot isBlack={n6} />

      <Dot isBlack={n23456} />
      <Dot />
      <Dot isBlack={n456} />
    </div>
  );
};

export default function DiceRoller() {
  const [diceState, setDiceState] = useState<number[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElements = e.currentTarget
      .elements as typeof e.currentTarget.elements & DiceRollerFormSchemaT;

    const numDice = parseInt(formElements.numDice.value);

    if (Number.isNaN(numDice)) return;

    setDiceState(
      new Array(numDice).fill(null).map(() => Math.floor(Math.random() * 6 + 1))
    );
  };

  return (
    <div className="dice-roller">
      <form className="dice-roller-form" onSubmit={onSubmit}>
        <label htmlFor="numDice">Number of dice</label>
        <input defaultValue={1} id="numDice" type="number" min={1} max={99} />
        <button type="submit">Roll</button>
      </form>
      <div className="dice-cont">
        {diceState.map((n, ind) => (
          <Dice key={`${ind}-${n}`} num={n} />
        ))}
      </div>
    </div>
  );
}
