import { JobApi } from "shared/api";
import {
  LongTextCell,
  NameAndRoleCell,
  PhoneActionCell,
  StatusCell,
  ShortlistCell,
  HireButtonCell,
} from "shared/ui";

export type CandidatesTabs = "Matches" | "Applied" | "Shortlisted" | "Hired";

export class CandidatesData {
  static async getCandidates(
    jobId: string,
    tab: CandidatesTabs,
    pageSize: number,
    page: number
  ) {
    return JobApi[`get${tab}Candidates`](jobId, page, pageSize);
  }

  static async shortlistCandidate(
    candidateId: string,
    jobId: string,
    updateTable: () => void
  ) {
    await JobApi.shortlistCandidate(jobId, candidateId);
    updateTable();
  }

  static async declineShortlistCandidate(
    candidateId: string,
    jobId: string,
    updateTable: () => void
  ) {
    await JobApi.removeCandidateFromShortlist(jobId, candidateId);
    updateTable();
  }

  static async hireCandidate(
    candidateId: string,
    jobId: string,
    updateTable: () => void
  ) {
    await JobApi.hireCandidate(jobId, candidateId);
    updateTable();
  }

  static async getCandidatesCells(
    jobId: string,
    tab: CandidatesTabs,
    pageSize: number,
    page: number,
    experience: INormalizedExperienceData,
    jobDetails: INormalizedJobData,
    updateTable: () => void
  ) {
    const candidatesData = await this.getCandidates(jobId, tab, pageSize, page);
    return {
      candidates: this.getCandidateCells(
        candidatesData.candidates,
        experience,
        tab,
        jobDetails,
        updateTable
      ),
      totalCount: candidatesData.total_count,
    };
  }

  private static getCandidateCells(
    candidatesData: any,
    experience: INormalizedExperienceData,
    tab: CandidatesTabs,
    jobDetails: INormalizedJobData,
    updateTable: () => void
  ) {
    return candidatesData.map((candidate: any) =>
      this.getCandidateCellByTab(
        candidate,
        experience,
        tab,
        jobDetails,
        updateTable
      )
    );
  }

  private static getCandidateCellByTab(
    candidate: any,
    experience: INormalizedExperienceData,
    tab: CandidatesTabs,
    jobDetails: INormalizedJobData,
    updateTable: () => void
  ) {
    switch (tab) {
      case "Matches":
        return this.formatMatchCell(candidate, experience);
      case "Applied":
        return this.formatAppliedCell(
          candidate,
          experience,
          jobDetails,
          updateTable
        );
      case "Shortlisted":
        return this.formatShortlistedCell(
          candidate,
          experience,
          jobDetails,
          updateTable
        );
      case "Hired":
        return this.formatHiredCell(candidate, experience);
      default:
        return {};
    }
  }

  private static formatMatchCell(
    candidate: any,
    experience: INormalizedExperienceData
  ) {
    const baseCell = this.formatBaseCell(candidate, experience);
    return {
      ...baseCell,
      shortlist: null,
    };
  }

  private static formatAppliedCell(
    candidate: any,
    experience: INormalizedExperienceData,
    jobDetails: INormalizedJobData,
    updateTable: () => void
  ) {
    const baseCell = this.formatBaseCell(candidate, experience);
    return {
      ...baseCell,
      shortlist: (
        <ShortlistCell
          handleShortlist={async () => {
            await this.shortlistCandidate(
              candidate.id,
              jobDetails.id,
              updateTable
            );
          }}
        />
      ),
    };
  }

  private static formatShortlistedCell(
    candidate: any,
    experience: INormalizedExperienceData,
    jobDetails: INormalizedJobData,
    updateTable: () => void
  ) {
    const baseCell = this.formatBaseCell(candidate, experience);
    return {
      ...baseCell,
      shortlist: (
        <ShortlistCell
          active={true}
          handleShortlist={async () => {
            await this.declineShortlistCandidate(
              candidate.id,
              jobDetails.id,
              updateTable
            );
          }}
        />
      ),
      hire: (
        <HireButtonCell
          onClick={async () => {
            await this.hireCandidate(candidate.id, jobDetails.id, updateTable);
          }}
        />
      ),
    };
  }

