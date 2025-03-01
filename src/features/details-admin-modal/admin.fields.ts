import { Validation } from "shared/validation";
import userIcon from "assets/images/sign-in/signup/user.svg";
import emailIcon from "assets/images/campaign/Envelope.svg";
import phoneIcon from "assets/images/sign-in/signup/phone.svg";

export type AdminDetailsForm = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export const FIELDS: FormField<AdminDetailsForm>[] = [
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
  {
    name: "phone",
    validator: Validation.validatePhone,
    placeholder: "Mobile Number",
    type: "text",
    labelIcon: phoneIcon,
    label: "Mobile Number",
  },
];

export const initialFormData = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
};
