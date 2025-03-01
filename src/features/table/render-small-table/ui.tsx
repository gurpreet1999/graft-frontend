import classNames from "classnames";
import style from "./table.module.css";
import userImg from "assets/images/profile/avatar.svg";
import { cloneElement } from "react";

interface IItem {
  id?: string;
  name_role_mail?: string;
  skills?: JSX.Element;
  experience?: string;
  postcode?: string;
  distance?: string;
  role?: string;
  button?: string;
  status?: string;
  nameAndRole?: JSX.Element;
  phone?: string;
  shortlist?: string;
  yearsExperience?: string;
  hire?: string;
  establishment?: string;
  date?: string;
  candidates?: string;
  message?: string;
  pricingPlan?: string;
  amount?: string;
  paymentMethod?: string;
  licences?: JSX.Element;
}

export const RenderSmallTable = ({ data }: any) => {
  if (!Array.isArray(data)) return null;
  return data.map((item: IItem, index: number) => (
    <div
      className={classNames(style.list__item, index % 2 === 0 && style._color)}
      key={index}
    >
      {item.id && item.status && item.date && (
        <div className={style.id__status}>
          <span className={style.item__text}>{item.id}</span>
          {item.status}
        </div>
      )}
      {item.date && (
        <div className={style.list__item_date_pricingPlan}>
          <div className={style.date__item}>
            <div className={style.item__header}>Date</div>
            <div className={style.item__text}>{item.date}</div>
          </div>
          {item.pricingPlan ? (
            <div className={style.pricingPlan__item}>
              <div className={style.item__header}>Pricing Plan</div>
              <div className={style.item__text}>{item.pricingPlan}</div>
            </div>
          ) : (
            item.amount && (
              <div className={style.amount__item}>
                <div className={style.item__header}>Amount</div>
                <div className={style.item__text}>{item.amount}</div>
              </div>
            )
          )}
        </div>
      )}

      {item.paymentMethod && (
        <div
          className={classNames(
            style.list__item_date_pricingPlan,
            style.payment
          )}
        >
          {item.amount && !!item.pricingPlan && (
            <div className={style.amount__item}>
              <div className={style.item__header}>Amount</div>
              <div className={style.item__text}>{item.amount}</div>
            </div>
          )}
          <div className={style.date__item}>
            <div className={style.item__header}>Payment Method</div>
            <div className={style.item__text}>{item.paymentMethod}</div>
          </div>
        </div>
      )}

      {item.nameAndRole && item.establishment && (
        <div className={style.list__item_nameAndRole}>
          <div className={style.list__item_role}>
            <img src={userImg} alt="avatar" />
            {cloneElement(item.nameAndRole, {
              establishment: item.establishment,
            })}
          </div>
        </div>
      )}
      {item.date && item.candidates && (
        <div className={style.list__item_date_canditates}>
          <div className={style.yearsExperience__item}>
            <div className={style.item__header}>Date</div>
            <div className={style.item__text}>{item.date}</div>
          </div>
          <div className={style.phone__item}>
            <div className={style.item__header}>Reached candidates</div>
            <div className={style.item__text}>{item.candidates}</div>
          </div>
        </div>
      )}
      {item.message && (
        <div className={style.list__item_message}>
          <div className={style.item__header}>Message</div>

          <div className={style.item__text}>{item.message}</div>
        </div>
      )}
      {item.role && item.button && (
        <>
          <div className={style.list__item_RoleButton}>
            <div className={style.list__item_role}>
              <div className={style.text}>{item.role}</div>
            </div>
            <div className={style.list__item_button}>
              <div className={style.text}>{item.button}</div>
            </div>
          </div>
          {item.status && <div className={style.status}>{item.status}</div>}
        </>
      )}
      {item.nameAndRole && !item.establishment && (
        <div className={style.list__item_nameAndRole}>
          <div className={style.list__item_role}>
            <img src={userImg} alt="avatar" />
            <div className={style.text}>{item.nameAndRole}</div>
          </div>
          <div className={style.list__item_status}>
            {item.status && <div>{item.status}</div>}
            {item.shortlist && <div>{item.shortlist}</div>}
          </div>
        </div>
      )}
      {item.yearsExperience && item.phone && (
        <div className={style.list__item_yearsExperience_phone}>
          <div className={style.yearsExperience__item}>
            <div className={style.item__header}>Years experience</div>
            <div className={style.item__text}>{item.yearsExperience}</div>
          </div>
          <div className={style.phone__item}>
            <div className={style.item__header}>Phone Number</div>
            <div className={style.item__text}>{item.phone}</div>
          </div>
        </div>
      )}
      {item.yearsExperience && item.postcode && (
        <div className={style.list__item_yearsExperience_postcode}>
          <div className={style.yearsExperience__item}>
            <div className={style.item__header}>Years experience</div>
            <div className={style.item__text}>{item.yearsExperience}</div>
          </div>
          <div className={style.phone__item}>
            <div className={style.item__header}>Postcode</div>
            <div className={style.item__text}>{item.postcode}</div>
          </div>
        </div>
      )}
      {item.name_role_mail && (
        <div className={style.list__item_name_role_mail}>
          <div className={style.text}>{item.name_role_mail}</div>
        </div>
      )}
      {item.skills?.props.text &&
        (!item.licences?.props.text || item.licences?.props.text === "-") && (
          <div className={style.list__item_skills}>
            <div className={style.item__header}>Skills</div>
            <div className={style.item__text}>{item.skills}</div>
          </div>
        )}
      {item.licences?.props.text &&
        (!item.skills?.props.text ||
          item.skills?.props.text === "N/A" ||
          "-") && (
          <div className={style.list__item_skills}>
            <div className={style.item__header}>Licences</div>
            <div className={style.item__text}>{item.licences}</div>
          </div>
        )}
      {item.yearsExperience && item.postcode && item.distance && (
        <div className={style.list__item_phone}>
          <div className={style.item__header}>Phone Number</div>
          <div className={style.item__text}>{item.phone}</div>
        </div>
      )}
      {!item.yearsExperience && item.phone && (
        <div className={style.list__item_phone}>
          <div className={style.item__header}>Phone Number</div>
          <div className={style.item__text}>{item.phone}</div>
        </div>
      )}
      {(item.experience || item.yearsExperience) && item.postcode && (
        <div className={style.list__item_experience_postcode_distance}>
          <div className={style.experience__item}>
            <div className={style.item__header}>Years experience</div>
            <div className={style.item__text}>{item.experience}</div>
          </div>
          <div className={style.postcode__item}>
            <div className={style.item__header}>Postcode</div>
            <div className={style.item__text}>{item.postcode}</div>
          </div>
          <div className={style.distance__item}>
            <div className={style.item__header}>Distance</div>
            <div className={style.item__text}>{item.distance || "N/A"}</div>
          </div>
        </div>
      )}
      {item.hire && <div className={style.list__item_hire}>{item.hire}</div>}
    </div>
  ));
};
