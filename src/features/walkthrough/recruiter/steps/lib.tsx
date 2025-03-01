import style from "./style.module.css";
import { FirstStep } from "./first-step";
import { Step } from "intro.js-react";
import classNames from "classnames";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { FourthStep } from "./fourth-step";
import { FifthStep } from "./fifth-step";
import { SixthStep } from "./sixth-step";
import { PricingStep } from "./pricing-step";
import { SeventhStep } from "./seventh-step";
import { EighthStep } from "./eighth-step";

export const dashboardSteps: Step[] = [
  {
    element: ".welcome",
    intro: <FirstStep />,
    position: "auto",
    tooltipClass: classNames(style.firstStep, "first__step"),
  },
  {
    element: ".dashboard",
    intro: <SecondStep />,
    position: "bottom",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
  {
    element: ".balance",
    intro: <ThirdStep />,
    position: "bottom",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
  {
    element: ".pricing",
    intro: <PricingStep />,
    position: "bottom",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
];

export const profileSteps: Step[] = [
  {
    element: ".profile",
    intro: <FourthStep />,
    position: "bottom",
    highlightClass: style.secondStep__highlight,
    tooltipClass: style.secondStep,
  },
];

export const searchSteps: Step[] = [
  {
    element: ".search",
    intro: <FifthStep />,
    position: "bottom",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
  {
    element: ".search__result",
    intro: <SixthStep />,
    position: "bottom",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
];

export const campaignSteps: Step[] = [
  {
    element: ".campaign",
    intro: <SeventhStep />,
    position: "bottom",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
];

export const jobsSteps: Step[] = [
  {
    element: ".jobs",
    intro: <EighthStep />,
    position: "bottom",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
];
