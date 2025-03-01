import { Validation } from "shared/validation";
import establishmentIcon from "assets/images/search/establishment.svg";
import roleIcon from "assets/images/search/role.svg";
import experienceIcon from "assets/images/search/experience.svg";
import skillsIcon from "assets/images/search/skills.svg";
import postcodeIcon from "assets/images/search/postcode.svg";
import distanceIcon from "assets/images/search/distance.svg";
import mapPinIcon from "assets/images/search/mapPin.svg";

export const HOSPITALITY_FIELDS: FormField<IJobHospitalityForm>[] = [
  {
    name: "hospitalityRole",
    validator: Validation.validateAutocomplete,
    placeholder: "Select role",
    type: "text",
    labelIcon: roleIcon,
    label: "Role",
  },
  {
    name: "hospitalityEstablishment",
    validator: Validation.validateAutocompleteOptional,
    placeholder: "Select type of establishment",
    type: "text",
    labelIcon: establishmentIcon,
    label: "Establishment",
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
    name: "skills",
    validator: Validation.validateMulticompleteOptional,
    placeholder: "Select required skills",
    type: "text",
    labelIcon: skillsIcon,
    label: "Skills",
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

export const initialHospitalityData: IJobHospitalityForm = {
  hospitalityRole: "",
  hospitalityEstablishment: "",
  yearsExperience: "",
  skills: [],
  postcode: "",
  distance: "",
};

export const errorStateHospitalityData = {
  establishment: [],
  role: [],
  experience: [],
  skills: [],
  postcode: [],
  distance: [],
};
