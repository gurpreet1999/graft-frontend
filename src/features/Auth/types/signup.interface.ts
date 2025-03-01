/* eslint-disable @typescript-eslint/no-unused-vars */
type Role = "CANDIDATE" | "RECRUITER" | "ADMIN";

type SectorType = "Hospitality" | "Construction" | "Industrial & Driving";

interface ISignUpRecruiterData {
  role: "RECRUITER";
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
    postcode: string;
  };
  recruiterData: {
    company_name?: string;
  };
}

interface ISignUpRecruiterFormData {
  role: "RECRUITER";
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  postalCode: string;
  companyName: string;
}

interface ISignUpCandidateData {
  role: "CANDIDATE";
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    postcode: string;
    password: string;
  };
  candidateData: ICandidateData;
}

interface ICandidateData {
  sector_id: string;
  hospitality_first_role_id?: string;
  hospitality_second_role_id?: string;
  hospitality_main_establishment_id?: string;
  hospitality_second_establishment_id?: string;
  construction_role_id?: string;
  construction_card_type_id?: string;
  years_experience_id?: string;
  agreement_to_contact: boolean;
  daily_job_update_id: string;
  skill_ids?: string[];
  industrial_and_driving_role_id?: string;
  industrial_and_driving_licence_ids?: string[];
  industrial_and_driving_availability_ids?: string[];
}

interface IFormData {
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  postalCode: string;
  sector?: ISuggestion;
  dailyJobUpdatePreference?: string;
  agreeToBeContacted?: boolean;
  hospitalityFirstRole?: string;
  hospitalitySecondRole?: string;
  hospitalityMainEstablishment?: string;
  hospitalitySecondEstablishment?: string;
  constructionRole?: string;
  constructionCardType?: string;
  yearsExperience?: string;
  industrialRole?: string;
  industrialLicence?: string[];
  industrialAvailability?: string[];
  skills?: string[];
  companyName?: string;
  agreeToTerms?: boolean;
}

type IRecruiterFormData = Pick<
  IFormData,
  | "firstName"
  | "lastName"
  | "companyName"
  | "email"
  | "password"
  | "phone"
  | "postalCode"
>;

type IBasicInfo = Pick<
  IFormData,
  "firstName" | "lastName" | "email" | "password" | "phone" | "postalCode"
>;

type IConstructionFieldsFormData = Pick<
  IFormData,
  | "agreeToBeContacted"
  | "dailyJobUpdatePreference"
  | "constructionRole"
  | "constructionCardType"
  | "yearsExperience"
  | "skills"
  | "agreeToTerms"
>;

type IHospitalityFieldsFormData = Pick<
  IFormData,
  | "agreeToBeContacted"
  | "dailyJobUpdatePreference"
  | "hospitalityFirstRole"
  | "hospitalitySecondRole"
  | "hospitalityMainEstablishment"
  | "hospitalitySecondEstablishment"
  | "yearsExperience"
  | "skills"
  | "agreeToTerms"
>;

type IIndustrialFieldsFormData = Pick<
  IFormData,
  | "agreeToBeContacted"
  | "agreeToTerms"
  | "industrialRole"
  | "industrialLicence"
  | "industrialAvailability"
  | "yearsExperience"
  | "dailyJobUpdatePreference"
>;

type ICandidateConstructionFormData = IBasicInfo &
  IConstructionFieldsFormData & {
    role: "CANDIDATE";
    sector: { id: string; value: "Hospitality" };
  };

type ICandidateHospitalityFormData = IBasicInfo &
  IHospitalityFieldsFormData & {
    role: "CANDIDATE";
    sector: { id: string; value: "Construction" };
  };

type ICandidateIndustrialFormData = IBasicInfo &
  IIndustrialFieldsFormData & {
    role: "CANDIDATE";
    sector: { id: string; value: "Industrial & Driving" };
  };
