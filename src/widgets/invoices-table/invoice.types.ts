/* eslint-disable @typescript-eslint/no-unused-vars */
type InvoiceType = "SUBSCRIPTION" | "CREDITS";

interface Invoice {
  id: string;
  invoice_id: string;
  type: InvoiceType;
  status: string;
  amount: number;
  credits: number;
  created_at: string;
  updated_at: string;
  payment_method: IPaymentMethod;
  pricing_plan: IPricingPlan | null;
}

interface IPaymentMethod {
  id: string;
  name: string;
  value: string;
}

interface IPricingPlan {
  id: string;
  name: string;
  value: string;
}

interface IFilters {
  status?: string;
  payment?: string;
  amount?: { from?: string; to?: string };
  date?: { from?: string; to?: string };
}
