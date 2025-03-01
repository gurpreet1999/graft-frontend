/* eslint-disable @typescript-eslint/no-unused-vars */
interface ICandidatesData {
  applications: IApplicationCandidate[];
  totalCount: number;
}

interface IApplicationCandidate {
  created_at: string;
  id: string;
  status: string;
  updated_at: string;
  user: ICandidateInfo;
}

interface ICandidateInfo {
  candidate_data: ICandidateItemData;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  phone_number: string;
  postcode: string;
  role: { role: "candidate" };
}

interface ICandidateItemData {
  construction_card_type_id?: string;
  construction_role_id?: string;
  hospitality_first_role_id?: string;
  hospitality_main_establishment_id?: string;
  hospitality_second_establishment_id?: string;
  hospitality_second_role_id?: string;
  industrial_and_driving_licences?: string[];
  industrial_and_driving_role_id?: string;
  industrial_and_driving_availabilities?: string[];
  id: string;
  sector_id: string;
  skills: string[];
  verified: boolean;
  years_experience_id: string;
}
