const Applied = (sector: SectorType) => [
  {
    Header: "",
    accessor: "shortlist",
  },
  {
    Header: "Name & Role",
    accessor: "nameAndRole",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  ...(sector === "Hospitality"
    ? [
        {
          Header: "Skills",
          accessor: "skills",
        },
      ]
    : []),
  ...(sector === "Industrial & Driving"
    ? [
        {
          Header: "Licences",
          accessor: "licences",
        },
      ]
    : []),
  {
    Header: "Phone number",
    accessor: "phone",
  },
  {
    Header: "Years Experience",
    accessor: "experience",
  },
  {
    Header: "Postcode",
    accessor: "postcode",
  },
  {
    Header: "Distance",
    accessor: "distance",
  },
];

const Matches = (sector: SectorType) => [
  {
    Header: "Name & Role",
    accessor: "nameAndRole",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  ...(sector === "Hospitality"
    ? [
        {
          Header: "Skills",
          accessor: "skills",
        },
      ]
    : []),
  ...(sector === "Industrial & Driving"
    ? [
        {
          Header: "Licences",
          accessor: "licences",
        },
      ]
    : []),
  {
    Header: "Phone number",
    accessor: "phone",
  },
  {
    Header: "Years Experience",
    accessor: "experience",
  },
  {
    Header: "Postcode",
    accessor: "postcode",
  },
  {
    Header: "Distance",
    accessor: "distance",
  },
];

const Shortlisted = (sector: SectorType) => [
  {
    Header: "",
    accessor: "shortlist",
  },
  {
    Header: "Name & Role",
    accessor: "nameAndRole",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  ...(sector === "Hospitality"
    ? [
        {
          Header: "Skills",
          accessor: "skills",
        },
      ]
    : []),
  ...(sector === "Industrial & Driving"
    ? [
        {
          Header: "Licences",
          accessor: "licences",
        },
      ]
    : []),
  {
    Header: "Phone number",
    accessor: "phone",
  },
  {
    Header: "Years Experience",
    accessor: "experience",
  },
  {
    Header: "Distance",
    accessor: "distance",
  },
  {
    Header: "",
    accessor: "hire",
  },
];

const Hired = (sector: SectorType) => [
  {
    Header: "Name & Role",
    accessor: "nameAndRole",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  ...(sector === "Hospitality"
    ? [
        {
          Header: "Skills",
          accessor: "skills",
        },
      ]
    : []),
  ...(sector === "Industrial & Driving"
    ? [
        {
          Header: "Licences",
          accessor: "licences",
        },
      ]
    : []),
  {
    Header: "Phone number",
    accessor: "phone",
  },
  {
    Header: "Years Experience",
    accessor: "experience",
  },
  {
    Header: "Postcode",
    accessor: "postcode",
  },
  {
    Header: "Distance",
    accessor: "distance",
  },
];

export const getColumns = (sector: SectorType) => ({
  Applied: Applied(sector),
  Matches: Matches(sector),
  Shortlisted: Shortlisted(sector),
  Hired: Hired(sector),
});
