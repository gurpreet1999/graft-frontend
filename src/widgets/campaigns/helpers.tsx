export type EstablishmentCard = {
  sector: string;
  role: string;
  establishment: string;
  candidates: number;
  id: string;
};

export const filterCampaignsArray = (
  campaigns: ICampaignData[],
  experience: INormalizedExperienceData,
  sector: string
): ICampaignsState => {
  const result: {
    [sector: string]: { [establishment: string]: EstablishmentCard[] };
  } = {};

  campaigns.forEach((campaign) => {
    const {
      hospitalityRoles,
      hospitalityEstablishments,
      constructionRoles,
      constructionCardTypes,
      industrialAndDrivingRoles,
    } = experience;

    if (campaign.job) {
      const {
        hospitality_role_id,
        hospitality_establishment_id,
        construction_role_id,
        construction_card_type_id,
        sector_id,
        industrial_and_driving_role_id,
      } = campaign.job;

      const sector = experience.sectors[sector_id].value;

      let role, establishment;

      if (hospitality_role_id) {
        role = hospitalityRoles[hospitality_role_id].value;
      }

      if (hospitality_establishment_id) {
        establishment =
          hospitalityEstablishments[hospitality_establishment_id].value;
      }

      if (construction_role_id) {
        role = constructionRoles[construction_role_id].value;
      }

      if (industrial_and_driving_role_id) {
        role = industrialAndDrivingRoles[industrial_and_driving_role_id].value;
      }

      if (construction_card_type_id) {
        establishment = constructionCardTypes[construction_card_type_id].value;
      }

      if (!establishment)
        establishment =
          sector === "Hospitality" ? "Any Establishment" : "Any Card Type";

      if (!role) return;

      if (!result[sector]) {
        result[sector] = {};
      }

      if (!result[sector][establishment]) {
        result[sector][establishment] = [];
      }

      result[sector][establishment].push({
        sector: sector,
        role: role,
        establishment: establishment,
        candidates: campaign.amount_of_candidates,
        id: campaign.id,
      });
    }
    if (campaign.sms_campaign_filter) {
      const {
        hospitality_role_id,
        hospitality_establishment_id,
        construction_role_id,
        construction_card_type_id,
        industrial_and_driving_role_id,
        sector_id,
      } = campaign.sms_campaign_filter;

      const sector = experience.sectors[sector_id].value;

      let role, establishment;

      if (hospitality_role_id) {
        role = hospitalityRoles[hospitality_role_id].value;
      }

      if (hospitality_establishment_id) {
        establishment =
          hospitalityEstablishments[hospitality_establishment_id].value;
      }

      if (construction_role_id) {
        role = constructionRoles[construction_role_id].value;
      }

      if (construction_card_type_id) {
        establishment = constructionCardTypes[construction_card_type_id].value;
      }

      if (industrial_and_driving_role_id) {
        role = industrialAndDrivingRoles[industrial_and_driving_role_id].value;
      }

      if (!establishment)
        establishment =
          sector === "Hospitality" ? "Any Establishment" : "Any Card Type";

      if (!role) return;

      if (!result[sector]) {
        result[sector] = {};
      }

      if (!result[sector][establishment]) {
        result[sector][establishment] = [];
      }

      result[sector][establishment].push({
        sector: sector,
        role: role,
        establishment: establishment,
        candidates: campaign.amount_of_candidates,
        id: campaign.id,
      });
    }
  });

  return result[sector];
};

export const AllEstablishments: ISuggestion = {
  value: "All Establisments",
  id: "All",
};

export const AllRoles: ISuggestion = {
  value: "All Roles",
  id: "All",
};

export const AllCardTypes: ISuggestion = {
  value: "All Card Types",
  id: "All",
};

export const getEstablishmentFilter = (sector: string) => {
  return sector === "Hospitality" ? AllEstablishments : AllCardTypes;
};
