import {
  LongTextCell,
  NameAndRoleCell,
  StatusCell,
  WithImageCell,
  JobDetailsDeleteCell,
  EmptyState,
} from "shared/ui";
import style from "./jobTable.module.css";
import mathesIcon from "assets/images/jobs/user-list.png";
import { CreateJobsModal } from "widgets/create-job-modal";

interface IGetTableRows {
  jobs: IPostedJob[];
  handleDelete: (id: string) => void;
  handleDetails: (id: string) => void;
  experience: INormalizedExperienceData;
}

export const getTableRows = ({
  jobs,
  handleDelete,
  handleDetails,
  experience,
}: IGetTableRows) => {
  const {
    skills,
    yearsExperience,
    hospitalityRoles,
    constructionRoles,
    hospitalityEstablishments,
    constructionCardTypes,
    sectors,
    industrialAndDrivingRoles,
    industrialAndDrivingLicences,
  } = experience;

  return jobs.map((job) => {
    const {
      skills: skill_ids,
      years_experience_id,
      hospitality_role_id,
      construction_role_id,
      hospitality_establishment_id,
      construction_card_type_id,
      industrial_and_driving_role_id,
      sector_id,
      status,
      postcode,
      distance,
      industrial_and_driving_licences,
      id,
    } = job;

    const experienceData = yearsExperience[years_experience_id]?.value ?? "Any";
    const roleData =
      hospitalityRoles[hospitality_role_id]?.value ??
      constructionRoles[construction_role_id]?.value ??
      industrialAndDrivingRoles[industrial_and_driving_role_id]?.value ??
      "Any";

    let establishmentData: string =
      hospitalityEstablishments[hospitality_establishment_id]?.value ??
      constructionCardTypes[construction_card_type_id]?.value ??
      "Any";

    if (sectors[sector_id]?.value === "Industrial & Driving") {
      establishmentData = industrial_and_driving_licences.length
        ? industrial_and_driving_licences
            .map((id) => industrialAndDrivingLicences[id]?.value ?? "Any")
            .join(", ")
        : "Any";
    }

    let skillsData;

    if (sectors[sector_id]?.value === "Construction") {
      skillsData = ["-"];
    } else {
      skillsData = skill_ids.map((id) => skills[id]?.value ?? "Any");
    }

    const licences = industrial_and_driving_licences.map(
      (id) => industrialAndDrivingLicences[id]?.value ?? "Any"
    );

    return {
      id,
      role: (
        <NameAndRoleCell
          name={roleData}
          showTextOverflow
          establishment={establishmentData}
        />
      ),
      status: (
        <StatusCell status={status === "PUBLISHED" ? "Published" : "Draft"} />
      ),
      skills: (
        <LongTextCell text={skillsData.length ? skillsData.join(", ") : "-"} />
      ),
      experience: experienceData,
      postcode: <p style={{ minWidth: "70px" }}>{postcode}</p>,
      distance: distance ? `${distance} km` : "Any",
      matches: (
        <WithImageCell
          image={mathesIcon}
          text={String(job.total_shortlisted)}
        />
      ),
      applied: <WithImageCell text={String(job.total_applied)} />,
      button: (
        <JobDetailsDeleteCell
          id={id}
          handleDelete={() => {
            handleDelete(id);
          }}
          handleDetails={() => {
            handleDetails(id);
          }}
        />
      ),
      ...(sectors[sector_id]?.value === "Industrial & Driving" && {
        licences: (
          <LongTextCell text={licences.length ? licences.join(", ") : "-"} />
        ),
      }),
    };
  });
};

export const emptyState = (
  isJobCreated: boolean,
  setIsJobCreated: (value: boolean) => void
) => (
  <EmptyState
    text={
      <div>
        <p>It seems like you haven&apos;t posted any jobs yet. </p>
        <p className="empty__bold">Try creating your first Job posting.</p>
      </div>
    }
    button={
      <CreateJobsModal
        className={style.empty__button}
        isJobCreated={isJobCreated}
        setIsJobCreated={setIsJobCreated}
      />
    }
  />
);
