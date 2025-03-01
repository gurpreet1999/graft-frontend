import { Card } from "shared/ui";
import style from "./style.module.css";

interface ISearchFields {
  sector: ISuggestion;
  fields: Partial<ISearchForms>;
}

export const renderCampaignInfo = (
  prevCampaign: INormalizedCampaignData | undefined,
  companyName: string
) => {
  if (!prevCampaign) return null;

  const { amountOfCandidates } = prevCampaign;

  return (
    <Card className={style.card}>
      <div className={style.card__header}>Campaign Info</div>
      <div className={style.card__wrapper}>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Company Name</p>
            <p className={style.card__item_value}>{companyName}</p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Contact Method</p>
            <p className={style.card__item_value}>SMS</p>
          </div>
        </div>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Reached Candidates</p>
            <p className={style.card__item_value}>{amountOfCandidates}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const renderHospitalityJobInfo = (
  searchFields?: ISearchFields,
  experience?: INormalizedExperienceData
) => {
  if (
    !searchFields ||
    searchFields.sector.value !== "Hospitality" ||
    !experience
  )
    return null;

  const {
    hospitalityRole,
    hospitalityEstablishment,
    yearsExperience,
    postcode,
    distance,
    skills,
  } = searchFields.fields as ISearchHospitalityForm;

  return (
    <Card className={style.card}>
      <div className={style.card__header}>Job Info</div>
      <div className={style.card__wrapper}>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Sector</p>
            <p className={style.card__item_value}>
              {searchFields.sector.value}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Establishment</p>
            <p className={style.card__item_value}>
              {hospitalityEstablishment &&
                experience?.hospitalityEstablishments[hospitalityEstablishment]
                  .value}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Distance</p>
            <p className={style.card__item_value}>
              {distance ? `${distance} km` : "Any"}
            </p>
          </div>
        </div>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Role</p>
            <p className={style.card__item_value}>
              {experience?.hospitalityRoles[hospitalityRole]?.value || null}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Years experience</p>
            <p className={style.card__item_value}>
              {experience?.yearsExperience[yearsExperience]?.value || "Any"}
            </p>
          </div>
          {
            <div className={style.card__item}>
              <p className={style.card__item_title}>Postcode</p>
              <p className={style.card__item_value}>
                {postcode ? postcode : "N/A"}
              </p>
            </div>
          }
        </div>
      </div>
      <div className={style.card__skills}>
        <p className={style.card__item_title}>Skills</p>
        <p className={style.card__item_value}>
          {skills
            ?.map((skill) => experience?.skills[skill]?.value)
            .join(", ") || "Any"}
        </p>
      </div>
    </Card>
  );
};

export const renderConstructionJobInfo = (
  searchFields?: ISearchFields,
  experience?: INormalizedExperienceData
) => {
  if (
    !searchFields ||
    searchFields.sector.value !== "Construction" ||
    !experience
  )
    return null;

  const {
    constructionCardType,
    constructionRole,
    yearsExperience,
    postcode,
    distance,
  } = searchFields.fields as ISearchConstructionForm;

  return (
    <Card className={style.card}>
      <div className={style.card__header}>Job Info</div>
      <div className={style.card__wrapper}>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Sector</p>
            <p className={style.card__item_value}>
              {searchFields.sector.value}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Card Type</p>
            <p className={style.card__item_value}>
              {constructionCardType &&
                (constructionCardType === "any"
                  ? "Any"
                  : experience?.constructionCardTypes[constructionCardType]
                      ?.value)}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Distance</p>
            <p className={style.card__item_value}>
              {distance ? `${distance} km` : "Any"}
            </p>
          </div>
        </div>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Role</p>
            <p className={style.card__item_value}>
              {experience?.constructionRoles[constructionRole]?.value || null}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Years experience</p>
            <p className={style.card__item_value}>
              {experience?.yearsExperience[yearsExperience]?.value || "Any"}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Postcode</p>
            <p className={style.card__item_value}>{postcode || "Any"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const renderIndustrialJobInfo = (
  searchFields?: ISearchFields,
  experience?: INormalizedExperienceData
) => {
  if (
    !searchFields ||
    searchFields.sector.value !== "Industrial & Driving" ||
    !experience
  )
    return null;

  const {
    industrialRole,
    industrialLicence,
    industrialAvailability,
    yearsExperience,
    postcode,
    distance,
  } = searchFields.fields as ISearchIndustrialForm;

  return (
    <Card className={style.card}>
      <div className={style.card__header}>Job Info</div>
      <div className={style.card__wrapper}>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Sector</p>
            <p className={style.card__item_value}>
              {searchFields.sector.value}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Licences</p>
            <p className={style.card__item_value}>
              {industrialLicence
                ?.map(
                  (licence) =>
                    experience?.industrialAndDrivingLicences[licence]?.value
                )
                .join(", ") || "Any"}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Availability</p>
            <p className={style.card__item_value}>
              {industrialAvailability
                ?.map(
                  (availability) =>
                    experience?.industrialAndDrivingAvailabilities[availability]
                      ?.value
                )
                .join(", ") || "Any"}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Postcode</p>
            <p className={style.card__item_value}>{postcode || "Any"}</p>
          </div>
        </div>
        <div className={style.card__list}>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Role</p>
            <p className={style.card__item_value}>
              {experience?.industrialAndDrivingRoles[industrialRole]?.value ||
                null}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Years experience</p>
            <p className={style.card__item_value}>
              {experience?.yearsExperience[yearsExperience]?.value || "Any"}
            </p>
          </div>
          <div className={style.card__item}>
            <p className={style.card__item_title}>Distance</p>
            <p className={style.card__item_value}>
              {distance ? `${distance} km` : "Any"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
