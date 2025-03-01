import { Heading } from "shared/ui";
import style from "./style.module.css";
import { InvoicesTable } from "widgets/invoices-table";

export const Invoices = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Heading variant="h2">Invoices</Heading>
        <div className={style.header__text}>
          Welcome to your Invoices. Here you can filter through past invoices,
          credit payments, and download a copy for your records.
        </div>
      </div>
      <InvoicesTable />
    </div>
  );
};
