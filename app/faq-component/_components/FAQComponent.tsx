"use client";

import { useState } from "react";

export interface FAQItemT {
  question: string;
  answer: string;
}
function FAQItem({ question, answer }: FAQItemT) {
  const [openState, setOpenState] = useState<boolean>(false);

  return (
    <div
      className={`border border-white p-4`}
      onClick={() => {
        setOpenState((prev) => !prev);
      }}
    >
      <span>{question}</span>
      <p className={`${!openState && "hidden"}`}>- {answer}</p>
    </div>
  );
}

interface FAQComponentPropsT {
  faqs: FAQItemT[];
}
export default function FAQComponent({ faqs }: FAQComponentPropsT) {
  return (
    <div className="max-w-2xl w-full gap-6 p-4 flex flex-col justify-center border-1 border-gray-500">
      <h1 className={`m-auto font-semibold`}>Frequently Asked Questions</h1>
      {faqs.map((f, ind) => (
        <FAQItem key={`${ind}`} {...f} />
      ))}
    </div>
  );
}
