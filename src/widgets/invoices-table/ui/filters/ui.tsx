import { useEffect, useState } from "react";
import style from "./style.module.css";
import {
  Button,
  Card,
  CardHeader,
  DateRangeInput,
  InputSelect,
  InputSelectNumber,
} from "shared/ui";
import filterIcon from "assets/images/invoices/filter.svg";
import checkIcon from "assets/images/invoices/check.svg";
import { BillingApi, IInvoicesFilters } from "shared/api";
import { transformStatusOptions } from "../../../../shared/ui/InputSelect/helpers";
import statusIcon from "assets/images/invoices/status.svg";
import paymentIcon from "assets/images/invoices/method.svg";
import amountIcon from "assets/images/invoices/amount.svg";
import calendarIcon from "assets/images/invoices/calendar.svg";
import { usePageWidth } from "shared/hooks";

interface IInvoicesFiltersProps {
  filters?: IFilters;
  setFilters: (filters: IFilters) => void;
  setOpenFilters: (openFilters: boolean) => void;
}

export const InvoicesFilters = ({
  filters,
  setFilters,
  setOpenFilters,
}: IInvoicesFiltersProps) => {
  const width = usePageWidth();
  const [status, setStatus] = useState<IDocumentType>({
    id: "",
    name: "",
  });
  const [amountFrom, setAmountFrom] = useState<string>();
  const [amountTo, setAmountTo] = useState<string>();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [invoiceFilters, setInvoiceFilters] = useState<IInvoicesFilters>();

  useEffect(() => {
    BillingApi.getInvoicesFilters().then((data) => {
      setInvoiceFilters(data);
    });
  }, [filters]);

  const applyFilters = () => {
    setFilters({
      status: status?.id === "" ? undefined : status?.id,
      amount: {
        from: amountFrom,
        to: amountTo === "max" ? undefined : amountTo,
      },
      date: {
        from: dateFrom ? dateFrom.toISOString() : undefined,
        to: dateTo ? dateTo.toISOString() : undefined,
      },
    });
    if (width < 768) setOpenFilters(false);
  };

  return (
    <Card className={style.container}>
      <CardHeader image={filterIcon} title="Filters" />
      <div className={style.filters__container}>
        {invoiceFilters && (
          <div className={style.input__container}>
            <InputSelect
              options={transformStatusOptions(invoiceFilters.statuses)}
              placeholder="Select"
              handleChange={setStatus}
              value={status}
              label="Status"
              labelIcon={statusIcon}
            />
            <InputSelect
              options={invoiceFilters.payment_methods}
              placeholder="Payment"
              handleChange={() => {}}
              value={{ id: "stripe", name: "Stripe", value: "Stripe" }}
              label="Payment"
              disabled
              labelIcon={paymentIcon}
            />
          </div>
        )}
        <div className={style.filters__wrapper}>
          <DateRangeInput
            label="Date"
            labelIcon={calendarIcon}
            startDate={dateFrom}
            setStartDate={setDateFrom}
            endDate={dateTo}
            setEndDate={setDateTo}
            className={style.date}
          />
          <div className={style.filters__container_small}>
            <InputSelectNumber
              label="Amount"
              labelIcon={amountIcon}
              placeholder="From"
              handleChange={setAmountFrom}
              value={amountFrom}
            />
            <InputSelectNumber
              placeholder="To"
              handleChange={setAmountTo}
              value={amountTo}
              className={style.input__small}
              useMaxOption
            />
          </div>
        </div>
      </div>

      <Button variant="primary" onClick={applyFilters}>
        <img src={checkIcon} alt="check" />
        Apply
      </Button>
    </Card>
  );
};
