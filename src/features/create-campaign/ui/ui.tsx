import { Button, Modal, serializeNodes, SnackBar, useTheme } from "shared/ui";
import { useEffect, useState } from "react";
import createIcon from "assets/images/campaign/Create.svg";
import { CampaignOverview } from "./CampaignOverview";
import { CampaignCreate } from "./CampaignCreate";
import style from "./style.module.css";
import userIcon from "assets/images/jobs/User.svg";
import { Campaign } from "../lib";
import { useGetCurrentUser, usePageWidth } from "shared/hooks";
import { CampaignApi } from "shared/api/campaign/lib";
import { CreateButton, getButtonText } from "./helpers";
import { ScrollArea } from "@radix-ui/themes";
import planeLightAnim from "assets/animation/planeLight.json";
import planeDarkAnim from "assets/animation/planeDark.json";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";

interface ICreateCampaignProps {
  from: From;
  jobVariant?: "Matches" | "Applied" | "Shortlisted" | "Hired";
  jobId?: string;
  searchState?: ISearchState;
  candidatesFound?: number;
  prevCampaign?: INormalizedCampaignData;
  companyName?: string;
  setAfterCreate?: (value: boolean) => void;
  afterCreateValue?: boolean;
}

export const CreateCampaign = ({
  from,
  jobVariant,
  jobId,
  searchState,
  candidatesFound,
  prevCampaign,
  companyName,
  setAfterCreate,
  afterCreateValue,
}: ICreateCampaignProps) => {
  const { theme } = useTheme();
  const width = usePageWidth();
  const nav = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  // const [step, setStep] = useState(from !== "search" || width < 768 ? 1 : 0);
  const [step, setStep] = useState(2);
  const { userData } = useGetCurrentUser();
  const [creditsPerCandidate, setCreditsPerCandidate] = useState(1);
  const [contactMethod, setContactMethod] = useState("SMS");
  const [candidatesNumber, setCandidatesNumber] = useState<string>("");
  const [messageText, setMessageText] = useState("");
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (from === "jobs" || width < 768) {
      setStep(2);
    }
  }, [from, width]);

  useEffect(() => {
    CampaignApi.getCampaignSettings().then((res) => {
      setCreditsPerCandidate(res.credits_per_candidate);
    });
  }, []);

  useEffect(() => {
    if (step === 2 && !isOpen) {
      if (from === "jobs" || width < 768) {
        setStep(1);
        return;
      }
      setStep(from !== "search" || width < 768 ? 1 : 0);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    if (
      (searchState?.sector.value === "Construction" &&
        (searchState?.fields as ISearchHospitalityForm)
          .hospitalityEstablishment) ||
      (searchState?.sector.value === "Hospitality" &&
        (searchState?.fields as ISearchConstructionForm).constructionCardType)
    ) {
      SnackBar({
        text: "Please choose candidates filters to create a campaign",
      });
      return;
    }
    if (from === "search" && searchState?.sector.value === "") {
      SnackBar({
        text: "Please choose candidates filters to create a campaign",
      });
      return;
    }
    setIsOpen(true);
  };

  useEffect(() => {
    if (messageText === "") return;
    const value = serializeNodes(JSON.parse(messageText));
    if (value[0].length > 159) {
      setMessageError("Message must be less than 160 characters");
    } else {
      setMessageError("");
    }
  }, [messageText]);

  const handleStep = async () => {
    if (step === 1) {
      if (!messageText) {
        SnackBar({ text: "Please enter message text" });
        return;
      }
      if (messageError) {
        SnackBar({ text: messageError });
        return;
      }
      if (!contactMethod) {
        SnackBar({ text: "Please enter contact method" });
        return;
      }
      if (candidatesNumber === "0") {
        SnackBar({ text: "Please enter number of candidates" });
        return;
      }
      if (candidatesFound && parseInt(candidatesNumber) > candidatesFound) {
        SnackBar({
          text: "Number of candidates you want to reach is more than candidates found",
        });
        return;
      }
      if (!userData?.billing.credits || !creditsPerCandidate) {
        SnackBar({
          text: "You don't have enough credits to create this campaign",
        });
        return;
      }
      if (
        Number(candidatesNumber) * creditsPerCandidate >
        userData?.billing.credits
      ) {
        SnackBar({
          text: "You don't have enough credits to create this campaign",
        });
        return;
      }
      if (from === "search" && searchState) {
        await Campaign.createCampaign(
          searchState,
          serializeNodes(JSON.parse(messageText)).join(""),
          candidatesNumber
        );
        setCandidatesNumber("");
        setMessageText("");
      }
      if (from === "jobs" && jobId && jobVariant) {
        await Campaign.createJobCampaign(
          jobId,
          serializeNodes(JSON.parse(messageText)).join(""),
          candidatesNumber,
          jobVariant
        );
        setCandidatesNumber("");
        setMessageText("");
      }
    }
    setStep(step + 1);
  };

  const repeatCampaign = async () => {
    if (!messageText) {
      SnackBar({ text: "Please enter message text" });
      return;
    }
    if (prevCampaign) {
      await CampaignApi.repeatCampaign(
        prevCampaign.id,
        serializeNodes(JSON.parse(messageText)).join("")
      );
      SnackBar({ text: "Campaign repeated successfully", variant: "success" });
    }
    if (setAfterCreate && afterCreateValue !== undefined) {
      setAfterCreate(!afterCreateValue);
    }
    setIsOpen(false);
  };

  if (jobVariant === "Hired") return null;

  return (
    <>
      <CreateButton from={from} onClick={handleClick} />
      {(from === "search" || from === "jobs" || from === "campaigns") && (
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title={
            <div className={style.modal__title}>
              <img src={createIcon} alt="create" />
              Create Campaign
            </div>
          }
          variant="side"
        >
          <ScrollArea className={style.scroll}>
            {from === "campaigns" && (
              <div className={style.container}>
                <div className={style.heading}>
                  <div className={style.count}>
                    <img src={userIcon} alt="candidate" />
                    {prevCampaign?.amountOfCandidates} candidates found
                  </div>
                  You can select a number of candidates to reach out of the
                  number of matches.
                </div>
                <CampaignOverview
                  prevCampaign={prevCampaign}
                  companyName={companyName}
                />
                <CampaignCreate
                  contactMethod={contactMethod}
                  setContactMethod={setContactMethod}
                  candidatesNumber={candidatesNumber}
                  setCandidatesNumber={setCandidatesNumber}
                  setMessageText={setMessageText}
                  onlyForMessage
                />
                <div className={style.buttons}>
                  <Button
                    variant="primary"
                    className={style.button}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primaryBlue"
                    className={style.button}
                    onClick={repeatCampaign}
                  >
                    Repeat campaign
                  </Button>
                </div>
              </div>
            )}
            {(from === "search" || from === "jobs") && (
              <div className={style.container}>
                {step !== 2 && (
                  <div className={style.heading}>
                    <div className={style.count}>
                      <img src={userIcon} alt="candidate" />
                      {candidatesFound} candidates found
                    </div>
                    You can select a number of candidates to reach out of the
                    number of matches.
                  </div>
                )}
                {step === 0 && searchState && width > 768 && (
                  <CampaignOverview searchFields={searchState} />
                )}
                {step === 1 && (
                  <>
                    {width < 768 && searchState && (
                      <CampaignOverview searchFields={searchState} />
                    )}
                    <CampaignCreate
                      contactMethod={contactMethod}
                      setContactMethod={setContactMethod}
                      candidatesNumber={candidatesNumber}
                      setCandidatesNumber={setCandidatesNumber}
                      setMessageText={setMessageText}
                      candidatesFound={candidatesFound}
                      creditsPerCandidate={creditsPerCandidate}
                      messageError={messageError}
                    />
                  </>
                )}
                {step === 2 ? (
                  <>
                    <div className={style.finish}>
                      <Lottie
                        loop={false}
                        animationData={
                          theme === "dark" ? planeDarkAnim : planeLightAnim
                        }
                        play
                        style={{ width: 150, height: 150 }}
                      />
                      <p>
                        Campaign was <br /> successfully sent
                      </p>
                    </div>
                    <div className={style.buttons}>
                      <Button
                        variant="primary"
                        className={style.button}
                        onClick={() => {
                          nav(`/campaign`);
                        }}
                      >
                        Campaign Details
                      </Button>
                      <Button
                        variant="primaryBlue"
                        className={style.button}
                        onClick={() => {
                          setIsOpen(false);
                          setStep(from !== "search" || width < 768 ? 1 : 0);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className={style.buttons}>
                    <Button
                      variant="primary"
                      className={style.button}
                      onClick={() => {
                        setIsOpen(false);
                        setStep(from !== "search" || width < 768 ? 1 : 0);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primaryBlue"
                      className={style.button}
                      onClick={handleStep}
                    >
                      {getButtonText(step)}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </Modal>
      )}
    </>
  );
};
