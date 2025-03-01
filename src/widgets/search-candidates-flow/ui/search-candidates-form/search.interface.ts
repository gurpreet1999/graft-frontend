/* eslint-disable @typescript-eslint/no-unused-vars */
interface ISearchData {
  hospitalityEstablishment?: string;
  hospitalityRole: string;
  constructionRole: string;
  industrialRole: string;
  industrialLicence: string[];
  industrialAvailability: string[];
  yearsExperience: string;
  constructionCardType?: string;
  skills?: string[];
  distance: string;
  postcode?: string;
}

type ISearchConstructionForm = Pick<
  ISearchData,
  | "constructionRole"
  | "constructionCardType"
  | "yearsExperience"
  | "postcode"
  | "distance"
>;

type ISearchHospitalityForm = Pick<
  ISearchData,
  | "hospitalityEstablishment"
  | "hospitalityRole"
  | "yearsExperience"
  | "skills"
  | "postcode"
  | "distance"
>;

type ISearchIndustrialForm = Pick<
  ISearchData,
  | "industrialRole"
  | "industrialLicence"
  | "industrialAvailability"
  | "yearsExperience"
  | "postcode"
  | "distance"
>;

type ISearchForms =
  | ISearchConstructionForm
  | ISearchHospitalityForm
  | ISearchIndustrialForm;
