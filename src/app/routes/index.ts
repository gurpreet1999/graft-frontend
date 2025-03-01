import dashboardIcon from "assets/images/nav/dashboard.svg";
import invoicesIcon from "assets/images/nav/invoices.svg";
import campaignIcon from "assets/images/nav/campaign.svg";
import searchIcon from "assets/images/nav/search.svg";
import jobsIcon from "assets/images/nav/jobs.svg";
import userIcon from "assets/images/nav/user-list.svg";
import { ProfilePageCandidate, ProfilePageRecruiter } from "pages/profile";
import { IRoute } from "features/SideNav/ui";
import { SearchCandidates } from "pages/search-candidates";
import { JobsCandidate } from "pages/jobs-candidate";
import { JobsRecruiter } from "pages/jobs-recruiter";
import { CampaignHistory } from "pages/campaign-history";
import { UserManagement } from "pages/user-management";
import { Invoices } from "pages/invoices";
import { DashboardCandidate, DashboardRecruiter } from "pages/dashboard";
import { DashboardAdmin } from "pages/dashboard/admin";
import { ProfilePageAdmin } from "pages/profile/admin";

export const candidateRoutes: IRoute[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: dashboardIcon,
    element: DashboardCandidate,
    showInSidebar: true,
  },
  {
    path: "/jobs",
    name: "Jobs",
    icon: jobsIcon,
    element: JobsCandidate,
    showInSidebar: true,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: dashboardIcon,
    element: ProfilePageCandidate,
    showInSidebar: false,
  },
];

export const recruiterRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: dashboardIcon,
    element: DashboardRecruiter,
    showInSidebar: true,
  },
  {
    path: "/jobs",
    name: "Jobs",
    icon: jobsIcon,
    element: JobsRecruiter,
    showInSidebar: true,
  },
  {
    path: "/jobs/*",
    name: "Jobs",
    icon: jobsIcon,
    element: JobsRecruiter,
    showInSidebar: false,
  },
  {
    path: "/search",
    name: "Search Candidates",
    icon: searchIcon,
    element: SearchCandidates,
    showInSidebar: true,
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: invoicesIcon,
    element: Invoices,
    showInSidebar: true,
  },
  {
    path: "/campaign",
    name: "Campaign History",
    icon: campaignIcon,
    element: CampaignHistory,
    showInSidebar: true,
  },
  {
    path: "/campaign/*",
    name: "Campaign History",
    icon: campaignIcon,
    element: CampaignHistory,
    showInSidebar: false,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: dashboardIcon,
    element: ProfilePageRecruiter,
    showInSidebar: false,
  },
];

export const adminRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: dashboardIcon,
    element: DashboardAdmin,
    showInSidebar: true,
  },
  {
    path: "/user-management",
    name: "User Management",
    icon: userIcon,
    element: UserManagement,
    showInSidebar: true,
  },
  {
    path: "/user-management/*",
    name: "User Management",
    icon: userIcon,
    element: UserManagement,
    showInSidebar: false,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: dashboardIcon,
    element: ProfilePageAdmin,
    showInSidebar: false,
  },
];
