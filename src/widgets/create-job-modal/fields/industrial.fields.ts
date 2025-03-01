import { Validation } from "shared/validation";
import roleIcon from "assets/images/search/role.svg";
import experienceIcon from "assets/images/search/experience.svg";
import postcodeIcon from "assets/images/search/postcode.svg";
import distanceIcon from "assets/images/search/distance.svg";
import mapPinIcon from "assets/images/search/mapPin.svg";
import licenceIcon from "assets/images/search/scroll.svg";
import availabilityIcon from "assets/images/search/clock.svg";

export const INDUSTRIAL_FIELDS: FormField<IJobIndustrialForm>[] = [
  {
    name: "industrialRole",
    validator: Validation.validateAutocomplete,
    placeholder: "Select role",
    type: "text",
    labelIcon: roleIcon,
    label: "Role",
  },
  {
    name: "industrialLicence",
    validator: Validation.validateMulticompleteOptional,
    placeholder: "Select",
    type: "text",
    labelIcon: licenceIcon,
    label: "Licences",
    multiselect: true,
    allowAnyOption: true,
  },
  {
    name: "yearsExperience",
    validator: Validation.validateAutocompleteOptional,
    placeholder: "Select years experience",
    type: "text",
    labelIcon: experienceIcon,
    label: "Years experience",
    allowAnyOption: true,
  },
  {
    name: "industrialAvailability",
    validator: Validation.validateMulticompleteOptional,
    placeholder: "Select availability",
    type: "text",
    labelIcon: availabilityIcon,
    label: "Availability",
    multiselect: true,
    allowAnyOption: true,
  },
  {
    name: "postcode",
    validator: Validation.validatePostalCode,
    placeholder: "Enter postcode",
    type: "text",
    labelIcon: postcodeIcon,
    label: "Postcode",
    inputIcon: mapPinIcon,
  },
  {
    name: "distance",
    validator: Validation.validateDistanceOptional,
    placeholder: "Enter desired distance",
    type: "text",
    labelIcon: distanceIcon,
    label: "Distance",
  },
];

export const initialIndustrialData: IJobIndustrialForm = {
  industrialRole: "",
  industrialLicence: [],
  industrialAvailability: [],
  yearsExperience: "",
  postcode: "",
  distance: "",
};

export const errorStateIndustrialData = {
  role: [],
  license: [],
  availability: [],
  experience: [],
  postcode: [],
  distance: [],
  skills: [],
};
