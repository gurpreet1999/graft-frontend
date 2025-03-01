import style from "./style.module.css";
import { FirstStep } from "./first-step";
import { Step } from "intro.js-react";
import classNames from "classnames";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { FourthStep } from "./fourth-step";

export const dashboardSteps: Step[] = [
  {
    element: ".container",
    intro: FirstStep(),
    position: "auto",
    tooltipClass: classNames(style.firstStep, "first__step"),
  },
];

export const verificationSteps: Step[] = [
  {
    element: ".verifStep",
    intro: SecondStep(),
    position: "right",
    highlightClass: style.highlight,
    tooltipClass: style.secondStep,
  },
];

export const jobsSteps: Step[] = [
  {
    element: ".jobsSteps",
    intro: ThirdStep(),
    position: "top",
    highlightClass: style.jobs__highlight,
    tooltipClass: style.thirdStep,
  },
  {
    element: ".jobApplySteps",
    intro: FourthStep(),
    position: "top",
    highlightClass: style.apply__highlight,
    tooltipClass: style.secondStep,
  },
];
