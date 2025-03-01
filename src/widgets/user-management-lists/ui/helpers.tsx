import { Button, RangeInput, Select, SelectSuggestion } from "shared/ui";
import style from "./style.module.css";
import { BillingApi } from "shared/api";
import plusIcon from "assets/images/plus.svg";

type SetValue = (option: ISuggestion) => void;

type ClientsOptions = {
  pricing: {
    value: ISuggestion;
    setValue: SetValue;
    pricingPlans: ISuggestion[];
  };
  credits: {
    value: number[];
    setValue: (value: number[]) => void;
  };
};

type CandidateOptions = {
  value: ISuggestion;
  setValue: SetValue;
  sector: ISuggestion;
  setSector: SetValue;
};

type AdminOptions = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const STATUSES = [
  { id: "all", value: "All statuses" },
  { id: "VERIFIED", value: "Verified" },
  { id: "NON_VERIFIED", value: "Non verified" },
  { id: "WAITING_FOR_SUBMISSION", value: "Waiting for submission" },
];

export const allPricingPlan = { id: "all", value: "All pricing plans" };

export const getPricingPlans = async () => {
  const res = await BillingApi.getBillingPlans();
  const mappedRes = res.map((plan) => ({
    id: plan.id,
    value: plan.name,
  }));
  return [allPricingPlan, ...mappedRes];
};

const minRange = 0;
const maxRange = 3000;

export const getSelect = (
  tab: string,
  clientsOptions: ClientsOptions,
  candidateOptions: CandidateOptions,
  adminsOption: AdminOptions,
  suggestion: IExperienceData
) => {
  switch (tab) {
    case "CLIENTS":
      return (
        <>
          {/* Pricing plans */}
          <Select
            className={style.select}
            options={clientsOptions.pricing.pricingPlans}
            value={clientsOptions.pricing.value}
            onChangeObject={clientsOptions.pricing.setValue}
          />
          {/* Credits */}
          <RangeInput
            minValue={minRange}
            maxValue={maxRange}
            value={clientsOptions.credits.value}
            setValue={clientsOptions.credits.setValue}
          />
        </>
      );
    case "CANDIDATES":
      return (
        <>
          <SelectSuggestion
            value={candidateOptions.sector}
            handleChange={candidateOptions.setSector}
            options={suggestion.sectors}
            placeholder="Select"
            hideDelete
            className={style.select_suggestion}
          />
          <Select
            className={style.select}
            options={STATUSES}
            value={candidateOptions.value}
            onChangeObject={candidateOptions.setValue}
          />
        </>
      );
    case "ADMINS":
      return (
        <Button
          className={style.admin__button}
          onClick={() => {
            adminsOption.setIsOpen(!adminsOption.isOpen);
          }}
        >
          <img src={plusIcon} alt="plus" />
          Add admin
        </Button>
      );
    default:
      return null;
  }
};
