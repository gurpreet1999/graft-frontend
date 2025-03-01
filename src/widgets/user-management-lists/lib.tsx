import {
  DetailsAndSuspendCell,
  EmailActionCell,
  PhoneActionCell,
  StatusCell,
  StatusCellType,
  WithImageCell,
} from "shared/ui";
import { UsersTab } from "./ui/users.column";
import avatarLight from "assets/images/user-menu/avatar-light.png";
import avatarDark from "assets/images/user-menu/avatar.png";

type IBaseUser = {
  fullName: JSX.Element;
  email: JSX.Element;
  actions: JSX.Element;
  phone: JSX.Element;
};

type INormalizedCandidate = IBaseUser & {
  status: JSX.Element;
  firstJobPreference: string;
};

type INormalizedAdmin = IBaseUser & {
  role: string;
};

type INormalizedClient = IBaseUser & {
  pricingPlan: string;
  credits: number;
  jobsPosted: number;
};

export type INormalizedUser =
  | INormalizedCandidate
  | INormalizedAdmin
  | INormalizedClient;

const getImage = (tab: UsersTab, avatar: string, userPhoto: string | null) => {
  if (userPhoto) {
    return userPhoto;
  }
  if (tab !== "ADMINS") {
    return avatar;
  }
  return undefined;
};

export const normalizeUsers = (
  users: IUser[],
  tab: UsersTab,
  experience: INormalizedExperienceData,
  handleDetails: (id: string) => void,
  handleSuspend: (id: string, name: string) => void,
  handleUnsuspend: (id: string) => void,
  theme: string
): INormalizedUser[] => {
  const { hospitalityRoles, constructionRoles, industrialAndDrivingRoles } =
    experience;

  const avatar = theme === "light" ? avatarLight : avatarDark;

  return users
    .map((user) => {
      const baseUser: IBaseUser = {
        fullName: (
          <WithImageCell
            image={getImage(tab, avatar, user.photo)}
            text={`${user.first_name} ${user.last_name}`}
            notHideOverflow
          />
        ),
        email: <EmailActionCell email={user.email} />,
        phone: <PhoneActionCell phone={user.phone_number} />,
        actions: (
          <DetailsAndSuspendCell
            id={user.id}
            name={`${user.first_name} ${user.last_name}`}
            handleSuspend={handleSuspend}
            handleUnsuspend={handleUnsuspend}
            handleDetails={handleDetails}
            userStatus={user.status}
          />
        ),
      };

      if (tab === "CANDIDATES") {
        const firstJobPreference =
          hospitalityRoles[user.candidate_data.hospitality_first_role_id]
            ?.value ??
          constructionRoles[user.candidate_data.construction_role_id]?.value ??
          industrialAndDrivingRoles[
            user.candidate_data.industrial_and_driving_role_id
          ].value;

        let status: StatusCellType = "NonVerified";

        if (
          user.candidate_verification?.experience_document_status ===
            "PENDING" ||
          user.candidate_verification?.personal_document_status === "PENDING"
        ) {
          status = "WaitingForSubmission";
        }

        if (user.candidate_data.verified) {
          status = "Verified";
        }

        const candidate: INormalizedCandidate = {
          ...baseUser,
          status: <StatusCell status={status} />,
          phone: <PhoneActionCell phone={user.phone_number} />,
          firstJobPreference,
        };

        return candidate;
      }

      if (tab === "ADMINS") {
        const admin: INormalizedAdmin = {
          ...baseUser,
          role: "Admin",
        };

        return admin;
      }

      if (tab === "CLIENTS") {
        const client: INormalizedClient = {
          ...baseUser,
          pricingPlan: user.billing.pricing_plan.name,
          credits: user.billing.credits,
          jobsPosted: user.posted_jobs ? user.posted_jobs : 0,
          phone: <PhoneActionCell phone={user.phone_number} />,
        };

        return client;
      }

      return undefined;
    })
    .filter((user): user is INormalizedUser => user !== undefined);
};
