/* eslint-disable @typescript-eslint/no-unused-vars */
interface IExperienceData {
  dailyJobUpdates: ISuggestion[];
  hospitalityRoles: ISuggestion[];
  hospitalityEstablishments: ISuggestion[];
  constructionCardTypes: ISuggestion[];
  constructionRoles: ISuggestion[];
  skills: ISuggestion[];
  yearsExperience: ISuggestion[];
  sectors: ISuggestion[];
  employmentTypes: ISuggestion[];
  industrialAndDrivingAvailabilities: ISuggestion[];
  industrialAndDrivingRoles: ISuggestion[];
  industrialAndDrivingLicences: ISuggestion[];
  [key: string]: ISuggestion[];
}

interface INormalizedExperienceData {
  dailyJobUpdates: { [id: string]: ISuggestion };
  hospitalityRoles: { [id: string]: ISuggestion };
  hospitalityEstablishments: { [id: string]: ISuggestion };
  constructionCardTypes: { [id: string]: ISuggestion };
  constructionRoles: { [id: string]: ISuggestion };
  skills: { [id: string]: ISuggestion };
  yearsExperience: { [id: string]: ISuggestion };
  sectors: { [id: string]: ISuggestion };
  employmentTypes: { [id: string]: ISuggestion };
  industrialAndDrivingAvailabilities: { [id: string]: ISuggestion };
  industrialAndDrivingRoles: { [id: string]: ISuggestion };
  industrialAndDrivingLicences: { [id: string]: ISuggestion };
  [key: string]: { [id: string]: ISuggestion };
}
