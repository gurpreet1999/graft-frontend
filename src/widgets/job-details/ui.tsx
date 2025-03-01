import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardHeader, StatusCell } from "shared/ui";
import style from "./jobDetails.module.css";
import noteIcon from "assets/images/button/note.svg";
import archiveIcon from "assets/images/button/archive.svg";
import { useGetSuggestions } from "shared/hooks";
import classNames from "classnames";
import { JobDetailsClass } from "features/job-details";

export const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<INormalizedJobData>();
  const { experience } = useGetSuggestions();
  const [triggerEffect, setTriggerEffect] = useState(false);

  const toggleEffect = () => setTriggerEffect((prev) => !prev);

  useEffect(() => {
    if (!id || !experience) return;
    JobDetailsClass.getJobDetailsData(id, experience).then((data) => {
      setDetails(data);
    });
  }, [id, experience, triggerEffect]);

  const handleUnpublish = () => {
    if (!details) return;
    JobDetailsClass.unpublishJob(details.id).then(toggleEffect);
  };

  const handlePublish = () => {
    if (!details) return;
    JobDetailsClass.publishJob(details.id).then(toggleEffect);
  };

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader title="Job Details" image={noteIcon} />
        <div className={style.header__button}>
          {/* <Button variant="primary" className={style.button}>
            <img src={deleteIcon} alt="detele" />
            Remove
          </Button> */}
          {details?.status === "PUBLISHED" ? (
            <Button
              variant="primary"
              className={style.button}
              onClick={handleUnpublish}
            >
              <img src={archiveIcon} alt="archive" />
              Unpublish
            </Button>
          ) : (
            <Button
              variant="primaryBlue"
              className={classNames(style.button, style.button__publish)}
              onClick={handlePublish}
            >
              <img src={archiveIcon} alt="archive" />
              Publish
            </Button>
          )}
        </div>
      </div>
      <div className={style.campaign}>
        <div className={style.campaign__info}>
          <p>
            {details?.role} for {details?.user.recruiter_data.company_name}{" "}
          </p>
          <StatusCell
            status={details?.status === "PUBLISHED" ? "Published" : "Draft"}
          />
        </div>
      </div>
      <div className={style.details__wrapper}>
        <div className={style.details}>
          <p>Main info</p>
          <div className={style.details__item}>
            <p className={style.details__title}>Sector:</p>
            <p className={style.details__value}>{details?.sector}</p>
          </div>
          <div className={style.details__item}>
            <p className={style.details__title}>Role:</p>
            <p className={style.details__value}>{details?.role}</p>
          </div>
          {details?.sector !== "Industrial & Driving" && (
            <div className={style.details__item}>
              <p className={style.details__title}>Establishment:</p>
              <p className={style.details__value}>{details?.establishment}</p>
            </div>
          )}
          <div className={style.details__item}>
            <p className={style.details__title}>Years experience:</p>
            <p className={style.details__value}>{details?.experience}</p>
          </div>
          {details?.sector === "Industrial & Driving" && (
            <div className={style.details__item}>
              <p className={style.details__title}>Availability:</p>
              <p className={style.details__value}>
                {details?.availability?.join(", ") || "Any"}
              </p>
            </div>
          )}
          <div className={style.details__item}>
            <p className={style.details__title}>Postcode:</p>
            <p className={style.details__value}>{details?.postcode}</p>
          </div>
          <div className={style.details__item}>
            <p className={style.details__title}>Distance:</p>
            <p className={style.details__value}>
              {details?.distance ? `${details?.distance} km` : "Any"}
            </p>
          </div>
          <div className={style.details__item}>
            <p className={style.details__title}>Location:</p>
            <p className={style.details__value}>
              {details?.location ? details?.location : "Any"}
            </p>
          </div>
          <div className={style.details__item}>
            <p className={style.details__title}>Rate of Pay:</p>
            <p className={style.details__value}>{details?.rate_of_pay} £/h</p>
          </div>
          <div className={style.details__item}>
            <p className={style.details__title}>Part Time Or Full Time:</p>
            <p className={style.details__value}>{details?.employmentType}</p>
          </div>
        </div>
        <div className={classNames(style.details, style.second)}>
          {details?.sector === "Hospitality" && (
            <div className={style.skills}>
              <p className={style.title}>Skills</p>
              {details?.skills.join(", ") || "Any"}
            </div>
          )}
          {details?.sector === "Industrial & Driving" && (
            <div className={style.skills}>
              <p className={style.title}>Licences</p>
              {details?.licences?.join(", ") || "Any"}
            </div>
          )}
          <div className={style.contact}>
            <p className={style.title}>Contact Details</p>
            <div className={style.details__item}>
              <p className={style.details__title}>Company Name:</p>
              <p className={style.details__value}>
                {details?.user.recruiter_data.company_name}
              </p>
            </div>
            <div className={style.details__item}>
              <p className={style.details__title}>Contact Details Name:</p>
              <p className={style.details__value}>{details?.user.first_name}</p>
            </div>
            <div className={style.details__item}>
              <p className={style.details__title}>Phone Number:</p>
              <p className={style.details__value}>
                {details?.user.phone_number}
              </p>
            </div>
            <div className={style.details__item}>
              <p className={style.details__title}>Email:</p>
              <p className={style.details__value}>{details?.user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer__button}>
        {/* <Button variant="primary" className={style.button}>
          <img src={deleteIcon} alt="detele" />
          Remove
        </Button> */}
        {details?.status === "PUBLISHED" ? (
          <Button
            variant="primary"
            className={style.button}
            onClick={handleUnpublish}
          >
            <img src={archiveIcon} alt="archive" />
            Unpublish
          </Button>
        ) : (
          <Button
            variant="primaryBlue"
            className={classNames(style.button, style.button__publish)}
            onClick={handlePublish}
          >
            <img src={archiveIcon} alt="archive" />
            Publish
          </Button>
        )}
      </div>
    </Card>
  );
};
