import mailIcon from "assets/images/sign-in/login/mail.svg";
import passwordIcon from "assets/images/sign-in/login/password.svg";
import companyIcon from "assets/images/sign-in/signup/company.svg";
import userIcon from "assets/images/sign-in/signup/user.svg";
import phoneIcon from "assets/images/sign-in/signup/phone.svg";
import postalCodeIcon from "assets/images/sign-in/signup/postal.svg";
import { Validation } from "shared/validation";

export const FIELDS_SIGNUP: FormField<IRecruiterFormData>[] = [
  {
    name: "firstName",
    validator: Validation.validateName,
    placeholder: "First Name",
    type: "text",
    icon: userIcon,
  },
  {
    name: "lastName",
    validator: Validation.validateLastName,
    placeholder: "Last Name",
    type: "text",
    icon: userIcon,
  },
  {
    name: "companyName",
    validator: Validation.validateCompany,
    placeholder: "Company Name",
    type: "text",
    icon: companyIcon,
  },
  {
    name: "email",
    validator: Validation.validateEmail,
    placeholder: "Email",
    type: "text",
    icon: mailIcon,
  },
  {
    name: "password",
    validator: Validation.validatePassword,
    placeholder: "Password",
    type: "password",
    icon: passwordIcon,
    isPassword: true,
  },
  {
    name: "phone",
    validator: Validation.validatePhone,
    placeholder: "Mobile Number",
    type: "text",
    icon: phoneIcon,
  },
  {
    name: "postalCode",
    validator: Validation.validatePostalCode,
    placeholder: "Postcode",
    type: "text",
    icon: postalCodeIcon,
  },
];
