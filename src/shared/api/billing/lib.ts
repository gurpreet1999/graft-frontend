import { Api } from "../Api";

export type PaymentMethod = {
  id: string;
  name: string;
  value: string;
};

export interface IInvoicesFilters {
  statuses: string[];
  types: string[];
  payment_methods: PaymentMethod[];
}

export class BillingApi extends Api {
  static getBillingPlans = async (): Promise<IPlan[]> => {
    return await this.get("/billing/plans");
  };

  static buyCredits = async (data: any) => {
    return await this.post("/billing/credits", data);
  };

  static upgradePlan = async (pricing_plan_id: string) => {
    return await this.put("/billing/upgrade", { pricing_plan_id });
  };

  static downgradePlan = async (pricing_plan_id: string) => {
    return await this.put("/billing/downgrade", { pricing_plan_id });
  };

  static renewPlan = async (pricing_plan_id: string) => {
    return await this.put("/billing/renew", { pricing_plan_id });
  };

  static getSetupIntentForTrial = async (
    pricing_plan_id: string
  ): Promise<ClientSecret> => {
    return await this.post("billing/trial-subscription", { pricing_plan_id });
  };

  static getInvoicesFilters = async (): Promise<IInvoicesFilters> => {
    return await this.get("/billing/invoices/filters");
  };

  static getInvoices = async (
    page: number,
    page_size: number,
    type: string,
    status?: string,
    payment_method_id?: string,
    amount_from?: number,
    amount_to?: number,
    created_from?: string,
    created_to?: string,
    sort_by?: string,
    sort_order?: string
  ) => {
    return await this.get("/billing/invoices", {
      page,
      page_size,
      type,
      status,
      payment_method_id,
      amount_from,
      amount_to,
      created_from,
      created_to,
      sort_by,
      sort_order,
    });
  };

  static async getPayouts(created_from?: number, created_to?: number) {
    const formatDateTime = (timestamp?: number) => {
      return timestamp ? new Date(timestamp * 1000).toISOString() : undefined;
    };

    return await this.get("/billing/payouts", {
      created_from: formatDateTime(created_from),
      created_to: formatDateTime(created_to),
    });
  }
}
