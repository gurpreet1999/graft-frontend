import { Link, useLocation } from "react-router-dom";
import style from "./Breadcrumbs.module.css";
import breadcrumbsIcon from "assets/images/header/breadcrumbs.svg";
import breadcrumbsJobs from "assets/images/header/breadcrumbsJobs.svg";
import breadcrumbsCampaign from "assets/images/header/breadcrumbsCampaign.svg";
import breadcrumbsUM from "assets/images/header/breadcrumbsUM.svg";
import classNames from "classnames";

interface IBreadcrumb {
  name: string;
  path: string;
  isActive: boolean;
}

const getIcon = (path: string) => {
  switch (path) {
    case "dashboard":
      return breadcrumbsIcon;
    case "jobs":
      return breadcrumbsJobs;
    case "campaign":
      return breadcrumbsCampaign;
    case "user-management":
      return breadcrumbsUM;
    default:
      return breadcrumbsIcon;
  }
};

const isUUID = (str: string) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    str
  );
};

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const splitPath = pathname.split("/");

  if (splitPath.length <= 2) {
    return null;
  }

  const breadcrumbsIcon = getIcon(splitPath[1]);

  const breadcrumbs: IBreadcrumb[] = splitPath.map((item, index, arr) => {
    const nextItemIsUUID = isUUID(arr[index + 1]);
    const pathSegments = arr.slice(0, index + 1);
    if (nextItemIsUUID) {
      pathSegments.push(arr[index + 1]);
    }
    const path = pathSegments.join("/");
    const isActive =
      index === arr.length - 1 || (index === arr.length - 2 && nextItemIsUUID);

    return {
      name: item,
      path: path,
      isActive: isActive,
    };
  });

  return (
    <div className={style.breadcrumbs}>
      <Link to="/">
        <img
          src={breadcrumbsIcon}
          alt="breadcrumbs"
          className={style.breadcrumbs__icon}
        />
      </Link>
      {breadcrumbs.map((item: IBreadcrumb, index) => {
        if (isUUID(item.name)) return null;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={classNames(
              style.breadcrumbs__item,
              item.isActive && style.breadcrumbs__active
            )}
          >
            {item.name !== breadcrumbs[0].name && index !== 1 && (
              <span className={style.breadcrumbs__slash}>/</span>
            )}
            <span className={style.breadcrumbs__text}>
              {item.name.replace(/-/g, " ")}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
