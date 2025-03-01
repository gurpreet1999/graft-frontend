import {
  LongTextCell,
  NameAndRoleCell,
  StatusCell,
  SendEmailCell,
} from "shared/ui";

export const formatTableData = (data: any) => {
  return {
    name_role_mail: (
      <NameAndRoleCell
        name={data.name}
        lastName={data.lastName}
        role={data.role}
        establishment={data.establishment}
      />
    ),
    status: <StatusCell status={data.status ? "Verified" : "NonVerified"} />,
    skills: <LongTextCell text={data.skills} />,
    licences: <LongTextCell text={data.licences} />,
    experience: data.yearsExperience,
    postcode: data.postcode,
    distance: data.distance,
    action: <SendEmailCell handleEmail={() => {}} id={data.candidateId} />,
  };
};
