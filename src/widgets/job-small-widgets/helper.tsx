import { NameAndRoleCell, PhoneActionCell } from "shared/ui";

interface IGetTableRows {
  candidates: IApplicationCandidate[];
  experience: INormalizedExperienceData;
}

export const getTableRows = ({ candidates, experience }: IGetTableRows) => {
  const {
    yearsExperience,
    hospitalityRoles,
    constructionRoles,
    hospitalityEstablishments,
    constructionCardTypes,
    industrialAndDrivingRoles,
  } = experience;

  return candidates.map((candidate) => {
    const { user } = candidate;

    const { first_name, last_name, phone_number, postcode, candidate_data } =
      user || candidate;

    const { years_experience_id } = candidate_data;

    const yearsExperienceData = yearsExperience[years_experience_id];

    const hospitalityEstablishmentId =
      candidate_data.hospitality_main_establishment_id;
    const constructionCardTypeId = candidate_data.construction_card_type_id;

    const establishment =
      (hospitalityEstablishmentId &&
        hospitalityEstablishments[hospitalityEstablishmentId]?.value) ??
      (constructionCardTypeId &&
        constructionCardTypes[constructionCardTypeId]?.value);

    const hospitalityRoleId = candidate_data.hospitality_first_role_id;
    const constructionRoleId = candidate_data.construction_role_id;
    const industrialRoleId = candidate_data.industrial_and_driving_role_id;

    const role =
      (hospitalityRoleId && hospitalityRoles[hospitalityRoleId]?.value) ??
      (constructionRoleId && constructionRoles[constructionRoleId]?.value) ??
      (industrialRoleId && industrialAndDrivingRoles[industrialRoleId]?.value);

    return {
      nameAndRole: (
        <NameAndRoleCell
          name={first_name}
          lastName={last_name}
          role={role}
          establishment={establishment}
        />
      ),
      yearsExperience: yearsExperienceData?.value,
      postcode: postcode,
      phone: <PhoneActionCell phone={phone_number} />,
    };
  });
};
