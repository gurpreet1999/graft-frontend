import { Button, Heading, Modal } from "shared/ui";
import style from "./JobDetailsModal.module.css";
import { useEffect, useState } from "react";
import { JobDetailsClass } from "../lib";
import { useGetSuggestions, usePageWidth } from "shared/hooks";
import mapPinIcon from "assets/images/jobs/MapPin.svg";
import userIcon from "assets/images/jobs/User.svg";
import phoneIcon from "assets/images/jobs/PhoneCall.svg";
import emailIcon from "assets/images/jobs/Envelope.svg";
import buildingIcon from "assets/images/jobs/Buildings.svg";

interface IJobDetailsModal {
  id: string;
  isOpen: boolean;
  handleClose: () => void;
  handleApply: (id: string) => void;
  handleDecline: (id: string) => void;
  isApply?: boolean;
}

export const JobDetailsModal = ({
  id,
  handleClose,
  isOpen,
  handleApply,
  handleDecline,
  isApply,
}: IJobDetailsModal) => {
  const [jobDetails, setJobDetails] = useState<INormalizedJobData>();
  const { experience } = useGetSuggestions();
  const width = usePageWidth();

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!experience) return;
      const res = await JobDetailsClass.getJobDetailsData(id, experience);
      setJobDetails(res);
    };
    fetchJobDetails();
  }, [id, experience]);

  if (!jobDetails) return null;

  return (
    <Modal
      title="Job Details"
      open={isOpen}
      onClose={handleClose}
      variant={width > 768 ? "side" : "center"}
    >
      <div className={style.container}>
        <div className={style.job__header}>
          <div className={style.job__role}>
            <Heading variant="h2" className={style.job__title}>
              {jobDetails.role}
            </Heading>
            <div className={style.job__sub}>{jobDetails.establishment}</div>
          </div>
          <div className={style.job__location}>
            {jobDetails.distance && (
              <div className={style.job__sub}>
                {jobDetails.distance} km away
              </div>
            )}
            <div className={style.location}>
              <img src={mapPinIcon} alt="mapPin" />
              <span>{jobDetails.location}</span>
            </div>
          </div>
        </div>
        <span className={style.line}></span>
        <div className={style.rate}>£{jobDetails.rate_of_pay}/h</div>
        <span className={style.line}></span>
        <div className={style.job__info}>
          <div className={style.job__info_title}>Job Info</div>
          <div className={style.job__info_list}>
            <div className={style.job__info_item}>
              <div className={style.job__info_item_title}>Sector:</div>
              <div className={style.job__info_item_value}>
                {jobDetails.sector}
              </div>
            </div>
            <div className={style.job__info_item}>
              <div className={style.job__info_item_title}>Role:</div>
              <div className={style.job__info_item_value}>
                {jobDetails.role}
              </div>
            </div>
            {jobDetails.sector !== "Industrial & Driving" && (
              <div className={style.job__info_item}>
                <div className={style.job__info_item_title}>
                  {jobDetails.sector === "Hospitality"
                    ? "Establishment:"
                    : "Type of Site:"}
                </div>
                <div className={style.job__info_item_value}>
                  {jobDetails.establishment}
                </div>
              </div>
            )}
            <div className={style.job__info_item}>
              <div className={style.job__info_item_title}>
                Years experience:
              </div>
              <div className={style.job__info_item_value}>
                {jobDetails.experience}
              </div>
            </div>
            <div className={style.job__info_item}>
              <div className={style.job__info_item_title}>Postcode:</div>
              <div className={style.job__info_item_value}>
                {jobDetails.postcode}
              </div>
            </div>
            <div className={style.job__info_item}>
              <div className={style.job__info_item_title}>
                Part Time Or Full Time:
              </div>
              <div className={style.job__info_item_value}>
                {jobDetails.employmentType}
              </div>
            </div>
          </div>
        </div>
        <div className={style.job__info}>
          {jobDetails.sector === "Industrial & Driving" && (
            <>
              <div className={style.job__info_title}>Required Licences</div>
              <div className={style.job__info_list}>
                <div className={style.job__info_item}>
                  <div className={style.job__info_item_value}>
                    {Array.isArray(jobDetails.licences) &&
                    jobDetails.licences.length > 0
                      ? jobDetails.licences.join(", ")
                      : "Any"}
                  </div>
                </div>
              </div>
            </>
          )}
          {jobDetails.sector === "Hospitality" && (
            <>
              <div className={style.job__info_title}>Required Skills</div>
              <div className={style.job__info_list}>
                <div className={style.job__info_item}>
                  <div className={style.job__info_item_value}>
                    {Array.isArray(jobDetails.skills) &&
                    jobDetails.skills.length > 0
                      ? jobDetails.skills.join(", ")
                      : "Any"}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={style.job__info}>
          <div className={style.job__info_title}>Contact Info</div>
          <div className={style.job__contact_list}>
            <div className={style.job__contact_item}>
              <img src={userIcon} alt="userIcon" />
              <p>
                {jobDetails?.user?.first_name && jobDetails.user.first_name}{" "}
                {jobDetails?.user?.last_name && jobDetails.user.last_name}
              </p>
            </div>
            <div className={style.job__contact_item}>
              <img src={buildingIcon} alt="buildingIcon" />
              <p>{jobDetails?.user?.recruiter_data.company_name}</p>
            </div>
            <div className={style.job__contact_item}>
              <img src={phoneIcon} alt="phoneIcon" />
              <p>{jobDetails?.user?.phone_number}</p>
            </div>
            <div className={style.job__contact_item}>
              <img src={emailIcon} alt="emailIcon" />
              <p>{jobDetails?.user?.email}</p>
            </div>
          </div>
        </div>
        <div className={style.buttons}>
          <Button
            variant="primary"
            onClick={handleClose}
            className={style.button}
          >
            Back
          </Button>
          {isApply ? (
            <Button
              variant="primary"
              onClick={() => {
                handleDecline(id);
                handleClose();
              }}
              className={style.button__unapply}
            >
              Unapply
            </Button>
          ) : (
            <Button
              variant="primaryBlue"
              onClick={() => {
                handleApply(id);
                handleClose();
              }}
              className={style.button}
            >
              Apply
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
