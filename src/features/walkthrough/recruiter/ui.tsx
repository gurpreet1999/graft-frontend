import { Step, Steps } from "intro.js-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi, UpdateUserDataApi } from "shared/api";

interface ICandidateSteps {
  steps: Step[];
  initialStep?: number;
  identifier?: string;
}

export const RecruiterSteps = ({
  steps,
  initialStep = 0,
  identifier,
}: ICandidateSteps) => {
  const nav = useNavigate();

  const [enabledSteps, setEnabledSteps] = useState(false);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    AuthApi.fetchUser().then((res) => {
      const status = res.is_onboarding_complete;
      if (status) return;

      const step = res.onboarding_complete_step;
      if (step === undefined || step === 8) return;

      setStatus(status);
      setEnabledSteps(true);
      switch (step) {
        case 4:
          if (location.pathname === "/profile") return;
          nav("/profile");
          break;
        case 5:
          if (location.pathname === "/search") return;
          nav("/search");
          break;
        case 6:
          if (location.pathname === "/campaign") return;
          nav("/campaign");
          break;
        case 7:
          if (location.pathname === "/jobs") return;
          nav("/jobs");
          break;
        default:
          if (location.pathname === "/") return;
          nav("/");
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const options = {
    skipLabel: steps.length - 1 ? "Skip" : "",
    tooltipPosition: "bottom",
    exitOnOverlayClick: false,
    scrollToElement: true,
    overlayOpacity: 0.1,
    showBullets: !!(steps.length - 1),
  };

  const onExit = () => {
    switch (identifier) {
      case "dashboard":
        nav("/profile");
        UpdateUserDataApi.updateOnboardingStep(4);
        break;
      case "profile":
        nav("/search");
        UpdateUserDataApi.updateOnboardingStep(5);
        break;
      case "search":
        nav("/campaign");
        UpdateUserDataApi.updateOnboardingStep(6);
        break;
      case "campaign":
        nav("/jobs");
        UpdateUserDataApi.updateOnboardingStep(7);
        break;
      case "jobs":
        UpdateUserDataApi.updateOnboardingStep(8, true);
        break;
    }
  };

  if (status) return null;
  if (!enabledSteps) return null;

  return (
    <Steps
      enabled={enabledSteps}
      steps={steps}
      initialStep={initialStep}
      options={options}
      onExit={onExit}
    />
  );
};
