import { ISearchSendData, SearchApi } from "shared/api/search/lib";
import { formatTableData } from "./helpers";

export class Search extends SearchApi {
  private static filterAnyOption(field?: string[] | string) {
    const isArrayWithoutAny =
      Array.isArray(field) && field.every((item) => item !== "any");
    const isStringNotAny = typeof field === "string" && field !== "any";

    if (isArrayWithoutAny || isStringNotAny) {
      return field;
    }

    return undefined;
  }

  private static getRole = (
    sector: ISuggestion,
    experience: INormalizedExperienceData,
    roleId: string
  ) => {
    switch (sector.value) {
      case "Hospitality":
        return experience.hospitalityRoles[roleId].value;
      case "Construction":
        return experience.constructionRoles[roleId].value;
      default:
        return experience.industrialAndDrivingRoles[roleId].value;
    }
  };

  private static getEstablishment = (
    sector: ISuggestion,
    experience: INormalizedExperienceData,
    establishmentId: string
  ) => {
    if (sector.value === "Hospitality") {
      return experience.hospitalityEstablishments[establishmentId].value;
    }
    if (sector.value === "Construction") {
      return experience.constructionCardTypes[establishmentId].value;
    }
  };

  private static formatArray(
    items: string[],
    dictionary: { [id: string]: ISuggestion }
  ): string {
    return items
      .map((item: string) => dictionary[item] && dictionary[item].value)
      .filter((item) => item !== undefined)
      .join(", ");
  }

  static async getTableData(
    sector: ISuggestion,
    fields: Partial<ISearchForms>,
    pageSize: number = 10,
    currentPage: number = 1,
    experience: INormalizedExperienceData
  ) {
    if (!fields.yearsExperience) {
      return { table: [], totalItems: 0 };
    }
    if (
      sector.value === "Construction" &&
      (fields as ISearchHospitalityForm).hospitalityEstablishment
    )
      return;
    if (
      sector.value === "Hospitality" &&
      (fields as ISearchConstructionForm).constructionCardType
    )
      return;
    const dataToSend: ISearchSendData = {
      sector_id: sector.id,
      years_experience_id:
        fields.yearsExperience === "any" ? undefined : fields.yearsExperience,
      postcode: fields.postcode || undefined,
      distance: (fields.distance && parseInt(fields.distance)) || undefined,
      verified: "",
    };

    if (sector.value === "Hospitality") {
      const { hospitalityRole, hospitalityEstablishment, skills } =
        fields as ISearchHospitalityForm;
      dataToSend.hospitality_role_id = hospitalityRole;
      dataToSend.hospitality_establishment_id = hospitalityEstablishment;
      dataToSend.skill_ids = this.filterAnyOption(skills) as string[];
    } else if (sector.value === "Construction") {
      const { constructionRole, constructionCardType } =
        fields as ISearchConstructionForm;
      dataToSend.construction_role_id = constructionRole;
      dataToSend.construction_card_type_id = this.filterAnyOption(
        constructionCardType
      ) as string;
    } else if (sector.value === "Industrial & Driving") {
      const { industrialRole, industrialLicence, industrialAvailability } =
        fields as ISearchIndustrialForm;
      dataToSend.industrial_and_driving_role_id = industrialRole;
      dataToSend.industrial_and_driving_licence_ids = this.filterAnyOption(
        industrialLicence
      ) as string[];
      dataToSend.industrial_and_driving_availability_ids = this.filterAnyOption(
        industrialAvailability
      ) as string[];
    }

    if (fields?.postcode) {
      dataToSend.postcode = fields.postcode;
    }

    const res = await this.getSearchedCandidates(
      dataToSend,
      pageSize,
      currentPage
    );

    if (!res.candidates) return { table: [], totalItems: 0 };

    const { skills, yearsExperience, industrialAndDrivingLicences } =
      experience;

    const table = res.candidates.map((candidate: any) => {
      const name = candidate.first_name;
      const lastName = candidate.last_name;
      const hospitalityFirstRoleId =
        candidate?.candidate_data?.hospitality_first_role_id;
      const constructionRoleId = candidate.candidate_data.construction_role_id;
      const industrialAndDrivingRoleId =
        candidate?.candidate_data?.industrial_and_driving_role_id;

      const role = this.getRole(
        sector,
        experience,
        hospitalityFirstRoleId ||
          constructionRoleId ||
          industrialAndDrivingRoleId
      );

      const hospitalityMainEstablishmentId =
        candidate.candidate_data.hospitality_main_establishment_id;
      const constructionCardTypeId =
        candidate.candidate_data.construction_card_type_id;

      const establishment = this.getEstablishment(
        sector,
        experience,
        hospitalityMainEstablishmentId || constructionCardTypeId
      );

      return formatTableData({
        name,
        lastName,
        role,
        establishment,
        status: candidate.candidate_data.verified,
        licences: this.formatArray(
          candidate.candidate_data.industrial_and_driving_licences,
          industrialAndDrivingLicences
        ),
        skills: this.formatArray(candidate.candidate_data.skills, skills),
        yearsExperience:
          yearsExperience[candidate.candidate_data.years_experience_id].value,
        postcode: candidate.postcode,
        distance:
          candidate.distance_km !== null
            ? `${parseFloat(candidate.distance_km.toFixed(1))} km`
            : undefined,
        candidateId: candidate.candidate_data.id,
      });
    });

    return {
      table,
      totalItems: res.total_count,
    };
  }
}
