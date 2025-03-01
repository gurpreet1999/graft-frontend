/* eslint-disable @typescript-eslint/no-unused-vars */
interface IJobsForm {
  yearsExperience: string;
  skills: string[];
  postcode: string;
  distance?: string;
  hospitalityRole: string;
  hospitalityEstablishment: string;
  constructionRole: string;
  constructionCardType: string;
  industrialRole: string;
  industrialLicence: string[];
  industrialAvailability: string[];
}

type IJobHospitalityForm = Pick<
  IJobsForm,
  | "hospitalityRole"
  | "hospitalityEstablishment"
  | "skills"
  | "yearsExperience"
  | "postcode"
  | "distance"
>;

type IJobConstructionForm = Pick<
  IJobsForm,
  | "constructionRole"
  | "constructionCardType"
  | "yearsExperience"
  | "postcode"
  | "distance"
>;

type IJobIndustrialForm = Pick<
  IJobsForm,
  | "industrialRole"
  | "industrialLicence"
  | "industrialAvailability"
  | "yearsExperience"
  | "postcode"
  | "distance"
>;

interface IJobDetails {
  companyName: string;
  rateOfPay: string;
  occupation: string;
  location: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

interface IJob {
  sector_id: string;
  hospitality_filters?: {
    hospitality_role_id: string;
    hospitality_establishment_id?: string;
  };
  construction_filters?: {
    construction_role_id: string;
    construction_card_type_id?: string;
  };
  industrial_and_driving_filters?: {
    industrial_and_driving_role_id: string;
    industrial_and_driving_licences?: string[];
    industrial_and_driving_availabilities?: string[];
  };
  years_experience_id?: string;
  skills?: string[] | string;
  postcode: string;
  distance?: number;
  job_description: {
    location: string;
    rate_of_pay: number;
    employment_type_id: string;
  };
  publish_job_immediately: boolean;
}

interface IPostedJob {
  id: string;
  sector_id: string;
  hospitality_role_id: string;
  hospitality_establishment_id: string;
  construction_role_id: string;
  construction_card_type_id: string;
  industrial_and_driving_role_id: string;
  industrial_and_driving_licences: string[];
  industrial_and_driving_availabilities: string[];
  years_experience_id: string;
  employment_type_id: string;
  location: string;
  rate_of_pay: number;
  postcode: string;
  postcode_latitude: number;
  postcode_longitude: number;
  distance: number;
  status: string;
  created_at: string;
  updated_at: string;
  total_applied: number;
  total_shortlisted: number;
  user: {
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    recruiter_data: {
      company_name: string;
    };
  };
  skills: string[];
}

interface INormalizedJobData {
  id: string;
  user: {
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    recruiter_data: {
      company_name: string;
    };
  };
  sector: SectorType;
  employmentType: string;
  skills: string[];
  licences: string[];
  availability: string[];
  experience: string;
  role: string;
  establishment: string;
  location: string;
  rate_of_pay: number;
  postcode: string;
  postcode_latitude: number;
  postcode_longitude: number;
  distance: number;
  status: "PUBLISHED" | "UNPUBLISHED";
  created_at: string;
  updated_at: string;
}

interface IJobTable {
  total_count: number;
  jobs: IPostedJob[];
}

type JobRow = {
  id: string;
  role: JSX.Element;
  status: JSX.Element;
  skills: JSX.Element;
  experience: string;
  postcode: JSX.Element;
  distance: string;
  matches: JSX.Element;
  applied: JSX.Element;
  button: JSX.Element;
  licences?: JSX.Element;
};
