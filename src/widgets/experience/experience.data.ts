import { Validation } from "shared/validation";

export const HOSPITALITY_FIELDS_EXPERIENCE: FormField<ICandidateExperience>[] =
  [
    {
      name: "yearsExperience",
      validator: Validation.validateAutocomplete,
      placeholder: "Total Years Hospitality Experience",
      type: "text",
    },
    {
      name: "hospitalityMainEstablishment",
      validator: Validation.validateAutocomplete,
      placeholder: "Main Type Of Establishment",
      type: "text",
    },
    {
      name: "hospitalitySecondEstablishment",
      validator: Validation.validateAutocomplete,
      placeholder: "Second Type Of Establishment",
      type: "text",
    },
    {
      name: "hospitalityFirstRole",
      validator: Validation.validateAutocomplete,
      placeholder: "1st Role Looking For Preference",
      type: "text",
    },
    {
      name: "hospitalitySecondRole",
      validator: Validation.validateAutocomplete,
      placeholder: "2nd Role Looking For Preference",
      type: "text",
    },
    {
      name: "dailyJobUpdate",
      validator: Validation.validateAutocomplete,
      placeholder: "Daily Job Update Preference",
      type: "text",
    },
    {
      name: "skills",
      validator: Validation.validateMulticomplete,
      placeholder: "Skills",
      type: "text",
      multiselect: true,
    },
  ];

export const CONSTRUCTION_FIELDS_EXPERIENCE: FormField<ICandidateExperience>[] =
  [
    {
      name: "yearsExperience",
      validator: Validation.validateAutocomplete,
      placeholder: "Total Years Construction Experience",
      type: "text",
    },
    {
      name: "constructionCardType",
      validator: Validation.validateAutocomplete,
      placeholder: "Card Type",
      type: "text",
    },
    {
      name: "constructionRole",
      validator: Validation.validateAutocomplete,
      placeholder: "Construction Role",
      type: "text",
    },
    {
      name: "dailyJobUpdate",
      validator: Validation.validateAutocomplete,
      placeholder: "Daily Job Update Preference",
      type: "text",
    },
  ];

export const INDUSTRIAL_FIELDS_EXPERIENCE: FormField<IUserIndustrialExperience>[] =
  [
    {
      name: "yearsExperience",
      validator: Validation.validateAutocomplete,
      placeholder: "Total Years Industrial Experience",
      type: "text",
    },
    {
      name: "industrialRole",
      validator: Validation.validateAutocomplete,
      placeholder: "Role",
      type: "text",
    },
    {
      name: "industrialLicence",
      validator: Validation.validateMulticomplete,
      placeholder: "Licences",
      type: "text",
      multiselect: true,
    },
    {
      name: "industrialAvailability",
      validator: Validation.validateMulticomplete,
      placeholder: "Availability",
      type: "text",
      multiselect: true,
    },
    {
      name: "dailyJobUpdate",
      validator: Validation.validateAutocomplete,
      placeholder: "Daily Job Update Preference",
      type: "text",
    },
  ];
