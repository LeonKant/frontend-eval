"use client";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import "../_css/timer.css";

type TimerFormT = {
  hours: HTMLInputElement;
  minutes: HTMLInputElement;
  seconds: HTMLInputElement;
};

export default function CountdownTimer() {
  const [timerState, setTimerState] = useState<number>(0);
  const [startState, setStartState] = useState<boolean>(false);
  const [pauseState, setPauseState] = useState<boolean>(false);

  useEffect(() => {
    if (!startState || pauseState) return;

    const int = setInterval(() => {
      setTimerState((prev) => {
        if (prev === 0) {
          handleTimerZero();
          return prev;
        }
        return prev - 1;
      });
    }, 1 * 1000);

    return () => clearInterval(int);
  }, [startState, pauseState]);

  const seconds = (timerState % 60).toString().padStart(2, "0");
  const minutes = (Math.floor(timerState / 60) % 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(timerState / (60 * 60))
    .toString()
    .padStart(2, "0");

  const startCallback: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formElements = e.target as typeof e.target & TimerFormT;

    const hours = parseInt(formElements.hours.value) || 0;
    const minutes = parseInt(formElements.minutes.value) || 0;
    const seconds = parseInt(formElements.seconds.value) || 0;

    if (
      hours < 0 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      alert("Invalid inputs");
      return;
    }
    const time = seconds + minutes * 60 + hours * 60 * 60;
    setTimerState(time);
    setStartState(true);
  };

  const pauseCallback = () => {
    setPauseState((prev) => !prev);
  };

  const resetCallback = () => {
    setStartState(false);
    setPauseState(false);
    setTimerState(0);
  };

  const handleTimerZero = async () => {
    const message = "Timer is complete";

    if (!("Notification" in window)) {
      alert(message);
    } else if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
      const permission = await Notification.requestPermission();
    }
    if (Notification.permission === "granted") {
      const notification = new Notification(message);
    } else {
      alert(message);
    }

    resetCallback();
  };

  return (
    <div className="timer">
      {!startState ? (
        <form onSubmit={startCallback} className={`form`}>
          <input
            name="hours"
            type="number"
            className="input"
            min={0}
            placeholder="hh"
          />
          :
          <input
            type="number"
            name="minutes"
            className="input"
            min={0}
            max={59}
            placeholder="mm"
          />
          :
          <input
            type="number"
            name="seconds"
            className="input"
            min={0}
            max={59}
            placeholder="ss"
          />
          <button className={`button`} type="submit">
            Start
          </button>
        </form>
      ) : (
        <>
          <span aria-label="timer">
            <span aria-label="hours">{hours}</span>:
            <span aria-label="minutes">{minutes}</span>:
            <span aria-label="seconds">{seconds}</span>
          </span>
          <button className={`button`} onClick={pauseCallback}>
            {!pauseState ? "Pause" : "Continue"}
          </button>
          <button className={`button`} onClick={resetCallback}>
            Reset
          </button>
        </>
      )}
    </div>
  );
}