  private static formatHiredCell(
    candidate: any,
    experience: INormalizedExperienceData
  ) {
    const baseCell = this.formatBaseCell(candidate, experience);
    return {
      ...baseCell,
    };
  }

  private static formatBaseCell(
    candidate: any,
    experience: INormalizedExperienceData
  ) {
    const {
      hospitalityRoles,
      hospitalityEstablishments,
      constructionCardTypes,
      constructionRoles,
      industrialAndDrivingRoles,
      industrialAndDrivingAvailabilities,
      industrialAndDrivingLicences,
      skills,
      yearsExperience,
    } = experience;

    const candidateData = candidate.candidate_data;
    const phoneNumber = candidate.user
      ? candidate.user.phone_number
      : candidate.phone_number;
    const firstName = candidate.user
      ? candidate.user.first_name
      : candidate.first_name;
    const lastName = candidate.user
      ? candidate.user.last_name
      : candidate.last_name;
    const role =
      hospitalityRoles[candidateData.hospitality_first_role_id]?.value ??
      constructionRoles[candidateData.construction_role_id]?.value ??
      industrialAndDrivingRoles[candidateData.industrial_and_driving_role_id]
        ?.value ??
      "Any";

    const establishment =
      hospitalityEstablishments[candidateData.hospitality_main_establishment_id]
        ?.value ??
      constructionCardTypes[candidateData.construction_card_type_id]?.value ??
      candidateData.industrial_and_driving_availability_ids?.map(
        (id: string) => industrialAndDrivingAvailabilities[id]?.value ?? "Any"
      );

    let skillsData = "N/A";

    // for some tabs where candidate skills are contained in candidate.candidate_data
    if (candidateData.skills && candidateData.skills.length > 0) {
      skillsData = candidateData.skills
        .map((skill: number) =>
          skill !== null && skills[skill] ? skills[skill].value : "N/A"
        )
        .join(", ");
    }

    // for some tabs, where candidate skills are contained in candidate object at once
    if (candidate.skills && candidate.skills.length > 0) {
      skillsData = candidate.skills
        .map((skill: ISuggestion) => (skill !== null ? skill.value : "N/A"))
        .join(", ");
    }

    const distance =
      candidate.distance_km || candidate.distance_km === 0
        ? candidate.distance_km
        : candidate.distance;

    let distanceDisplay;
    if (
      isNaN(Number(distance)) ||
      distance === null ||
      distance === undefined
    ) {
      distanceDisplay = "N/A";
    } else if (Number(distance) < 1) {
      distanceDisplay = "less than 1 km";
    } else {
      distanceDisplay = `${parseFloat(distance).toFixed()} km`;
    }

    let licences = "N/A";
    if (candidateData.industrial_and_driving_licences) {
      licences = candidateData.industrial_and_driving_licences
        .map((id: string) =>
          industrialAndDrivingLicences[id]
            ? industrialAndDrivingLicences[id].value
            : "N/A"
        )
        .join(", ");
    }

    return {
      nameAndRole: (
        <NameAndRoleCell
          name={firstName}
          lastName={lastName}
          role={role}
          establishment={establishment}
        />
      ),
      status: (
        <StatusCell
          status={candidateData.verified ? "Verified" : "NonVerified"}
        />
      ),
      skills: <LongTextCell text={skillsData} size="large" />,
      licences: <LongTextCell text={licences} size="large" />,
      phone: <PhoneActionCell phone={phoneNumber} />,
      experience: yearsExperience[candidateData.years_experience_id].value,
      postcode:
        (candidate.postcode && (
          <p style={{ minWidth: "72px" }}>{candidate.postcode}</p>
        )) ||
        "N/A",
      distance: distanceDisplay,
    };
  }
}
