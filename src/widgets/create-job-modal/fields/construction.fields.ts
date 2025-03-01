import { Validation } from "shared/validation";
import cardIcon from "assets/images/search/card.svg";
import roleIcon from "assets/images/search/role.svg";
import experienceIcon from "assets/images/search/experience.svg";
import postcodeIcon from "assets/images/search/postcode.svg";
import distanceIcon from "assets/images/search/distance.svg";
import mapPinIcon from "assets/images/search/mapPin.svg";

export const CONSTRUCTION_FIELDS: FormField<IJobConstructionForm>[] = [
  {
    name: "constructionRole",
    validator: Validation.validateAutocomplete,
    placeholder: "Select role",
    type: "text",
    labelIcon: roleIcon,
    label: "Role",
  },
  {
    name: "constructionCardType",
    validator: Validation.validateAutocompleteOptional,
    placeholder: "Select",
    type: "text",
    labelIcon: cardIcon,
    label: "Card Type",
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
    validator: Validation.validateDistance,
    placeholder: "Enter desired distance",
    type: "text",
    labelIcon: distanceIcon,
    label: "Distance",
  },
];

export const initialConstructionData: IJobConstructionForm = {
  constructionRole: "",
  constructionCardType: "",
  yearsExperience: "",
  postcode: "",
  distance: "",
};

export const errorStateConstructionData = {
  role: [],
  typeOfSite: [],
  experience: [],
  postcode: [],
  distance: [],
  skills: [],
};
