import { CampaignApi } from "shared/api/campaign/lib";

export class Campaign {
  private static getFilters(
    campaignData: ISearchState
  ): IFiltersCreateCampaign {
    const { sector, fields } = campaignData;
    const filters: IFiltersCreateCampaign = {
      sector_id: sector.id,
      years_experience_id:
        fields.yearsExperience === "any" ? undefined : fields.yearsExperience,

      postcode: fields.postcode === "" ? undefined : fields.postcode,
      distance: fields.distance === "" ? undefined : parseInt(fields.distance),
      verified: false,
    };

    if ("hospitalityRole" in fields) {
      filters.hospitality_filters = {
        hospitality_role_id: fields.hospitalityRole,
        hospitality_establishment_id: fields.hospitalityEstablishment || "",
      };
      filters.skills =
        fields.skills && fields.skills[0] === "any" ? undefined : fields.skills;
    } else if ("constructionRole" in fields) {
      filters.construction_filters = {
        construction_role_id: fields.constructionRole,
        construction_card_type_id:
          fields.constructionCardType === "any"
            ? undefined
            : fields.constructionCardType,
      };
    } else if ("industrialRole" in fields) {
      filters.industrial_and_driving_filters = {
        industrial_and_driving_role_id: fields.industrialRole,
        industrial_and_driving_licences:
          fields.industrialLicence[0] === "any"
            ? undefined
            : fields.industrialLicence,
      };
    }

    return filters;
  }

  static async createCampaign(
    campaignData: ISearchState,
    message: string,
    candidatesNumber: string
  ) {
    const filters = this.getFilters(campaignData);

    const data: ICreateCampaignData = {
      filters: filters,
      message: message,
      amount_of_candidates: parseInt(candidatesNumber),
    };

    await CampaignApi.createSearchCampaign(data);
  }

  static async createJobCampaign(
    jobId: string,
    message: string,
    candidatesNumber: string,
    jobVariant: "Matches" | "Applied" | "Shortlisted" | "Hired"
  ) {
    switch (jobVariant) {
      case "Matches":
        await CampaignApi.createJobCampaign(jobId, message, candidatesNumber);
        break;
      case "Shortlisted":
        await CampaignApi.createJobShortlistedCampaign(
          jobId,
          message,
          candidatesNumber
        );
        break;
      case "Applied":
        await CampaignApi.createJobAppliedCampaign(
          jobId,
          message,
          candidatesNumber
        );
        break;
      default:
        break;
    }
  }
}
