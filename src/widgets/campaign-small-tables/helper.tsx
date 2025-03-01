import { NameAndRoleCell } from "shared/ui";
import style from "./candidates-list/canidatesList.module.css";

interface IGetTableRows {
  candidates: ICandidateInfo[];
  experience: INormalizedExperienceData;
}

export const getTableRows = ({ candidates, experience }: IGetTableRows) => {
  const {
    yearsExperience,
    hospitalityRoles,
    constructionRoles,
    hospitalityEstablishments,
    constructionCardTypes,
  } = experience;

  return candidates.map((candidate) => {
    const { first_name, last_name, postcode, candidate_data } = candidate;

    const { years_experience_id } = candidate_data;

    const yearsExperienceData = yearsExperience[years_experience_id];

    const establishment = candidate_data.hospitality_main_establishment_id
      ? hospitalityEstablishments[
          candidate_data.hospitality_main_establishment_id
        ].value
      : (candidate_data.construction_card_type_id &&
          constructionCardTypes[candidate_data.construction_card_type_id]
            .value) ||
        "N/A";

    const role = candidate_data.hospitality_first_role_id
      ? hospitalityRoles[candidate_data.hospitality_first_role_id].value
      : (candidate_data.construction_role_id &&
          constructionRoles[candidate_data.construction_role_id].value) ||
        "N/A";

    return {
      nameAndRole: (
        <NameAndRoleCell
          name={first_name}
          lastName={last_name}
          role={role}
          className={style.nameAndRole}
        />
      ),
      yearsExperience: yearsExperienceData?.value,
      establishment,
      postcode: postcode,
    };
  });
};
