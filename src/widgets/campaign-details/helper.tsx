import { LongTextCell } from "shared/ui";
import style from "./campaignDetails.module.css";

export const normalizeCampaignDetails = (
  detail: ICampaignData,
  experience: INormalizedExperienceData
): INormalizedCampaignData => {
  const {
    hospitalityRoles,
    constructionRoles,
    hospitalityEstablishments,
    constructionCardTypes,
    yearsExperience,
    employmentTypes,
    industrialAndDrivingRoles,
    sectors,
  } = experience;

  const smsHistory = detail.sms_campaign_history.map((item) => {
    const date = new Date(item.created_at).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      date,
      message: <LongTextCell className={style.longText} text={item.message} />,
      candidates: detail.amount_of_candidates.toString(),
    };
  });

  if (detail.job) {
    const jobDetails = {
      rateOfPay: detail.job.rate_of_pay,
      location: detail.job.location,
      employmentType:
        detail.job.employment_type_id &&
        employmentTypes[detail.job.employment_type_id]?.value,
    };

    return {
      id: detail.id,
      sector: sectors[detail.job.sector_id]?.value,
      role: getRole(detail.job),
      establishment: getEstablishment(detail.job),
      yearsExperience: getYearsExperience(detail.job),
      postcode: detail.job.postcode,
      distance: detail.job.distance,
      amountOfCandidates: detail.amount_of_candidates,
      message: detail.sms_campaign_history[0].message,
      creditsSpent: detail.credits_spent,
      status: detail.status,
      jobDetails,
      smsHistory,
    };
  }

  if (detail.sms_campaign_filter) {
    return {
      id: detail.id,
      sector: sectors[detail.sms_campaign_filter.sector_id]?.value,
      role: getRole(detail.sms_campaign_filter),
      establishment: getEstablishment(detail.sms_campaign_filter),
      yearsExperience: getYearsExperience(detail.sms_campaign_filter),
      postcode: detail.sms_campaign_filter.postcode,
      distance: detail.sms_campaign_filter.distance,
      amountOfCandidates: detail.amount_of_candidates,
      message: detail.sms_campaign_history[0].message,
      creditsSpent: detail.credits_spent,
      status: detail.status,
      smsHistory,
    };
  }

  return {
    id: detail.id,
    sector: "Any",
    role: "Any",
    establishment: "Any",
    yearsExperience: "Any",
    postcode: "Any",
    distance: "Any",
    amountOfCandidates: detail.amount_of_candidates,
    message: detail.sms_campaign_history[0].message,
    creditsSpent: detail.credits_spent,
    status: detail.status,
    jobDetails: {
      rateOfPay: "Any",
      location: "Any",
      employmentType: "Any",
    },
    smsHistory,
  };

  function getRole(detail: ICampaignJobData | ICampaignFilterData) {
    if (detail.hospitality_role_id)
      return hospitalityRoles[detail.hospitality_role_id]?.value || "Any";
    if (detail.construction_role_id)
      return constructionRoles[detail.construction_role_id]?.value || "Any";
    if (detail.industrial_and_driving_role_id)
      return (
        industrialAndDrivingRoles[detail.industrial_and_driving_role_id]
          ?.value || "Any"
      );
    return "Any";
  }

  function getEstablishment(detail: ICampaignJobData | ICampaignFilterData) {
    if (detail.hospitality_establishment_id)
      return (
        hospitalityEstablishments[detail.hospitality_establishment_id]?.value ||
        "Any"
      );
    if (detail.construction_card_type_id)
      return (
        constructionCardTypes[detail.construction_card_type_id]?.value || "Any"
      );
    return "Any";
  }

  function getYearsExperience(detail: ICampaignJobData | ICampaignFilterData) {
    if (detail.years_experience_id)
      return yearsExperience[detail.years_experience_id]?.value || "Any";
    return "Any";
  }
};
