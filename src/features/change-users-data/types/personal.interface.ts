/* eslint-disable @typescript-eslint/no-unused-vars */
interface ICandidatePersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
}

interface IRecruiterPersonalData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  postcode: string;
}

interface IAdminPersonalData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface IFormPersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  companyName: string;
  agreeToBeContacted: boolean;
}

type ICandidateFormPersonalData = Pick<
  IFormPersonalData,
  "firstName" | "lastName" | "email" | "phone" | "postcode"
>;

type IRecruiterFormPersonalData = Pick<
  IFormPersonalData,
  "firstName" | "lastName" | "email" | "phone" | "postcode" | "companyName"
>;

type IAdminFormPersonalData = Pick<
  IFormPersonalData,
  "firstName" | "lastName" | "email" | "phone"
>;
