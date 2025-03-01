import { JobApi } from "shared/api";

export class JobDetailsClass extends JobApi {
  static async getJobDetailsData(
    id: string,
    experience: INormalizedExperienceData
  ) {
    const response = await this.getJobDetails(id);
    const {
      skills,
      yearsExperience,
      hospitalityRoles,
      constructionRoles,
      hospitalityEstablishments,
      constructionCardTypes,
      sectors,
      employmentTypes,
      industrialAndDrivingRoles,
      industrialAndDrivingLicences,
      industrialAndDrivingAvailabilities,
    } = experience;

    return {
      ...response,
      sector: sectors[response.sector_id]?.value,
      yearsExperience: yearsExperience[response.years_experience_id]?.value,
      employmentType: employmentTypes[response.employment_type_id]?.value,
      skills: response.skill_ids.map(
        (id: string) => skills[id]?.value ?? "Any"
      ),
      experience: yearsExperience[response.years_experience_id]?.value ?? "Any",
      role:
        hospitalityRoles[response.hospitality_role_id]?.value ??
        constructionRoles[response.construction_role_id]?.value ??
        industrialAndDrivingRoles[response.industrial_and_driving_role_id]
          ?.value ??
        "Any",
      establishment:
        hospitalityEstablishments[response.hospitality_establishment_id]
          ?.value ??
        constructionCardTypes[response.construction_card_type_id]?.value ??
        "Any",
      licences: response.industrial_and_driving_licence_ids.map(
        (id: string) => industrialAndDrivingLicences[id]?.value ?? "Any"
      ),
      availability: response.industrial_and_driving_availability_ids.map(
        (id: string) => industrialAndDrivingAvailabilities[id]?.value ?? "Any"
      ),
    } satisfies INormalizedJobData;
  }
}
