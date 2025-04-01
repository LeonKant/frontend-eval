"use client";
import { useRef, useState } from "react";
import "../_css/modal.css";

export default function Modal() {
  const [openState, setOpenState] = useState<boolean>(false);
  const [acceptedState, setAcceptedState] = useState<boolean>(false);
  const backgroundRef = useRef(null);

  return (
    <div className="modal">
      {!acceptedState ? (
        <>
          {!openState ? (
            <button
              className={`button`}
              onClick={() => {
                setOpenState(true);
              }}
            >
              Show offer
            </button>
          ) : (
            <div
              ref={backgroundRef}
              className={`modal-background ${openState && "show"}`}
              onClick={(e) => {
                if (e.target === backgroundRef.current) {
                  setOpenState(false);
                }
              }}
            >
              <div className={`modal-display`}>
                <button
                  className="x"
                  onClick={() => {
                    setOpenState(false);
                  }}
                >
                  X
                </button>
                <h1>Click the button below to accept our amazing offer!</h1>
                <button
                  className={`accept-offer`}
                  onClick={() => {
                    setOpenState(false);
                    setAcceptedState(true);
                  }}
                >
                  Accept offer
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div>Offer accepted</div>
          <button
            className={`button`}
            onClick={() => {
              setAcceptedState(false);
            }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}
