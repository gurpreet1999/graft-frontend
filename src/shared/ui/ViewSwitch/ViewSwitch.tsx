import style from "./ViewSwitch.module.css";
import listIcon from "assets/images/view-switch/list.svg";
import tableIcon from "assets/images/view-switch/table.svg";
import classNames from "classnames";

export type ViewType = "list" | "table";

interface IViewSwitch {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  className?: string;
}

export const ViewSwitch = ({
  activeView,
  setActiveView,
  className,
}: IViewSwitch) => {
  return (
    <div className={classNames(style.container, className)}>
      <button
        className={classNames(
          style.switch,
          activeView === "table" && style.active
        )}
        onClick={() => {
          setActiveView("table");
        }}
        type="button"
      >
        <img src={listIcon} alt="List view" />
      </button>
      <button
        className={classNames(
          style.switch,
          activeView === "list" && style.active
        )}
        onClick={() => {
          setActiveView("list");
        }}
        type="button"
      >
        <img src={tableIcon} alt="Table view" />
      </button>
    </div>
  );
};
