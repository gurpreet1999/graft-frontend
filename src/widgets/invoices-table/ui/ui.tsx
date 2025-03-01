import { useEffect, useState } from "react";
import style from "./style.module.css";
import { InvoicesFilters } from "./filters";
import { Button, Card, CardHeader, EmptyState, TabButton } from "shared/ui";
import { BillingApi } from "shared/api";
import { Table } from "features/table";
import { COLUMNS_CREDITS, COLUMNS_PLAN } from "./columns";
import { formatTableData, IFormatInvoice } from "./helpers";
import { usePageWidth } from "shared/hooks";
import filterIcon from "assets/images/invoices/filter.svg";
import receiptIcon from "assets/images/invoices/receipt.svg";
import classNames from "classnames";

interface IInvoicesTable {
  hideFilters?: boolean;
  hideTabs?: boolean;
  hidePagination?: boolean;
  showTitle?: boolean;
}

const getDate = (date: string) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toISOString();
};

export const InvoicesTable = ({
  hideFilters,
  hideTabs,
  hidePagination,
  showTitle,
}: IInvoicesTable) => {
  const width = usePageWidth();
  const [invoices, setInvoices] = useState<IFormatInvoice[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [type, setType] = useState<InvoiceType>("SUBSCRIPTION");
  const [filters, setFilters] = useState<IFilters>();
  const [openFilters, setOpenFilters] = useState<boolean>(width > 768);
  const [sortBy, setSortBy] = useState<string>();
  const [sortOrder, setSortOrder] = useState<string>();

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await BillingApi.getInvoices(
        page,
        pageSize,
        type,
        filters?.status,
        filters?.payment,
        filters?.amount?.from ? Number(filters.amount.from) * 100 : undefined,
        filters?.amount?.to ? Number(filters.amount.to) * 100 : undefined,
        filters?.date?.from,
        filters?.date?.to ? getDate(filters.date.to) : undefined,
        sortBy,
        sortOrder
      );
      setInvoices(formatTableData(response.invoices));
      setTotal(response.total_count);
    };
    fetchInvoices();
  }, [page, pageSize, type, filters, sortBy, sortOrder]);

  const changeTab = (tab: InvoiceType) => {
    setType(tab);
    setPage(1);
  };

  return (
    <div className={style.container}>
      <Card
        className={classNames(
          style.table__container,
          hidePagination && hideTabs && style.small
        )}
      >
        {showTitle && (
          <div className={style.title}>
            <CardHeader image={receiptIcon} title="Invoices" />
            {hidePagination && hideTabs && (
              <Button
                href="/invoices"
                variant="primary"
                className={style.button}
              >
                See more
              </Button>
            )}
          </div>
        )}
        {width <= 768 && !hideFilters && invoices.length > 0 && (
          <Button
            variant="primary"
            className={style.filter__button}
            onClick={() => {
              setOpenFilters(!openFilters);
            }}
          >
            <img src={filterIcon} alt="filter" />
          </Button>
        )}
        {!hideTabs && (
          <div className={style.header}>
            <div className={style.tabs}>
              <TabButton
                tabName={"SUBSCRIPTION"}
                currentTab={type}
                changeTab={changeTab}
              >
                Subscription Payments
              </TabButton>
              <TabButton
                tabName={"CREDITS"}
                currentTab={type}
                changeTab={changeTab}
              >
                Credits Payments
              </TabButton>
            </div>
          </div>
        )}
        <Table
          columns={type === "SUBSCRIPTION" ? COLUMNS_PLAN : COLUMNS_CREDITS}
          data={invoices}
          pageSize={pageSize}
          totalItems={total}
          currentPage={page}
          handlePageChange={setPage}
          handleChangePageSize={setPageSize}
          showPagination={!hidePagination}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          sortBy={sortBy}
          paginationClassName={style.paginate}
          sortOrder={sortOrder}
          sortedColumns={["date", "amount"]}
          className={classNames(
            hidePagination && hideTabs ? style.table__sm : style.table
          )}
          dropdownClassName={style.dropdown}
          direction={width < 768 ? "bottom" : "top"}
          emptyState={
            <EmptyState
              text={
                type === "SUBSCRIPTION" ? (
                  <>
                    <p>You haven&apos;t had subscription payments yet. </p>
                    <p className="empty__bold">
                      First invoice will appear here after your subscription
                      renewal.
                    </p>
                  </>
                ) : (
                  <>
                    <p>You haven&apos;t completed any credit purchases yet. </p>
                    <p className="empty__bold">
                      Try buying additional credits for your campaigns
                    </p>
                  </>
                )
              }
            />
          }
        />
      </Card>
      {openFilters && !hideFilters && (
        <InvoicesFilters
          filters={filters}
          setFilters={setFilters}
          setOpenFilters={setOpenFilters}
        />
      )}
    </div>
  );
};
