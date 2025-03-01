import {
  Button,
  EmptyState,
  SectorToggler,
  Select,
  TabButton,
} from "shared/ui";
import style from "./campaigns.module.css";
import { useGetSuggestions } from "shared/hooks";
import { useEffect, useState } from "react";
import { CampaignApi } from "shared/api/campaign/lib";
import {
  AllCardTypes,
  AllEstablishments,
  AllRoles,
  filterCampaignsArray,
  getEstablishmentFilter,
} from "./helpers";
import { CampaignLists } from "features/render-campaign-list";
import { Link } from "react-router-dom";

export const Campaigns = () => {
  const { experience, suggestions } = useGetSuggestions();
  const [tab, setTab] = useState<"ACTIVE" | "ARCHIVED">("ACTIVE");
  const [campaigns, setCampaigns] = useState<ICampaignsState | undefined>();
  const [sector, setSector] = useState(suggestions?.sectors[0]);

  const [establishmentFilter, setEstablishmentFilter] =
    useState<ISuggestion>(AllEstablishments);
  const [roleFilter, setRoleFilter] = useState<ISuggestion>(AllRoles);

  useEffect(() => {
    setEstablishmentFilter(
      getEstablishmentFilter(sector?.value || "Hospitality")
    );
    setRoleFilter(AllRoles);
  }, [sector]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      await CampaignApi.getCampaigns(tab).then((res) => {
        if (!experience || !sector) return;
        setCampaigns(filterCampaignsArray(res, experience, sector.value));
      });
    };
    fetchCampaigns();
  }, [tab, experience, sector, suggestions]);

  useEffect(() => {
    if (!suggestions) return;
    setSector(suggestions.sectors[0]);
  }, [suggestions]);

  const handleEstablishmentChange = (value: string) => {
    if (sector?.value === "Hospitality") {
      if (experience?.hospitalityEstablishments[value]) {
        return setEstablishmentFilter(
          experience.hospitalityEstablishments[value]
        );
      }
      return setEstablishmentFilter(AllEstablishments);
    }
    if (sector?.value === "Construction") {
      if (experience?.constructionCardTypes[value]) {
        return setEstablishmentFilter(experience.constructionCardTypes[value]);
      }
      return setEstablishmentFilter(AllCardTypes);
    }
  };

  const handleRoleChange = (value: string) => {
    if (sector?.value === "Hospitality") {
      if (experience?.hospitalityRoles[value]) {
        return setRoleFilter(experience.hospitalityRoles[value]);
      }
    }
    if (sector?.value === "Construction") {
      if (experience?.constructionRoles[value]) {
        return setRoleFilter(experience.constructionRoles[value]);
      }
    }
    if (sector?.value === "Industrial & Driving") {
      if (experience?.industrialAndDrivingRoles[value]) {
        return setRoleFilter(experience.industrialAndDrivingRoles[value]);
      }
    }
    return setRoleFilter(AllRoles);
  };

  const getEstablishmentOptions = () => {
    if (!suggestions) return [];
    if (sector?.value === "Hospitality") {
      return [...suggestions.hospitalityEstablishments, AllEstablishments];
    }
    if (sector?.value === "Construction") {
      return [...suggestions.constructionCardTypes, AllCardTypes];
    }
    return [];
  };

  const getRoleOptions = () => {
    if (!suggestions) return [];
    if (sector?.value === "Hospitality") {
      return [...suggestions.hospitalityRoles, AllRoles];
    }
    if (sector?.value === "Construction") {
      return [...suggestions.constructionRoles, AllRoles];
    }
    if (sector?.value === "Industrial & Driving") {
      return [...suggestions.industrialAndDrivingRoles, AllRoles];
    }
    return [];
  };

  return (
    <div className={style.container}>
      <div className={style.sectors}>
        {suggestions && sector && (
          <SectorToggler
            activeSector={sector}
            sectors={suggestions?.sectors}
            handleChangeSector={(value) => {
              setSector(experience?.sectors[value]);
            }}
          />
        )}
      </div>
      <div className={style.settings}>
        <div className={style.tabs}>
          <TabButton
            className={style.button}
            tabName="ACTIVE"
            currentTab={tab}
            changeTab={setTab}
          >
            Active
          </TabButton>
          <TabButton
            className={style.button}
            tabName="ARCHIVED"
            currentTab={tab}
            changeTab={setTab}
          >
            Archived
          </TabButton>
        </div>
        <div className={style.selects}>
          {suggestions && (
            <>
              {sector?.value !== "Industrial & Driving" && (
                <Select
                  options={getEstablishmentOptions()}
                  value={establishmentFilter}
                  onChange={handleEstablishmentChange}
                  smallOnMobile
                />
              )}
              <Select
                options={getRoleOptions()}
                value={roleFilter}
                onChange={handleRoleChange}
                smallOnMobile
              />
            </>
          )}
        </div>
      </div>
      <div className={style.campaigns__list}>
        {campaigns ? (
          <CampaignLists
            campaigns={campaigns}
            establishmentFilter={establishmentFilter}
            roleFilter={roleFilter}
            sector={sector?.value}
          />
        ) : (
          <>
            {tab === "ACTIVE" && (
              <EmptyState
                text={
                  <>
                    <p>You haven&apos;t created any campaigns yet.</p>
                    <p className="empty__bold">Try creating one!</p>
                  </>
                }
                button={
                  <Link to="/search">
                    <Button className="empty__button">Search Candidates</Button>
                  </Link>
                }
              />
            )}
            {tab === "ARCHIVED" && (
              <EmptyState
                text={"You don't have Archived campaigns at the moment."}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
