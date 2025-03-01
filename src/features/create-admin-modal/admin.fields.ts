import { Validation } from "shared/validation";
import userIcon from "assets/images/sign-in/signup/user.svg";
import emailIcon from "assets/images/campaign/Envelope.svg";

export type CreateAdminForm = {
  email: string;
  firstName: string;
  lastName: string;
};

export const FIELDS: FormField<CreateAdminForm>[] = [
  {
    name: "firstName",
    validator: Validation.validateName,
    placeholder: "First Name",
    type: "text",
    labelIcon: userIcon,
    label: "First Name",
  },
  {
    name: "lastName",
    validator: Validation.validateLastName,
    placeholder: "Last Name",
    type: "text",
    labelIcon: userIcon,
    label: "Last Name",
  },
  {
    name: "email",
    validator: Validation.validateEmail,
    placeholder: "Email",
    type: "text",
    labelIcon: emailIcon,
    label: "Email",
  },
];

export const initialFormData: CreateAdminForm = {
  email: "",
  firstName: "",
  lastName: "",
};
