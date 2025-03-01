import {
  Button,
  Card,
  CardHeader,
  SnackBar,
  Status,
  StatusChip,
} from "shared/ui";
import noteIcon from "assets/images/button/note.svg";
import { useGetCurrentUser } from "shared/hooks";
import { CampaignApi } from "shared/api/campaign/lib";
import style from "./campaignDetails.module.css";
import archiveIcon from "assets/images/button/archive.svg";
import classNames from "classnames";
import { CreateCampaign } from "features/create-campaign/ui/ui";

interface ICampaignDetailsProps {
  className?: string;
  details?: INormalizedCampaignData;
  setIsCampaignRepeated?: (value: boolean) => void;
  isCampaignRepeated?: boolean;
  updateCampaignDetails?: () => void;
}

export const CampaignDetails = ({
  className,
  details,
  setIsCampaignRepeated,
  isCampaignRepeated,
  updateCampaignDetails,
}: ICampaignDetailsProps) => {
  const { userData } = useGetCurrentUser();

  const archieveCampaign = async () => {
    if (!details?.id) return;
    await CampaignApi.addCampaignToArchive(details.id);
    SnackBar({ text: "Campaign archived", variant: "success" });
    updateCampaignDetails && updateCampaignDetails();
  };

  return (
    <Card className={classNames(className, style.container)}>
      <div className={style.header}>
        <CardHeader
          className={style.title}
          title="Campaign Details"
          image={noteIcon}
        />
        {details && details.status === "ACTIVE" && (
          <Button
            className={style.button}
            variant="primary"
            onClick={archieveCampaign}
          >
            <img src={archiveIcon} alt="archive" />
            Archive
          </Button>
        )}
      </div>
      <div className={style.campaign__title}>
        <p>
          {details?.role} for {userData?.recruiter_data.company_name}
        </p>
        {details?.status && (
          <StatusChip
            status={
              details.status === "ACTIVE" ? Status.Active : Status.Inactive
            }
            label={details.status === "ACTIVE" ? "Active" : "Inactive"}
          />
        )}
      </div>
      <div className={style.campaign__info}>
        <div className={style.main__info}>
          <div className={style.info_title}>Main info</div>
          <div className={style.info__item}>
            <p>Sector:</p>
            <p>{details?.sector}</p>
          </div>
          <div className={style.info__item}>
            <p>Role:</p>
            <p>{details?.role}</p>
          </div>
          {details?.sector !== "Industrial & Driving" && (
            <div className={style.info__item}>
              <p>
                {details?.sector === "Hospitality"
                  ? "Establishment:"
                  : "Card Type:"}
              </p>
              <p>{details?.establishment}</p>
            </div>
          )}
          <div className={style.info__item}>
            <p>Years experience:</p>
            <p>{details?.yearsExperience}</p>
          </div>
          <div className={style.info__item}>
            <p>Postcode:</p>
            <p>{details?.postcode}</p>
          </div>
          <div className={style.info__item}>
            <p>Distance:</p>
            <p>{details?.distance ? details.distance + "km" : "Any"}</p>
          </div>
          <div className={style.info__item}>
            <p>Number of Candidates:</p>
            <p>{details?.amountOfCandidates}</p>
          </div>
        </div>
        {details?.jobDetails ? (
          <div className={style.main__info}>
            <div className={style.info_title}>Job description</div>
            <div className={style.info__item}>
              <p>Company Name:</p>
              <p>{userData?.recruiter_data.company_name}</p>
            </div>
            <div className={style.info__item}>
              <p>Rate of Pay:</p>
              <p>{details.jobDetails.rateOfPay}£/h</p>
            </div>
            <div className={style.info__item}>
              <p>Part Time Or Full Time:</p>
              <p>{details.jobDetails.employmentType}</p>
            </div>
            <div className={style.info__item}>
              <p>Location</p>
              <p>{details.jobDetails.location}</p>
            </div>
            <div className={style.info__item}>
              <p>Contact Details Name:</p>
              <p>
                {userData?.first_name} {userData?.last_name}
              </p>
            </div>
            <div className={style.info__item}>
              <p>Phone Number:</p>
              <p>{userData?.phone_number}</p>
            </div>
            <div className={style.info__item}>
              <p>Email:</p>
              <p>{userData?.email}</p>
            </div>
          </div>
        ) : (
          <div className={style.message}>
            <div className={style.info_title}>Message for Candidates</div>
            <div className={style.info__item}>
              <p>{details && details.message}</p>
            </div>
          </div>
        )}
      </div>
      <div className={style.campaign__info}>
        {details?.jobDetails && (
          <div className={style.message}>
            <div className={style.info_title}>Message for Candidates</div>
            <div className={style.info__item}>
              <p>{details && details.message}</p>
            </div>
          </div>
        )}
        <div className={style.message}>
          <div className={style.info_title}>Contact method</div>
          <div className={style.info__item}>
            <p>SMS</p>
          </div>
        </div>
      </div>
      <div className={style.credits}>
        <div className={style.credits__text}>
          <span>Total: </span>
          <span>{details?.creditsSpent}</span>
        </div>
        {details && details.status === "ACTIVE" && (
          <CreateCampaign
            from="campaigns"
            prevCampaign={details}
            companyName={userData?.recruiter_data.company_name}
            setAfterCreate={setIsCampaignRepeated}
            afterCreateValue={isCampaignRepeated}
          />
        )}
      </div>
    </Card>
  );
};
