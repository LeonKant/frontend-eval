"use client";
import { FormEvent, Fragment, useRef, useState } from "react";
import "../_css/multi-step-form.css";
import { FormSchemaT } from "../_types";
import { formInfo, initForm } from "../_static";

export default function MultiStepForm() {
  const formOrder: Array<keyof FormSchemaT> = [
    "name",
    "email",
    "dob",
    "password",
  ];

  const [formState, setFormState] = useState<FormSchemaT>({ ...initForm });

  const [formPageState, setFormPageState] = useState<number>(0);
  const formRefs = new Array(4)
    .fill(null)
    .map(() => useRef<HTMLInputElement | null>(null));

  const updateFormState = (state: Partial<FormSchemaT>) => {
    setFormState((prev) => ({
      ...prev,
      ...state,
    }));
  };

  const handleBackClick = () => {
    setFormPageState((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSubmit =
    (ind: number, key: keyof FormSchemaT) => (e: FormEvent) => {
      e.preventDefault();
      const value = formRefs[ind].current?.value;

      if (
        formRefs[ind].current === null ||
        value === undefined ||
        value.length === 0
      )
        return;

      const newState: Partial<FormSchemaT> = {};
      newState[key] = value;

      updateFormState(newState);
      setFormPageState((prev) => prev + 1);
    };

  return (
    <div className="mult-step-form-cont">
      {formPageState === 4 ? (
        <>
          <div>
            {Object.entries(formState).map(([k, v], ind) => (
              <div key={`${ind}-${k}`}>
                {k}: {v}
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              updateFormState({ ...initForm });
              setFormPageState(0);
            }}
          >
            Reset
          </button>
        </>
      ) : (
        <>
          <div>
            {formPageState > 0 && (
              <button
                className="back-button"
                onClick={handleBackClick}
              >{`< Back`}</button>
            )}
          </div>

          {formInfo.map((f, i) => (
            <Fragment key={`${i}-${f.id}`}>
              {formPageState === i && (
                <form
                  className="ms-form"
                  onSubmit={handleSubmit(
                    formPageState,
                    formOrder[formPageState]
                  )}
                >
                  <div className="form-input">
                    <label htmlFor="name">{`${f.label}`}</label>
                    <input
                      id={`${f.id}`}
                      type={`${f.type}`}
                      ref={formRefs[i]}
                      defaultValue={formState[formOrder[i]] ?? ""}
                    />
                  </div>
                  <div className="buttons-cont">
                    <button type="submit">{f.buttonLabel}</button>
                  </div>
                </form>
              )}
            </Fragment>
          ))}
        </>
      )}
    </div>
  );
}
