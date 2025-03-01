import { JobApi } from "shared/api";

export class JobCreate {
  static async createJobHospitality(
    candidateData: Partial<IJobHospitalityForm>,
    details: Partial<IJobDetails>,
    sectorId: string
  ) {
    if (!candidateData.hospitalityRole || !candidateData.postcode) return;
    if (!details.location || !details.rateOfPay || !details.occupation) return;

    const data: IJob = {
      sector_id: sectorId,
      hospitality_filters: {
        hospitality_role_id: candidateData.hospitalityRole,
        hospitality_establishment_id:
          candidateData.hospitalityEstablishment !== "any"
            ? candidateData.hospitalityEstablishment
            : undefined,
      },
      years_experience_id:
        candidateData.yearsExperience !== "any"
          ? candidateData.yearsExperience
          : undefined,
      skills:
        (candidateData.skills && candidateData.skills[0] === "any") ||
        !candidateData.skills?.length
          ? undefined
          : candidateData.skills,
      postcode: candidateData.postcode,
      distance: candidateData.distance
        ? parseInt(candidateData.distance)
        : undefined,
      job_description: {
        location: details.location,
        rate_of_pay: parseFloat(details.rateOfPay),
        employment_type_id: details.occupation,
      },
      publish_job_immediately: true,
    };

    await JobApi.createJob(data);
  }

  static async createJobConstruction(
    candidateData: Partial<IJobConstructionForm>,
    details: Partial<IJobDetails>,
    sectorId: string
  ) {
    if (!candidateData.constructionRole || !candidateData.postcode) return;
    if (!details.location || !details.rateOfPay || !details.occupation) return;

    const data: IJob = {
      sector_id: sectorId,
      construction_filters: {
        construction_role_id: candidateData.constructionRole,
        construction_card_type_id:
          candidateData.constructionCardType !== "any"
            ? candidateData.constructionCardType
            : undefined,
      },
      years_experience_id:
        candidateData.yearsExperience !== "any"
          ? candidateData.yearsExperience
          : undefined,
      postcode: candidateData.postcode,
      distance: candidateData.distance
        ? parseInt(candidateData.distance)
        : undefined,
      job_description: {
        location: details.location,
        rate_of_pay: parseFloat(details.rateOfPay),
        employment_type_id: details.occupation,
      },
      publish_job_immediately: true,
    };

    await JobApi.createJob(data);
  }

  static async createJobIndustrial(
    candidateData: Partial<IJobIndustrialForm>,
    details: Partial<IJobDetails>,
    sectorId: string
  ) {
    if (!candidateData.industrialRole || !candidateData.postcode)
      throw new Error("Missing required fields");
    if (!details.location || !details.rateOfPay || !details.occupation)
      throw new Error("Missing required fields");

    const data: IJob = {
      sector_id: sectorId,
      industrial_and_driving_filters: {
        industrial_and_driving_role_id: candidateData.industrialRole,
        industrial_and_driving_licences:
          candidateData.industrialLicence &&
          candidateData.industrialLicence[0] !== "any"
            ? candidateData.industrialLicence
            : undefined,
        industrial_and_driving_availabilities:
          candidateData.industrialAvailability &&
          candidateData.industrialAvailability[0] !== "any"
            ? candidateData.industrialAvailability
            : undefined,
      },
      years_experience_id:
        candidateData.yearsExperience !== "any"
          ? candidateData.yearsExperience
          : undefined,
      postcode: candidateData.postcode,
      distance: candidateData.distance
        ? parseInt(candidateData.distance)
        : undefined,
      job_description: {
        location: details.location,
        rate_of_pay: parseFloat(details.rateOfPay),
        employment_type_id: details.occupation,
      },
      publish_job_immediately: true,
    };

    await JobApi.createJob(data);
  }
}
