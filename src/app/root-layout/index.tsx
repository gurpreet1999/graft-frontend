import { ReactNode } from "react";
import { IRoute, SideNav } from "features/SideNav";

import style from "./style.module.css";
import { TopBar } from "widgets";
import { Breadcrumbs } from "shared/ui";

interface ILayoutProps {
  children: ReactNode;
  routes: IRoute[];
}

export const Layout = ({ children, routes }: ILayoutProps) => {
  return (
    <div className={style.layout__container}>
      <SideNav routes={routes} />
      <main className={style.components}>
        <TopBar />
        <div className={style.page}>
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </div>
  );
};
