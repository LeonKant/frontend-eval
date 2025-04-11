import { FormSchemaT } from "../_types";

const initForm: FormSchemaT = {
  name: null,
  email: null,
  dob: null,
  password: null,
};

const formInfo: {
  id: keyof FormSchemaT;
  buttonLabel: string;
  type: string;
  label: string;
}[] = [
  {
    id: "name",
    label: "Name",
    buttonLabel: "Next",
    type: "text",
  },
  {
    id: "email",
    label: "E-mail",
    buttonLabel: "Next",
    type: "email",
  },
  {
    id: "dob",
    label: "Date of birth",
    buttonLabel: "Next",
    type: "date",
  },
  {
    id: "password",
    label: "Password",
    buttonLabel: "Submit",
    type: "password",
  },
];

export { initForm, formInfo };
