import { useState } from "react";
import { Button, GradientCard } from "shared/ui";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
import arrowIcon from "assets/images/arrow-down.svg";

interface ICampaignListsProps {
  campaigns: ICampaignsState;
  establishmentFilter: ISuggestion;
  roleFilter: ISuggestion;
  sector?: string;
}

export const CampaignLists = ({
  campaigns,
  establishmentFilter,
  roleFilter,
  sector,
}: ICampaignListsProps) => {
  const [visibleLists, setVisibleLists] = useState<{ [key: string]: boolean }>(
    {}
  );

  const isEstablishmentFilterAll =
    establishmentFilter.id === "All" || !establishmentFilter;
  const isRoleFilterAll = roleFilter.id === "All" || !roleFilter;

  const toggleVisibility = (key: string) => {
    setVisibleLists((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredKeys = Object.keys(campaigns).filter((key) => {
    if (isEstablishmentFilterAll && isRoleFilterAll) {
      return true;
    }
    if (isEstablishmentFilterAll) {
      return campaigns[key].some(
        (campaign) => campaign.role === roleFilter.value
      );
    }
    if (isRoleFilterAll) {
      return key === establishmentFilter.value;
    }
    return (
      key === establishmentFilter.value &&
      campaigns[key].some((campaign) => campaign.role === roleFilter.value)
    );
  });

  return (
    <div className={style.container}>
      {filteredKeys.map((key) => (
        <div
          key={key}
          className={classNames(
            style.establishment__container,
            visibleLists[key] ? style._hide : ""
          )}
        >
          {sector !== "Industrial & Driving" && (
            <button
              className={style.establishment__key}
              onClick={() => toggleVisibility(key)}
            >
              {key} ({campaigns[key].length}) <img src={arrowIcon} alt="" />
            </button>
          )}
          <div className={style.establishment__list}>
            {campaigns[key]
              .filter((campaign) => {
                if (isRoleFilterAll) return true;
                return campaign.role === roleFilter.value;
              })
              .map((campaign) => (
                <GradientCard
                  key={campaign.id}
                  className={style.establishment__item}
                >
                  <div className={style.establishment__wrapper}>
                    {campaign.sector !== "Industrial & Driving" && (
                      <p>{campaign.role}</p>
                    )}
                    <p>{campaign.candidates}</p>
                  </div>
                  <div className={style.establishment__wrapper}>
                    {campaign.sector !== "Industrial & Driving" ? (
                      <p>{campaign.establishment}</p>
                    ) : (
                      <p>{campaign.role}</p>
                    )}
                    <Link to={`/campaign/details/${campaign.id}`}>
                      <Button variant="primary" className={style.button}>
                        Details
                      </Button>
                    </Link>
                  </div>
                </GradientCard>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
