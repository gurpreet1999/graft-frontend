import { Api } from "../Api";

export class CampaignApi extends Api {
  static createSearchCampaign = async (data: ICreateCampaignData) => {
    return await this.post("/campaign/search", data);
  };

  static createJobCampaign = async (
    job_id: string,
    message: string,
    amount_of_candidates: string
  ) => {
    return await this.post("/campaign/job", {
      job_id,
      message,
      amount_of_candidates,
    });
  };

  static async createJobShortlistedCampaign(
    job_id: string,
    message: string,
    amount_of_candidates: string
  ) {
    return await this.post("/campaign/job-list", {
      job_id,
      message,
      amount_of_candidates,
      status: "SHORTLISTED",
    });
  }

  static async createJobAppliedCampaign(
    job_id: string,
    message: string,
    amount_of_candidates: string
  ) {
    return await this.post("/campaign/job-list", {
      job_id,
      message,
      amount_of_candidates,
      status: "APPLIED",
    });
  }

  static async getCampaigns(
    status: "ACTIVE" | "ARCHIVED"
  ): Promise<ICampaignData[]> {
    return await this.get("/campaign", { status });
  }

  static async getCampaignDetails(id: string): Promise<ICampaignData> {
    return await this.get(`/campaign/${id}`);
  }

  static async addCampaignToArchive(id: string) {
    return await this.put(`/campaign/${id}/archive`, {});
  }

  static async repeatCampaign(id: string, message: string) {
    return await this.put(`/campaign/${id}/repeat`, { message });
  }

  static async getCampaignCandidates(
    id: string,
    page: number = 1,
    page_size: number = 10
  ) {
    return await this.get(`/campaign/${id}/candidate`, { page, page_size });
  }

  static async getCampaignSettings() {
    return await this.get("/campaign/settings");
  }
}
