"use client";
import { FormEvent, useState } from "react";
import "../_css/mortgage-calc.css";

type MortgageCalcFormSchemaT = {
  PLA: HTMLInputElement;
  interestRate: HTMLInputElement;
  lengthLoan: HTMLInputElement;
};
export default function MortgageCalculator() {
  const [mortgageState, setMortgageState] = useState<number | null>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements &
      MortgageCalcFormSchemaT;

    if (
      !formElements.PLA.value ||
      !formElements.interestRate.value ||
      !formElements.lengthLoan.value
    ) {
      alert("Invalid inputs");
      return;
    }
    const P = parseInt(formElements.PLA.value);
    const r = parseInt(formElements.interestRate.value) / 100 / 12;
    const n = parseInt(formElements.lengthLoan.value) * 12;

    // console.log(P, r, n);
    const num = r * P * (1 + r) ** n;
    const denom = (1 + r) ** n - 1;

    const mortgage = num / denom;

    setMortgageState(Math.round(mortgage));
  };
  const formatAmount = (amount: number) => {
    const result: string[] = [];
    const strAmount = amount.toString().split("").reverse();

    strAmount.forEach((c, ind) => {
      if (ind > 0 && ind % 3 === 0) {
        result.push(",");
      }
      result.push(c);
    });
    return `$${result.reverse().join("")}`;
  };

  return (
    <div>
      <form className="mortgage-calc-form" onSubmit={handleSubmit}>
        <label htmlFor="PLA">Principal loan amount</label>
        <br />
        <input
          id="PLA"
          min={0}
          className="input"
          type="number"
          // defaultValue={500000}
        />
        <br />
        <br />
        <label htmlFor="interestRate">Interest rate</label>
        <br />
        <input
          id="interestRate"
          min={0}
          className="input"
          type="number"
          // defaultValue={3}
        />{" "}
        %
        <br />
        <br />
        <label htmlFor="lengthLoan">Length of loan</label>
        <br />
        <input
          id="lengthLoan"
          min={0}
          className="input"
          type="number"
          // defaultValue={30}
        />{" "}
        Years
        <br />
        <br />
        <button className="button">Calculate</button>
      </form>
      {mortgageState && (
        <div>
          Your monthly mortgage payment will be {formatAmount(mortgageState)}
        </div>
      )}
    </div>
  );
}
