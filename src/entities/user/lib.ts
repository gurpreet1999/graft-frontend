import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "shared/api";
// const mockCandidateUserData: ICandidateUserData = {
//   id: "1",
//   sector_id: "sector1",
//   hospitality_first_role_id: "role1",
//   hospitality_second_role_id: "role2",
//   hospitality_main_establishment_id: "establishment1",
//   hospitality_second_establishment_id: "establishment2",
//   construction_role_id: "constructionRole1",
//   construction_card_type_id: "cardType1",
//   years_experience_id: "5",
//   daily_job_update_id: "update1",
//   agreement_to_contact: true,
//   verified: false,
//   skills: ["JavaScript", "React"],
//   industrial_and_driving_role_id: "drivingRole1",
//   industrial_and_driving_licences: ["Licence1", "Licence2"],
//   industrial_and_driving_availabilities: ["Daytime", "Evening"],
// };

// const mockUserData: IUser = {
//   id: "1",
//   email: "john.doe@example.com",
//   first_name: "John",
//   last_name: "Doe",
//   phone_number: "+1234567890",
//   postcode: "12345",
//   postcode_latitude: 51.5074,
//   postcode_longitude: 0.1278,
//   photo: null, // You can provide a URL or leave it null
//   status: "ACTIVE", // Or "SUSPENDED", depending on the status of your mock user
//   role: "CANDIDATE", // Or "RECRUITER" or "ADMIN" depending on the role
//   candidate_data: mockCandidateUserData, // Use the mockCandidateUserData here
//   candidate_verification: {
//     created_at: "2024-01-01",
//     experience_document_name: "document1.pdf",
//     experience_document_status: "PENDING", // Or APPROVED or REJECTED
//     experience_document_type_id: "type1",
//     id: "verification1",
//     personal_document_name: "personal_doc1.pdf",
//     personal_document_status: "PENDING", // Or APPROVED or REJECTED
//     personal_document_type_id: "personalType1",
//     updated_at: "2024-01-02",
//     user_id: "1",
//   },
//   recruiter_data: {
//     id: "1",
//     company_name: "Tech Recruiters",
//   },
//   billing: {
//     credits: 100,
//     trial_ends_at: null,
//     pricing_plan: {
//       id: "1",
//       name: "Free Plan",
//       value: "free",
//       price_per_credit: 0,
//     },
//     subscription_ends_at: null,
//   },
//   applied_jobs: 3,
//   sms_campaigns: 5,
//   sms_campaigns_by_sector: [
//     { sector_id: "tech", count: 3 },
//     { sector_id: "marketing", count: 2 },
//   ],
//   onboarding_complete_step: 3,
//   is_onboarding_complete: true,
// };

export class AuthActions {
  static register = createAsyncThunk(
    "auth/register",
    async (data: ISignUpRecruiterData | ISignUpCandidateData, thunkAPI) => {
      try {
        const response = await AuthApi.register(data);
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  static fetchUser = createAsyncThunk("auth/fetchUser", async () => {
    const response = await AuthApi.fetchUser();
    return response;
    // return mockUserData;
  });

  static login = createAsyncThunk(
    "auth/login",
    async (data: ILoginData, thunkAPI) => {
      try {
        const response = await AuthApi.login(data);
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.status);
      }
    }
  );

  static logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
      await AuthApi.logout();
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

  static adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async (data: ILoginData, thunkAPI) => {
      try {
        const response = await AuthApi.adminLogin(data);
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
}
