import { BillingApi } from "shared/api";

export class BuyCredits {
  static getCheckoutUrl = async (credits: number, redirectRoute: string) => {
    const response = await BillingApi.buyCredits({
      credits: credits,
      redirect_url:
        window.location.origin + redirectRoute + "?success-credits=true",
    });
    return response.checkoutURL;
  };

  static getConverted = (credits: string, creditsMultiplier: number) => {
    return parseFloat((Number(credits) * creditsMultiplier).toFixed(2));
  };
}
