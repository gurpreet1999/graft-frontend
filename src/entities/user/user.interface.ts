/* eslint-disable @typescript-eslint/no-unused-vars */
interface ICandidateUserData {
  id: string;
  sector_id: string;
  hospitality_first_role_id: string;
  hospitality_second_role_id: string;
  hospitality_main_establishment_id: string;
  hospitality_second_establishment_id: string;
  construction_role_id: string;
  construction_card_type_id: string;
  years_experience_id: string;
  daily_job_update_id: string;
  agreement_to_contact: boolean;
  verified: boolean;
  skills: string[];
  industrial_and_driving_role_id: string;
  industrial_and_driving_licences: string[];
  industrial_and_driving_availabilities: string[];
}

interface IRecruiterUserData {
  id: string;
  company_name: string;
}

type Roles = "CANDIDATE" | "RECRUITER" | "ADMIN";

interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  postcode: string;
  postcode_latitude: number;
  postcode_longitude: number;
  posted_jobs?: number;
  photo: string | null;
  status?: UserStatus;
  role: Roles;
  candidate_data: ICandidateUserData;
  candidate_verification?: DocumentVerification;
  recruiter_data: IRecruiterUserData;
  billing: IBilling;
  applied_jobs?: number;
  sms_campaigns?: number;
  sms_campaigns_by_sector?: ISmsCampaignBySector[];
  onboarding_complete_step: number;
  is_onboarding_complete: boolean;
}

type UserStatus = "ACTIVE" | "SUSPENDED";

interface ISmsCampaignBySector {
  sector_id: string;
  count: number;
}

interface IPricingPlan {
  id: string;
  name: string;
  value: string;
  price_per_credit: number;
}

interface IBilling {
  credits: number;
  trial_ends_at: string | null;
  pricing_plan: IPricingPlan;
  subscription_ends_at: string | null;
}

interface DocumentVerification {
  created_at: string;
  experience_document_name: string;
  experience_document_status: DocumentStatus;
  experience_document_type_id: string;
  id: string;
  personal_document_name: string;
  personal_document_status: DocumentStatus;
  personal_document_type_id: string;
  updated_at: string;
  user_id: string;
}

type DocumentStatus = "PENDING" | "APPROVED" | "REJECTED";
