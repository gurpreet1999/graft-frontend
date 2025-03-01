import { Api } from "../Api";

export interface ISearchSendData {
  sector_id: string;
  hospitality_role_id?: string;
  hospitality_establishment_id?: string;
  construction_role_id?: string;
  construction_card_type_id?: string;
  years_experience_id?: string;
  verified: boolean | string;
  skill_ids?: string[];
  postcode?: string;
  distance?: number;
  industrial_and_driving_role_id?: string;
  industrial_and_driving_licence_ids?: string[];
  industrial_and_driving_availability_ids?: string[];
}

export interface ISearchedCandidate {
  first_name: string;
  last_name: string;
  postcode: string;
  distance_km: number | null;
  candidate_data: {
    id: string;
    verified: boolean;
    hospitality_first_role_id?: string;
    construction_role_id?: string;
    industrial_and_driving_role_id?: string;
    hospitality_main_establishment_id?: string;
    construction_card_type_id?: string;
    industrial_and_driving_licences: string[];
    skills: string[];
    years_experience_id: string;
  };
}

interface IGetSearchedCandidatesResponse {
  candidates: ISearchedCandidate[];
  total_count: number;
}

export class SearchApi extends Api {
  static async getSearchedCandidates(
    data: ISearchSendData,
    page_size: number,
    page: number
  ): Promise<IGetSearchedCandidatesResponse> {
    return await this.get("/candidate/search", { ...data, page_size, page });
  }
}
