/* eslint-disable @typescript-eslint/no-unused-vars */
type From = "search" | "jobs" | "campaigns";

interface ICreateCampaignData {
  filters: IFiltersCreateCampaign;
  message: string;
  amount_of_candidates: number;
}

interface IFiltersCreateCampaign {
  sector_id: string;
  hospitality_filters?: ISearchHospitalityFilters;
  construction_filters?: ISearchConstructionFilters;
  industrial_and_driving_filters?: ISearchIndustrialAndDrivingFilters;
  years_experience_id?: string;
  postcode?: string;
  distance?: number;
  verified: boolean;
  skills?: string[];
}

interface ISearchHospitalityFilters {
  hospitality_role_id: string;
  hospitality_establishment_id: string;
}

interface ISearchConstructionFilters {
  construction_role_id: string;
  construction_card_type_id?: string;
}

interface ISearchIndustrialAndDrivingFilters {
  industrial_and_driving_role_id: string;
  industrial_and_driving_licences?: string[];
}

interface ISearchState {
  sector: ISuggestion;
  fields: ISearchForms;
}

interface ICampaignData {
  id: string;
  credits_spent: number;
  amount_of_candidates: number;
  message: string;
  job_status: string;
  status: string;
  created_at: string;
  updated_at: string;
  job?: ICampaignJobData;
  sms_campaign_filter?: ICampaignFilterData;
  sms_campaign_history: ICampaignSmsHistoryData[];
}

interface INormalizedCampaignData {
  id: string;
  sector: string;
  role: string;
  establishment: string;
  yearsExperience: string;
  postcode: string;
  distance: string | number;
  amountOfCandidates: number;
  message: string;
  creditsSpent: number;
  status: string;
  jobDetails?: {
    rateOfPay: string | number;
    location: string;
    employmentType: string;
  };
  smsHistory: ICampaignSmsHistory[];
}

interface ICampaignSmsHistory {
  message: JSX.Element;
  candidates: string;
  date: string;
}

interface ICampaignJobData {
  id: string;
  sector_id: string;
  hospitality_role_id?: string;
  hospitality_establishment_id?: string;
  construction_role_id?: string;
  construction_card_type_id?: string;
  industrial_and_driving_role_id?: string;
  industrial_and_driving_licence_ids?: string;
  industrial_and_driving_availability_ids?: string[];
  years_experience_id: string;
  employment_type_id: string;
  location: string;
  rate_of_pay: number;
  postcode: string;
  distance: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ICampaignFilterData {
  id: string;
  sector_id: string;
  hospitality_role_id: string;
  hospitality_establishment_id: string;
  construction_role_id: string;
  construction_card_type_id: string;
  years_experience_id: string;
  industrial_and_driving_role_id: string;
  industrial_and_driving_licence_ids: string;
  industrial_and_driving_availability_ids: string[];
  verified: false;
  postcode: string;
  distance: number;
}

interface ICampaignSmsHistoryData {
  id: string;
  message: string;
  created_at: string;
  updated_at: string;
}

interface ICampaignsState {
  [key: string]: {
    sector: string;
    role: string;
    establishment: string;
    candidates: number;
    id: string;
  }[];
}
