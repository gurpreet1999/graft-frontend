import classNames from "classnames";
import style from "./TabButton.module.css";

interface ITabButton<T> {
  tabName: T;
  currentTab: T;
  children: React.ReactNode;
  changeTab: (value: T) => void;
  className?: string;
}

export const TabButton = <T,>({
  tabName,
  currentTab,
  children,
  changeTab,
  className,
}: ITabButton<T>) => {
  const handleTabChange = () => {
    changeTab(tabName);
  };

  return (
    <button
      onClick={handleTabChange}
      className={classNames(
        style.tab,
        className,
        currentTab === tabName && style.active
      )}
    >
      {children}
    </button>
  );
};
