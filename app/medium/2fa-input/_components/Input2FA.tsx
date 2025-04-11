"use client";
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import "../_css/2fa-input.css";

interface Props {
  numInputs: number;
  code: string;
}
export default function Input2FA({ numInputs, code }: Props) {
  const [inputState, setInputState] = useState<Array<null | string>>(
    new Array(numInputs).fill(null)
  );
  const [focusState, setFocusState] = useState<number>(0);
  const inputRefs = new Array(numInputs)
    .fill(null)
    .map(() => useRef<HTMLInputElement | null>(null));

  inputRefs[focusState].current?.focus();

  const updateFocusState = (dir: "front" | "back") => {
    if (dir === "front") {
      setFocusState((prev) => (prev < numInputs - 1 ? prev + 1 : prev));
    } else if (dir === "back")
      setFocusState((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleKeyDown =
    (ind: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Backspace" &&
        (inputState[ind]?.length === 0 || inputState[ind] === null)
      ) {
        updateFocusState("back");
        e.preventDefault();
      } else if (/[0-9]{1}/.test(e.key) && inputState[ind]) {
        updateFocusState("front");
        e.preventDefault();
      }
    };

  const handleChange = (ind: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0 && !/[0-9]{1}/.test(e.target.value)) {
      e.target.value = "";
    } else if (e.target.value.length !== 0) {
      updateFocusState("front");
    } else if (e.target.value.length === 0) {
      updateFocusState("back");
    }
    setInputState((prev) => [
      ...prev.slice(0, ind),
      e.target.value,
      ...prev.slice(ind + 1),
    ]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(inputState?.join("") === code ? "Correct code" : "Incorrect Code");
  };

  return (
    <div className="cont-2fa">
      <form className="form-2fa" onSubmit={handleSubmit}>
        <div className="main-inputs">
          {inputState.map((_, ind) => (
            <input
              required
              ref={inputRefs[ind]}
              key={`${ind}-input`}
              type="text"
              pattern="[0-9]{1}"
              maxLength={1}
              onFocus={() => setFocusState(ind)}
              onKeyDown={handleKeyDown(ind)}
              onChange={handleChange(ind)}
            />
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
