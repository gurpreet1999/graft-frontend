import { BillingApi } from "shared/api";
import { SnackBar } from "shared/ui";

export class Pricing {
  static getCurrentPlanInfo = (planName: string, plans: IPlan[]) => {
    return plans.find((plan) => plan.name === planName);
  };

  static changePlan = async (
    planForBuy: IPlan,
    oldPlanPrice?: string | number
  ) => {
    if (oldPlanPrice === undefined) {
      return await BillingApi.upgradePlan(planForBuy.id);
    }
    if (planForBuy.price === "Individual") {
      // TODO: Add handling for "Individual" price user case
      return;
    }
    if (
      planForBuy.price === oldPlanPrice ||
      typeof planForBuy.price !== "number" ||
      typeof oldPlanPrice !== "number"
    ) {
      return;
    }
    if (planForBuy.price > oldPlanPrice) {
      try {
        await BillingApi.upgradePlan(planForBuy.id);
        SnackBar({
          text: "Plan was successfully upgraded",
          variant: "success",
        });
      } catch (error) {
        SnackBar({ text: "Error during plan upgrade" });
      }
    }
    if (planForBuy.price < oldPlanPrice) {
      try {
        await BillingApi.downgradePlan(planForBuy.id);
        SnackBar({
          text: "Plan was successfully downgraded",
          variant: "success",
        });
      } catch (error) {
        SnackBar({ text: "Error during plan downgrade" });
      }
    }
  };
}
