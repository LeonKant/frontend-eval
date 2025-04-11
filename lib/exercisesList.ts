import { ExercisesT } from "@/types/exercises";

const exercises: {
  easy: ExercisesT[];
  medium: ExercisesT[];
  hard: ExercisesT[];
} = {
  easy: [
    {
      label: "FAQ component",
      path: "faq-component",
    },
    {
      label: "Countdown Timer",
      path: "countdown-timer",
    },
    {
      label: "Mortgage Calculator",
      path: "mortgage-calc",
    },
    {
      label: "Modal Overlay",
      path: "modal",
    },
  ],
  medium: [
    {
      label: "Memory Game",
      path: "memory-game",
    },
    {
      label: "Undoable Counter",
      path: "undoable-counter",
    },
    {
      label: "Shopping List",
      path: "shopping-list",
    },
    {
      label: "Dice Roller",
      path: "dice-roller",
    },
    {
      label: "Data fetch and visualization",
      path: "data-fetch-vis",
    },
    {
      label: "Multi-step form",
      path: "multi-step-form",
    },
  ],
  hard: [],
};

export { exercises };
