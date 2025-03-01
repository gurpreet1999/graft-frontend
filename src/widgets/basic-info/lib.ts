import { UpdateUserDataApi } from "shared/api/update/lib";

interface IPersonalData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  companyName?: string;
}

export class ChangeUserData {
  private static areRequiredFieldsPresent(data: IPersonalData): boolean {
    return ["firstName", "lastName", "email", "phone"].every(
      (key) => data[key as keyof IPersonalData] !== undefined
    );
  }

  private static buildRequestData(
    data: IPersonalData,
    additionalFields?: Partial<IUserChangeData>
  ): IUserChangeData {
    if (!this.areRequiredFieldsPresent(data)) {
      throw new Error("Missing required personal data fields.");
    }

    const requestData: IUserChangeData = {
      first_name: data.firstName!,
      last_name: data.lastName!,
      email: data.email!,
      phone_number: data.phone!,
      postcode: data.postcode!,
      ...additionalFields,
    };

    return requestData;
  }

  static async updateCandidateData(
    data: Partial<IPersonalData>,
    agreeToBeContacted: boolean
  ): Promise<void> {
    const reqData = this.buildRequestData(data, {
      agreement_to_contact: agreeToBeContacted,
    });
    return await UpdateUserDataApi.updateUserData(reqData);
  }

  static async updateRecruiterData(
    data: Partial<IPersonalData>
  ): Promise<void> {
    const reqData = this.buildRequestData(data, {
      company_name: data.companyName,
    });
    return await UpdateUserDataApi.updateUserData(reqData);
  }

  static async updateAdminData(data: Partial<IPersonalData>): Promise<void> {
    const reqData = this.buildRequestData({ ...data, postcode: "SW1A 2AA" });
    return await UpdateUserDataApi.updateUserData(reqData);
  }
}
