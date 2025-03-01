import { Validation } from "shared/validation";
import roleIcon from "assets/images/search/role.svg";
import coinIcon from "assets/images/profile/coin.svg";
import establishmentIcon from "assets/images/search/establishment.svg";
import mapPinIcon from "assets/images/search/mapPin.svg";
import contactIcon from "assets/images/campaign/UserList.svg";
import phoneIcon from "assets/images/campaign/Phone.svg";
import emailIcon from "assets/images/campaign/Envelope.svg";

export const JOB_DETAILS_FIELDS: FormField<IJobDetails>[] = [
  {
    name: "companyName",
    validator: Validation.validateCompany,
    placeholder: "Enter company name",
    type: "text",
    labelIcon: roleIcon,
    label: "Company name",
    disabled: true,
  },
  {
    name: "rateOfPay",
    validator: Validation.validateRateOfPay,
    placeholder: "Enter rate of pay",
    type: "text",
    labelIcon: coinIcon,
    label: "Rate of pay",
  },
  {
    name: "occupation",
    validator: Validation.validateAutocomplete,
    placeholder: "Select part occupation or full occupation",
    type: "text",
    labelIcon: establishmentIcon,
    label: "Part occupation Or Full occupation",
  },
  {
    name: "location",
    validator: Validation.validateLocation,
    placeholder: "Enter location",
    type: "text",
    labelIcon: mapPinIcon,
    label: "Location",
  },
  {
    name: "contactName",
    validator: Validation.validateText,
    placeholder: "Enter contact name",
    type: "text",
    labelIcon: contactIcon,
    label: "Contact name",
    disabled: true,
  },
  {
    name: "contactPhone",
    validator: Validation.validatePhone,
    placeholder: "Enter phone number",
    type: "text",
    labelIcon: phoneIcon,
    label: "Contact phone",
    disabled: true,
  },
  {
    name: "contactEmail",
    validator: Validation.validateEmail,
    placeholder: "Enter email",
    type: "text",
    labelIcon: emailIcon,
    label: "Contact email",
    disabled: true,
  },
];
