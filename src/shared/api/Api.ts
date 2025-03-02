/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { SnackBar } from "shared/ui";

// const BASE_URL = import.meta.env.VITE_API_URL + "/api/v2";

const BASE_URL ="https://api.onthegraft.com/api/v2"
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export class Api {
  static async post(url: string, data: any, params?: any) {
    try {
      const response: AxiosResponse = await axiosInstance.post(url, data, {
        params,
      });
      return response.data;
    } catch (error: any) {
      this.handleAxiosError(error as AxiosError);
      SnackBar({ text: error.response.data.message, vertical: "bottom" });
      throw error;
    }
  }

  static async get(url: string, params?: any, returnStatus?: boolean) {
    try {
      const response: AxiosResponse = await axiosInstance.get(url, { params });
      if (returnStatus) {
        return response;
      }
      return response.data;
    } catch (error: any) {
      this.handleAxiosError(error as AxiosError);
      if (!url.includes("auth")) {
        SnackBar({ text: error.response.data.message, vertical: "bottom" });
      }
      throw error;
    }
  }

  static async put(url: string, data: any) {
    try {
      const response: AxiosResponse = await axiosInstance.put(url, data);
      return response.data;
    } catch (error: any) {
      this.handleAxiosError(error as AxiosError);
      SnackBar({ text: error.response.data.message, vertical: "bottom" });
      throw error;
    }
  }

  static async patch(url: string, data: any) {
    try {
      const response: AxiosResponse = await axiosInstance.patch(url, data);
      return response.data;
    } catch (error: any) {
      this.handleAxiosError(error as AxiosError);
      SnackBar({ text: error.response.data.message, vertical: "bottom" });
      throw error;
    }
  }

  static async delete(url: string, data: any) {
    try {
      const response: AxiosResponse = await axiosInstance.delete(url, { data });
      return response.data;
    } catch (error: any) {
      this.handleAxiosError(error as AxiosError);
      SnackBar({ text: error.response.data.message, vertical: "bottom" });
      throw error;
    }
  }

  static async uploadFileToSignedUrl(url: string, file: File) {
    try {
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to upload file to ${url}`);
      }
    } catch (error: any) {
      this.handleAxiosError(error as AxiosError);
      SnackBar({ text: error.response.data.message, vertical: "bottom" });
      throw error;
    }
  }

  private static handleAxiosError(error: AxiosError) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
  }
}
