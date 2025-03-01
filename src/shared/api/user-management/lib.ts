import { Api } from "../Api";

export type ItemsPerSector = {
  sector_id: string;
  count: number;
};

export type DashboardData = {
  clients: number;
  candidates: number;
  jobs: number;
  campaigns: number;
  candidates_per_sector: ItemsPerSector[];
  jobs_per_sector: ItemsPerSector[];
  campaigns_per_sector: ItemsPerSector[];
};

export type CandidatesByRole = {
  role_id: string;
  count: number;
};

export type AdminDetails = {
  email: string;
  first_name: string;
  id: string;
  is_onboarding_complete: boolean;
  last_name: string;
  onboarding_complete_step: number;
  phone_number: string;
  photo: string;
  postcode: string;
  postcode_latitude: number;
  postcode_longitude: number;
  role: string;
  status: string;
  last_activity_date: string;
};

export class UserManagementApi extends Api {
  static async getCandidates(
    sector: string,
    page: number,
    pageSize: number,
    search?: string,
    status?: string
  ) {
    return this.get("user/candidate", {
      sector_id: sector,
      page,
      page_size: pageSize,
      search,
      status,
    });
  }

  static async getRecruiters(
    page: number,
    pageSize: number,
    pricingPlanId?: string,
    search?: string,
    creditsFrom?: number,
    creditsTo?: number
  ) {
    return this.get("user/recruiter", {
      pricing_plan_id: pricingPlanId,
      page,
      page_size: pageSize,
      search,
      credits_from: creditsFrom,
      credits_to: creditsTo,
    });
  }

  static async getAdmins(page: number, pageSize: number, search?: string) {
    return this.get("user/admin", {
      page,
      page_size: pageSize,
      search,
    });
  }

  static async getCandidate(id: string) {
    return this.get(`user/candidate/${id}`);
  }

  static async getClient(id: string) {
    return this.get(`user/recruiter/${id}`);
  }

  static async getDashboardData(): Promise<DashboardData> {
    return this.get("user/admin/dashboard");
  }

  static async getCandidatesByRole(
    sector: string
  ): Promise<CandidatesByRole[]> {
    return this.get("user/candidate/role", { sector_id: sector });
  }

  static async suspendUser(id: string) {
    return this.patch(`user/status/${id}`, { status: "SUSPENDED" });
  }

  static async activateUser(id: string) {
    return this.patch(`user/status/${id}`, { status: "ACTIVE" });
  }

  static async getAdminDetails(id: string): Promise<AdminDetails> {
    return this.get(`user/admin/${id}`);
  }

  static async sendAdminInvite(
    first_name: string,
    last_name: string,
    email: string
  ) {
    return this.post("auth/admin", {
      first_name,
      last_name,
      email,
    });
  }
}
