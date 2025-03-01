import { Validation } from "shared/validation";

export const FIELDS_PERSONAL_DATA: FormField<IAdminPersonalData>[] = [
  {
    name: "firstName",
    validator: Validation.validateName,
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    validator: Validation.validateLastName,
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "email",
    validator: Validation.validateEmail,
    placeholder: "Email",
    type: "text",
  },
  {
    name: "phone",
    validator: Validation.validatePhone,
    placeholder: "Mobile Number",
    type: "text",
  },
];
