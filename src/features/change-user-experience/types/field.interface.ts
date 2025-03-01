/* eslint-disable @typescript-eslint/no-unused-vars */
interface ICandidateExperience {
  hospitalityFirstRole?: string;
  hospitalitySecondRole?: string;
  hospitalityMainEstablishment?: string;
  hospitalitySecondEstablishment?: string;
  yearsExperience?: string;
  dailyJobUpdate?: string;
  skills?: string[];
  constructionCardType?: string;
  constructionRole?: string;
  industrialRole?: string;
  industrialLicence?: string[];
  industrialAvailability?: string[];
}

type IUserHospitalityExperience = Pick<
  ICandidateExperience,
  | "hospitalityFirstRole"
  | "hospitalitySecondRole"
  | "hospitalityMainEstablishment"
  | "hospitalitySecondEstablishment"
  | "yearsExperience"
  | "dailyJobUpdate"
  | "skills"
>;

type IUserConstructionExperience = Pick<
  ICandidateExperience,
  | "constructionCardType"
  | "constructionRole"
  | "yearsExperience"
  | "dailyJobUpdate"
>;

type IUserIndustrialExperience = Pick<
  ICandidateExperience,
  | "industrialRole"
  | "industrialLicence"
  | "industrialAvailability"
  | "dailyJobUpdate"
  | "yearsExperience"
>;

interface IUserChangeHospitalityExperience {
  hospitality_first_role_id: string;
  hospitality_second_role_id: string;
  hospitality_main_establishment_id: string;
  hospitality_second_establishment_id: string;
  years_experience_id: string;
  daily_job_update_id: string;
  skills: string[];
  sector_id: string;
}

interface IUserChangeConstructionExperience {
  construction_card_type_id: string;
  construction_role_id: string;
  years_experience_id: string;
  daily_job_update_id: string;
  sector_id: string;
}

interface IUserChangeIndustrialExperience {
  industrial_and_driving_role_id: string;
  industrial_and_driving_licence_ids: string[];
  industrial_and_driving_availability_ids: string[];
  daily_job_update_id: string;
  years_experience_id: string;
  sector_id: string;
}
