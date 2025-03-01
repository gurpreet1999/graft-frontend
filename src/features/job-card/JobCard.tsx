import { Button, GradientCard } from "shared/ui";
import style from "./JobCard.module.css";
import { useGetSuggestions } from "shared/hooks";
import classNames from "classnames";

interface IJobCard {
  data: any;
  handleShowDetails?: (id: string) => void;
  handleApply?: (id: string) => void;
  smallCard?: boolean;
  stepsClassName?: string;
}

export const JobCard = ({
  data,
  handleShowDetails,
  handleApply,
  smallCard,
  stepsClassName,
}: IJobCard) => {
  const {
    id,
    hospitality_establishment_id,
    hospitality_role_id,
    construction_card_type_id,
    construction_role_id,
    industrial_and_driving_role_id,
    user,
    location,
    sector_id,
    rate_of_pay: rate,
  } = data.job ? data.job : data;

  const { status } = data;

  const { experience } = useGetSuggestions();

  if (!experience) return null;

  const {
    hospitalityRoles,
    constructionRoles,
    hospitalityEstablishments,
    constructionCardTypes,
    industrialAndDrivingRoles,
    sectors,
  } = experience;

  const jobSector = sectors[sector_id]?.value;

  const role =
    hospitalityRoles[hospitality_role_id]?.value ??
    constructionRoles[construction_role_id]?.value ??
    industrialAndDrivingRoles[industrial_and_driving_role_id]?.value ??
    "Any";

  const establishment =
    hospitalityEstablishments[hospitality_establishment_id]?.value ??
    constructionCardTypes[construction_card_type_id]?.value ??
    "Any";

  return (
    <GradientCard
      className={classNames(style.container, smallCard && style.small)}
    >
      {stepsClassName && (
        <div className={classNames(style.anchor, stepsClassName)}></div>
      )}
      <div className={style.job__description}>
        <div className={style.company}>
          <p className={style.company__name}>
            {user.recruiter_data.company_name}
          </p>
          <p className={style.company__location}>{location}</p>
        </div>
        <div className={style.role}>
          <p className={style.role__name}>{role}</p>
          {jobSector !== "Industrial & Driving" && (
            <p className={style.role__establishment}>{establishment}</p>
          )}
        </div>
      </div>
      <div className={style.job__action}>
        <div className={style.sallary}>£{rate}/h</div>
        <div className={style.buttons}>
          <Button
            variant="primary"
            onClick={() => {
              handleShowDetails && handleShowDetails(id);
            }}
            className={style.button}
          >
            Details
          </Button>
          {status === "PUBLISHED" && (
            <Button
              variant="primaryBlue"
              onClick={() => {
                handleApply && handleApply(id);
              }}
              className={style.button}
            >
              Apply
            </Button>
          )}
        </div>
      </div>
    </GradientCard>
  );
};
