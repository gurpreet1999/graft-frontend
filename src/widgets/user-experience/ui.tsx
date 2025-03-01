import { Card, CardHeader } from "shared/ui";
import headerIcon from "assets/images/jobs/Notebook.svg";
import style from "./style.module.css";
import { useGetSuggestions } from "shared/hooks";

export const UserExperience = ({ user }: { user: IUser }) => {
  const { experience } = useGetSuggestions();

  const { sector_id, years_experience_id } = user.candidate_data;

  const sector = experience?.sectors[sector_id];

  if (!experience || !sector) return null;

  return (
    <Card className={style.container}>
      <div className={style.header__container}>
        <CardHeader
          className={style.title}
          image={headerIcon}
          title="Work Experience"
        />
      </div>
      <div className={style.wrapper}>
        <div className={style.info__item}>
          <p className={style.info__label}>Sector</p>
          <p className={style.info__value}>{sector?.value}</p>
        </div>
        <div className={style.info__item}>
          <p className={style.info__label}>
            Total Years {sector?.value} Experience
          </p>
          <p className={style.info__value}>
            {experience.yearsExperience[years_experience_id].value}
          </p>
        </div>
      </div>
      {sector?.value === "Hospitality" && (
        <>
          <div className={style.wrapper}>
            <div className={style.info__item}>
              <p className={style.info__label}>Main Type Of Establishment</p>
              <p className={style.info__value}>
                {
                  experience.hospitalityEstablishments[
                    user.candidate_data.hospitality_main_establishment_id
                  ].value
                }
              </p>
            </div>
            <div className={style.info__item}>
              <p className={style.info__label}>Second Type Of Establishment</p>
              <p className={style.info__value}>
                {
                  experience.hospitalityEstablishments[
                    user.candidate_data.hospitality_second_establishment_id
                  ].value
                }
              </p>
            </div>
          </div>
          <div className={style.wrapper}>
            <div className={style.info__item}>
              <p className={style.info__label}>
                1st Role Looking For Preference
              </p>
              <p className={style.info__value}>
                {
                  experience.hospitalityRoles[
                    user.candidate_data.hospitality_first_role_id
                  ].value
                }
              </p>
            </div>
            <div className={style.info__item}>
              <p className={style.info__label}>
                2nd Role Looking For Preference
              </p>
              <div className={style.info__value}>
                {
                  experience.hospitalityRoles[
                    user.candidate_data.hospitality_second_role_id
                  ].value
                }
              </div>
            </div>
          </div>
        </>
      )}
      {sector?.value === "Construction" && (
        <>
          <div className={style.wrapper}>
            <div className={style.info__item}>
              <p className={style.info__label}>Role</p>
              <p className={style.info__value}>
                {
                  experience.constructionRoles[
                    user.candidate_data.construction_role_id
                  ].value
                }
              </p>
            </div>
            <div className={style.info__item}>
              <p className={style.info__label}>Card Type</p>
              <p className={style.info__value}>
                {
                  experience.constructionCardTypes[
                    user.candidate_data.construction_card_type_id
                  ].value
                }
              </p>
            </div>
          </div>
        </>
      )}
      {sector?.value === "Industrial & Driving" && (
        <>
          <div className={style.wrapper}>
            <div className={style.info__item}>
              <p className={style.info__label}>Role</p>
              <p className={style.info__value}>
                {
                  experience.industrialAndDrivingRoles[
                    user.candidate_data.industrial_and_driving_role_id
                  ].value
                }
              </p>
            </div>
            <div className={style.info__item}>
              <p className={style.info__label}>Licences</p>
              <p className={style.info__value}>
                {user.candidate_data.industrial_and_driving_licences.map(
                  (licence, index, arr) => (
                    <span key={licence}>
                      {experience.industrialAndDrivingLicences[licence].value}
                      {arr.length !== index + 1 && ", "}
                    </span>
                  )
                )}
              </p>
            </div>
          </div>
        </>
      )}
      <div className={style.wrapper}>
        <div className={style.info__item}>
          <p className={style.info__label}>Daily Job Update Preference</p>
          <p className={style.info__value}>
            {
              experience.dailyJobUpdates[
                user.candidate_data.daily_job_update_id
              ].value
            }
          </p>
        </div>
        <div className={style.info__item}>
          <p className={style.info__label}>Applied to jobs</p>
          <p className={style.info__value}>{user.applied_jobs}</p>
        </div>
      </div>
      {sector?.value === "Hospitality" && (
        <div className={style.info__item}>
          <p className={style.info__label}>Skills</p>
          <p className={style.info__value}>
            {user.candidate_data.skills.map((skill, index, arr) => (
              <span key={skill}>
                {experience.skills[skill].value}
                {arr.length !== index + 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      )}
    </Card>
  );
};
