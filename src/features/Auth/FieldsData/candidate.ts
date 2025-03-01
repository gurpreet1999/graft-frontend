import mailIcon from "assets/images/sign-in/login/mail.svg";
import passwordIcon from "assets/images/sign-in/login/password.svg";
import userIcon from "assets/images/sign-in/signup/user.svg";
import phoneIcon from "assets/images/sign-in/signup/phone.svg";
import postalCodeIcon from "assets/images/sign-in/signup/postal.svg";
import yearsIcon from "assets/images/sign-in/signup/years.svg";
import siteIcon from "assets/images/sign-in/signup/site.svg";
import establishmentIcon from "assets/images/sign-in/signup/establishment.svg";
import firstRoleIcon from "assets/images/sign-in/signup/1preference.svg";
import secondRoleIcon from "assets/images/sign-in/signup/2preference.svg";
import skillsIcon from "assets/images/sign-in/signup/skills.svg";
import dailyIcon from "assets/images/sign-in/signup/daily.svg";
import availabilityIcon from "assets/images/sign-in/signup/availability.svg";
import licenceIcon from "assets/images/sign-in/signup/licence.svg";
import { Validation } from "shared/validation";

export const FIELDS_BASIC_INFO: FormField<IBasicInfo>[] = [
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
    name: "email",
    validator: Validation.validateEmail,
    placeholder: "Email",
    type: "text",
    icon: mailIcon,
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
  {
    name: "password",
    validator: Validation.validatePassword,
    placeholder: "Password",
    type: "password",
    icon: passwordIcon,
    isPassword: true,
  },
];

export const FIELDS_HOSPITALITY: FormField<IHospitalityFieldsFormData>[] = [
  {
    name: "yearsExperience",
    validator: Validation.validateAutocomplete,
    placeholder: "Total Years Hospitality Experience",
    type: "text",
    icon: yearsIcon,
  },
  {
    name: "hospitalityMainEstablishment",
    validator: Validation.validateAutocomplete,
    placeholder: "Main Type Of Establishment",
    type: "text",
    icon: establishmentIcon,
  },
  {
    name: "hospitalitySecondEstablishment",
    validator: Validation.validateAutocomplete,
    placeholder: "Second Type Of Establishment",
    type: "text",
    icon: establishmentIcon,
  },
  {
    name: "hospitalityFirstRole",
    validator: Validation.validateAutocomplete,
    placeholder: "First Preference",
    type: "text",
    icon: firstRoleIcon,
  },
  {
    name: "hospitalitySecondRole",
    validator: Validation.validateAutocomplete,
    placeholder: "Second Preference",
    type: "text",
    icon: secondRoleIcon,
  },
  {
    name: "skills",
    validator: Validation.validateMulticomplete,
    placeholder: "Skills",
    type: "text",
    icon: skillsIcon,
    multiselect: true,
  },
  {
    name: "dailyJobUpdatePreference",
    validator: Validation.validateAutocomplete,
    placeholder: "Daily Job Update",
    type: "text",
    icon: dailyIcon,
  },
];

export const FIELDS_CONSTRUCTION: FormField<IConstructionFieldsFormData>[] = [
  {
    name: "yearsExperience",
    validator: Validation.validateAutocomplete,
    placeholder: "Total Construction Experience",
    type: "text",
    icon: yearsIcon,
  },
  {
    name: "constructionRole",
    validator: Validation.validateAutocomplete,
    placeholder: "Role",
    type: "text",
    icon: userIcon,
  },
  {
    name: "constructionCardType",
    validator: Validation.validateAutocomplete,
    placeholder: "Card Type",
    type: "text",
    icon: siteIcon,
  },
  {
    name: "dailyJobUpdatePreference",
    validator: Validation.validateAutocomplete,
    placeholder: "Daily Job Update",
    type: "text",
    icon: dailyIcon,
  },
];

export const FIELDS_INDUSTRIAL: FormField<IIndustrialFieldsFormData>[] = [
  {
    name: "industrialRole",
    validator: Validation.validateAutocomplete,
    placeholder: "Job Roles",
    type: "text",
    icon: userIcon,
  },
  {
    name: "industrialLicence",
    validator: Validation.validateMulticomplete,
    placeholder: "Do You Hold Any Licences?",
    type: "text",
    icon: licenceIcon,
    multiselect: true,
  },
  {
    name: "yearsExperience",
    validator: Validation.validateAutocomplete,
    placeholder: "Total Industrial & Driving Experience",
    type: "text",
    icon: yearsIcon,
  },
  {
    name: "industrialAvailability",
    validator: Validation.validateMulticomplete,
    placeholder: "Availability",
    type: "text",
    icon: availabilityIcon,
    multiselect: true,
  },
  {
    name: "dailyJobUpdatePreference",
    validator: Validation.validateAutocomplete,
    placeholder: "Daily Job Update",
    type: "text",
    icon: dailyIcon,
  },
];

export const basicInfoInitial: IBasicInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postalCode: "",
  password: "",
};

export const hospitalityInitialData: IHospitalityFieldsFormData = {
  agreeToBeContacted: false,
  yearsExperience: "",
  dailyJobUpdatePreference: "",
  hospitalityFirstRole: "",
  hospitalitySecondRole: "",
  hospitalityMainEstablishment: "",
  hospitalitySecondEstablishment: "",
  skills: [],
  agreeToTerms: false,
};

export const constructionInitialData: IConstructionFieldsFormData = {
  agreeToBeContacted: false,
  dailyJobUpdatePreference: "",
  constructionRole: "",
  constructionCardType: "",
  yearsExperience: "",
  agreeToTerms: false,
};

export const industrialInitialData: IIndustrialFieldsFormData = {
  agreeToBeContacted: false,
  industrialRole: "",
  industrialLicence: [],
  industrialAvailability: [],
  yearsExperience: "",
  dailyJobUpdatePreference: "",
  agreeToTerms: false,
};
