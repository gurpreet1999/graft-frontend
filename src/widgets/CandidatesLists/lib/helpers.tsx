import emptyStateMatchesAnimation from "assets/animation/emptyShortlistedDark.json";
import emptyStateMatchesLightAnimation from "assets/animation/emptyShortlistedLight.json";
import { CandidatesTabs } from "./lib";
import { EmptyState } from "shared/ui";

export const getEmptyState = (tab: CandidatesTabs, theme: "light" | "dark") => {
  const jsonAnimation =
    theme === "light"
      ? emptyStateMatchesLightAnimation
      : emptyStateMatchesAnimation;
  switch (tab) {
    case "Matches":
      return getNoMatchesEmptyState(jsonAnimation);
    case "Applied":
      return getNoAppliedEmptyState(jsonAnimation);
    case "Shortlisted":
      return getNoShortlistedEmptyState(jsonAnimation);
    case "Hired":
      return getNoHiredEmptyState(jsonAnimation);
    default:
      return getNoMatchesEmptyState(jsonAnimation);
  }
};

export const getNoMatchesEmptyState = (jsonAnimation: any) => (
  <EmptyState
    jsonAnimation={jsonAnimation}
    text={
      <>
        <p className="empty__bold">Hmm... </p>
        <p>We couldn&apos;t find any candidates that match your criteria</p>
      </>
    }
  />
);

export const getNoAppliedEmptyState = (jsonAnimation: any) => (
  <EmptyState
    jsonAnimation={jsonAnimation}
    text="No one applied to this job posting yet"
  />
);

export const getNoShortlistedEmptyState = (jsonAnimation: any) => (
  <EmptyState
    jsonAnimation={jsonAnimation}
    text={
      <>
        <p className="empty__bold">
          You haven&apos;t added any candidate to your shortlist.
        </p>
        <p>Try adding one from applied candidates.</p>
      </>
    }
  />
);

export const getNoHiredEmptyState = (jsonAnimation: any) => (
  <EmptyState
    jsonAnimation={jsonAnimation}
    text={
      <>
        <p className="empty__bold">
          You haven&apos;t hired anyone for this job posting yet.
        </p>
        <p>
          Click on &quot;Hire&quot; button from your shortlist once you are
          ready.
        </p>
      </>
    }
  />
);
