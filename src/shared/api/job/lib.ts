import { Api } from "../Api";

export class JobApi extends Api {
  static async createJob(data: IJob) {
    return await this.post("/job", data);
  }

  static async getJobsRecruiter(
    page_size: number,
    page: number,
    sector_id?: string
  ) {
    return await this.get("/job/posted", { page_size, page, sector_id });
  }

  static async getJobsCandidate(page: number = 1, page_size: number) {
    return await this.get("/job/candidate", { page, page_size });
  }

  static async getAppliedJobs(page: number = 1, page_size: number) {
    return await this.get("/job/applied", { page, page_size });
  }

  static async getJobDetails(id: string) {
    return await this.get(`/job/${id}`);
  }

  static async publishJob(id: string) {
    return await this.put(`/job/${id}/publish`, {
      status: "PUBLISHED",
    });
  }

  static async unpublishJob(id: string) {
    return await this.put(`/job/${id}/publish`, {
      status: "NOT_PUBLISHED",
    });
  }

  static async applyForJob(jobId: string) {
    return await this.post(`/job/${jobId}/application`, {});
  }

  static async declineApplication(jobId: string) {
    return await this.delete(`/job/${jobId}/application`, {});
  }

  static async getMatchesCandidates(
    jobId: string,
    page: number = 1,
    page_size: number
  ) {
    return await this.get(`/job/${jobId}/matched`, { page, page_size });
  }

  static async getAppliedCandidates(
    jobId: string,
    page: number = 1,
    page_size: number
  ) {
    return await this.get(`/job/${jobId}/applied`, { page, page_size });
  }

  static async getShortlistedCandidates(
    jobId: string,
    page: number = 1,
    page_size: number
  ) {
    return await this.get(`/job/${jobId}/shortlisted`, { page, page_size });
  }

  static async getHiredCandidates(
    jobId: string,
    page: number = 1,
    page_size: number
  ) {
    return await this.get(`/job/${jobId}/hired`, { page, page_size });
  }

  static async shortlistCandidate(jobId: string, candidate_id: string) {
    return await this.put(`/job/${jobId}/application`, {
      candidate_id,
      status: "SHORTLISTED",
    });
  }

  static async removeCandidateFromShortlist(
    jobId: string,
    candidate_id: string
  ) {
    return await this.put(`/job/${jobId}/application`, {
      candidate_id,
      status: "APPLIED",
    });
  }

  static async hireCandidate(jobId: string, candidate_id: string) {
    return await this.put(`/job/${jobId}/application`, {
      candidate_id,
      status: "HIRED",
    });
  }
}
