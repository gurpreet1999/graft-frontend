import { Format } from "shared/ui";

export const dates = ["year", "month", "week"];

export const SECONDS_IN_A_DAY = 60 * 60 * 24;
export const SECONDS_IN_A_WEEK = SECONDS_IN_A_DAY * 7;
export const SECONDS_IN_A_MONTH = SECONDS_IN_A_DAY * 30;
export const SECONDS_IN_A_YEAR = SECONDS_IN_A_DAY * 365;

export const formatDate = (unixTimestamp: number, format: Format) => {
  const date = new Date(unixTimestamp * 1000);
  if (format === "week") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};
