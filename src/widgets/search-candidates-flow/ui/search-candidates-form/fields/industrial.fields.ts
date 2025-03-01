import { Validation } from "shared/validation";
import roleIcon from "assets/images/search/role.svg";
import experienceIcon from "assets/images/search/experience.svg";
import postcodeIcon from "assets/images/search/postcode.svg";
import distanceIcon from "assets/images/search/distance.svg";
import mapPinIcon from "assets/images/search/mapPin.svg";
import licenceIcon from "assets/images/search/scroll.svg";
import availabilityIcon from "assets/images/search/clock.svg";

export const INDUSTRIAL_FIELDS: FormField<ISearchIndustrialForm>[] = [
  {
    name: "industrialRole",
    validator: Validation.validateAutocomplete,
    placeholder: "Select",
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
    placeholder: "Select",
    type: "text",
    labelIcon: experienceIcon,
    label: "Years experience",
    allowAnyOption: true,
  },
  {
    name: "industrialAvailability",
    validator: Validation.validateMulticompleteOptional,
    placeholder: "Select",
    type: "text",
    labelIcon: availabilityIcon,
    label: "Availability",
    multiselect: true,
    allowAnyOption: true,
  },
  {
    name: "postcode",
    validator: Validation.validatePostalCodeOptional,
    placeholder: "Enter",
    type: "text",
    labelIcon: postcodeIcon,
    label: "Postcode",
    inputIcon: mapPinIcon,
  },
  {
    name: "distance",
    validator: Validation.validateDistance,
    placeholder: "Enter",
    type: "text",
    labelIcon: distanceIcon,
    label: "Distance",
  },
];

export const initialIndustrialData: ISearchIndustrialForm = {
  industrialRole: "",
  industrialLicence: [],
  industrialAvailability: [],
  yearsExperience: "",
  postcode: "",
  distance: "",
};
