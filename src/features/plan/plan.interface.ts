/* eslint-disable @typescript-eslint/no-unused-vars */
interface IPlan {
  created_at: string;
  credits_included: number;
  description: string;
  id: string;
  name: string;
  price: number | "Individual";
  price_per_credit: number;
  pricing_plan_features: string[];
  updated_at: string;
  value: PricingType;
}

type PricingType = "free" | "small_crew" | "medium_crew" | "big_house";
