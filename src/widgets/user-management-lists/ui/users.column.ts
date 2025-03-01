export type UsersTab = "CLIENTS" | "CANDIDATES" | "ADMINS";

export const getColumns = (sector: string, tab: UsersTab) => {
  if (tab === "CLIENTS") {
    return [
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Pricing Plan",
        accessor: "pricingPlan",
      },
      {
        Header: "Credits Amount",
        accessor: "credits",
      },
      {
        Header: "Jobs Posted",
        accessor: "jobsPosted",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "",
        accessor: "actions",
      },
    ];
  }
  if (tab === "CANDIDATES") {
    return [
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: getHeaderBySector(sector),
        accessor: "firstJobPreference",
      },
      {
        Header: "",
        accessor: "actions",
      },
    ];
  }

  if (tab === "ADMINS") {
    return [
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "",
        accessor: "actions",
      },
    ];
  }
  return [
    {
      Header: "Full Name",
      accessor: "fullName",
    },
  ];
};

const getHeaderBySector = (sector: string) => {
  if (sector === "Hospitality") {
    return "1st Job Preference";
  }
  return "Role";
};
