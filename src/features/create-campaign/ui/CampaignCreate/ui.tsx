import { Input, TextEditor } from "shared/ui";
import style from "./style.module.css";
import companyNameIcon from "assets/images/campaign/companyName.svg";
import phoneCallIcon from "assets/images/campaign/PhoneCall.svg";
import chatIcon from "assets/images/campaign/ChatText.svg";
import { useGetCurrentUser } from "shared/hooks";
import { Descendant } from "slate";
import { useEffect, useState } from "react";

interface ICampaignCreate {
  contactMethod: string;
  setContactMethod: (value: string) => void;
  candidatesNumber: string;
  setCandidatesNumber: (value: string) => void;
  setMessageText: (value: string) => void;
  onlyForMessage?: boolean;
  messageText?: Descendant[];
  candidatesFound?: number;
  creditsPerCandidate?: number;
  messageError?: string;
}

export const CampaignCreate = ({
  contactMethod,
  setContactMethod,
  candidatesNumber,
  setCandidatesNumber,
  setMessageText,
  onlyForMessage,
  messageText,
  candidatesFound,
  creditsPerCandidate,
  messageError,
}: ICampaignCreate) => {
  const { userData } = useGetCurrentUser();
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    if (creditsPerCandidate && candidatesNumber) {
      setCredits(creditsPerCandidate * Number(candidatesNumber));
    }
  }, [creditsPerCandidate, candidatesNumber]);

  const handleCandidatesNumberChange = (value: string) => {
    if (/^\d+$/.test(value)) {
      setCandidatesNumber(value);
    }
  };

  return (
    <div className={style.container}>
      {!onlyForMessage && (
        <>
          <Input
            type="text"
            label="Company Name"
            labelIcon={companyNameIcon}
            disabled
            value={userData?.recruiter_data.company_name}
            placeholder="Enter campaign name"
            handleChange={() => {}}
            className={style.input}
          />
          <Input
            type="text"
            label="Contact method"
            labelIcon={phoneCallIcon}
            value={contactMethod}
            disabled
            placeholder="Enter campaign name"
            handleChange={(value: string) => {
              setContactMethod(value);
            }}
            className={style.input}
          />
          <Input
            type="number"
            label="Number of candidates you want to reach"
            labelIcon={phoneCallIcon}
            value={candidatesNumber}
            placeholder="0"
            handleChange={handleCandidatesNumberChange}
            maxNumber={candidatesFound}
          />
        </>
      )}
      <TextEditor
        label="Message Text"
        labelIcon={chatIcon}
        setValue={setMessageText}
        messageText={messageText}
        messageError={messageError}
      />
      <div className={style.cost}>
        <span>Total:</span>
        <span>{credits} Credits</span>
      </div>
    </div>
  );
};
