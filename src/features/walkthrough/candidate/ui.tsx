import { Step, Steps } from "intro.js-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi, UpdateUserDataApi } from "shared/api";

interface ICandidateSteps {
  enabled?: boolean;
  steps: Step[];
  initialStep?: number;
  identifier?: string;
}

export const CandidateSteps = ({
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
      if (step === undefined || step === 4) return;

      setStatus(status);
      setEnabledSteps(true);
      switch (step) {
        case 1:
          if (location.pathname === "/profile") return;
          nav("/profile");
          break;
        case 2:
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
    exitOnOverlayClick: steps.length - 1,
    scrollToElement: true,
    overlayOpacity: 0.1,
    showBullets: !!(steps.length - 1),
  };

  const onExit = () => {
    switch (identifier) {
      case "dashboard":
        nav("/profile");
        UpdateUserDataApi.updateOnboardingStep(1);
        break;
      case "profile":
        nav("/jobs");
        UpdateUserDataApi.updateOnboardingStep(2);
        break;
      case "jobs":
        UpdateUserDataApi.updateOnboardingStep(4, true);
        setEnabledSteps(false);
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
