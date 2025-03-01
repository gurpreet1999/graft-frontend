import { UpdateUserDataApi } from "shared/api/update/lib";

export class ExperienceChange {
  static async updateExperience(
    data: ICandidateExperience,
    sector: ISuggestion
  ) {
    const dataToSend = this.buildDataToSend(data, sector.value);

    if (Object.values(dataToSend).some((value) => value === "" || undefined)) {
      throw new Error("Please fill all fields");
    }

    await UpdateUserDataApi.updateExperience({
      ...dataToSend,
      sector_id: sector.id,
    });
  }

  static buildDataToSend(data: ICandidateExperience, sectorValue: string) {
    switch (sectorValue) {
      case "Hospitality":
        return {
          years_experience_id: data.yearsExperience || "",
          daily_job_update_id: data.dailyJobUpdate || "",
          hospitality_main_establishment_id:
            data.hospitalityMainEstablishment || "",
          hospitality_second_establishment_id:
            data.hospitalitySecondEstablishment || "",
          hospitality_first_role_id: data.hospitalityFirstRole || "",
          hospitality_second_role_id: data.hospitalitySecondRole || "",
          skills: data.skills || [""],
        };
      case "Construction":
        return {
          construction_card_type_id: data.constructionCardType || "",
          construction_role_id: data.constructionRole || "",
          years_experience_id: data.yearsExperience || "",
          daily_job_update_id: data.dailyJobUpdate || "",
        };
      default:
        return {
          industrial_and_driving_role_id: data.industrialRole || "",
          industrial_and_driving_licence_ids: data.industrialLicence || [],
          industrial_and_driving_availability_ids:
            data.industrialAvailability || [],
          daily_job_update_id: data.dailyJobUpdate || "",
          years_experience_id: data.yearsExperience || "",
        };
    }
  }

  static getCurrentExperience(
    userData: Partial<IUser>,
    experience: INormalizedExperienceData
  ) {
    if (!userData.candidate_data) return;

    const userSector = experience.sectors[userData.candidate_data.sector_id];
    const { candidate_data: candidateData } = userData;

    const sharedData = {
      yearsExperience: candidateData.years_experience_id,
      dailyJobUpdate: candidateData.daily_job_update_id,
    };

    switch (userSector.value) {
      case "Hospitality":
        return {
          userExperience: {
            ...sharedData,
            hospitalityMainEstablishment:
              candidateData.hospitality_main_establishment_id,
            hospitalitySecondEstablishment:
              candidateData.hospitality_second_establishment_id,
            hospitalityFirstRole: candidateData.hospitality_first_role_id,
            hospitalitySecondRole: candidateData.hospitality_second_role_id,
            skills: candidateData.skills,
          },
          sector: userSector,
        };
      case "Construction":
        return {
          userExperience: {
            ...sharedData,
            constructionCardType: candidateData.construction_card_type_id,
            constructionRole: candidateData.construction_role_id,
          },
          sector: userSector,
        };
      case "Industrial & Driving":
        return {
          userExperience: {
            ...sharedData,
            industrialRole: candidateData.industrial_and_driving_role_id,
            industrialLicence: candidateData.industrial_and_driving_licences,
            industrialAvailability:
              candidateData.industrial_and_driving_availabilities,
          },
          sector: userSector,
        };
      default:
        return;
    }
  }
}
