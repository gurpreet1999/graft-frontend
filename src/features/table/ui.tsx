import { Column, useTable, useSortBy } from "react-table";
import style from "./table.module.css";
import classNames from "classnames";
import { PageDropdown } from "shared/ui";
import ReactPaginate from "react-paginate";
import carretLeft from "assets/images/table/CaretLeft.svg";
import carretRight from "assets/images/table/CaretRight.svg";
import { usePageWidth } from "shared/hooks";
import { RenderSmallTable } from "./render-small-table/ui";
import sortAscImage from "assets/images/table/SortAscending.svg";
import ScrollContainer from "react-indiana-drag-scroll";

interface ITableProps<T extends object> {
  columns: Column[];
  data: T[];
  pageSize: number;
  currentPage: number;
  handlePageChange: (page: number, totalPage: number) => void;
  handleChangePageSize: (size: number) => void;
  totalItems: number;
  loading?: boolean;
  className?: string;
  showOnlyBullet?: boolean;
  showPagination?: boolean;
  paginationClassName?: string;
  dropdownClassName?: string;
  resultClassName?: string;
  direction?: "top" | "bottom";
  emptyState?: JSX.Element;
  setSortBy?: (sortBy: string | undefined) => void;
  setSortOrder?: (sortOrder: string | undefined) => void;
  sortBy?: string;
  sortOrder?: string;
  sortedColumns?: string[];
  ListView?: React.ComponentType<{ data: any }>;
  additionalProps?: any;
  resultContainerClassName?: string;
}

const getClassNames = (
  sortBy?: string,
  sortOrder?: string,
  columnId?: string
) => {
  return classNames(
    style.table__header_wrapper,
    (sortBy === columnId || (sortBy === "created_at" && columnId === "date")) &&
      sortOrder === "ASC" &&
      style._asc,
    (sortBy === columnId || (sortBy === "created_at" && columnId === "date")) &&
      sortOrder === "DESC" &&
      style._desc
  );
};

export const Table = <T extends object>({
  columns,
  data,
  pageSize,
  currentPage,
  handlePageChange,
  handleChangePageSize,
  totalItems,
  className,
  paginationClassName,
  dropdownClassName,
  resultClassName,
  showOnlyBullet = false,
  showPagination = true,
  direction = "top",
  emptyState,
  setSortBy,
  setSortOrder,
  sortBy,
  sortOrder,
  sortedColumns,
  ListView,
  resultContainerClassName,
  additionalProps,
}: ITableProps<T>) => {
  const width = usePageWidth();
  const table = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  const rangeDisplayed = currentPage * pageSize;
  const firstRangeDisplayed = rangeDisplayed - pageSize + 1;
  const lastRangeDisplayed =
    rangeDisplayed > totalItems ? totalItems : rangeDisplayed;

  if (data.length === 0) {
    return (
      <div className={classNames(style.table__container, className)}>
        <div className={style.empty}>
          <ScrollContainer
            className={style.scroll_container}
            hideScrollbars={false}
            vertical={false}
            nativeMobileScroll={true}
          >
            {emptyState}
          </ScrollContainer>
        </div>
      </div>
    );
  }

  const setSort = (colName: string) => {
    if (colName === "date") {
      colName = "created_at";
    }
    setSortBy && setSortBy(colName);
    if (sortBy === colName && sortOrder === "ASC") {
      setSortOrder && setSortOrder("DESC");
    }
    if (sortBy === colName && sortOrder === "DESC") {
      setSortBy && setSortBy(undefined);
      setSortOrder && setSortOrder(undefined);
    }
    if (sortBy !== colName) {
      setSortOrder && setSortOrder("ASC");
    }
  };

  return (
    <div className={classNames(style.table__container, className)}>
      <div className={style.table}>
        <ScrollContainer
          className={style.scroll_container}
          hideScrollbars={false}
          vertical={false}
          nativeMobileScroll={true}
        >
          {ListView ? (
            <div className={style.list__view}>
              {data.map((item, index) => (
                <ListView key={index} data={item} {...additionalProps} />
              ))}
            </div>
          ) : (
            <>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          className={style.table__header}
                          {...column.getHeaderProps()}
                          key={column.id}
                        >
                          {sortedColumns?.includes(column.id) ? (
                            <button
                              onClick={() => setSort(column.id)}
                              className={getClassNames(
                                sortBy,
                                sortOrder,
                                column.id
                              )}
                            >
                              {column.render("Header")}
                              <img src={sortAscImage} alt="sortAsc" />
                            </button>
                          ) : (
                            <div className={style.table__header_wrapper}>
                              {column.render("Header")}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={classNames(
                          style.row,
                          index % 2 === 0 && style.odd
                        )}
                        key={row.id}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              className={style.cell}
                              {...cell.getCellProps()}
                              key={`${row.id}-${cell.column.id}`}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={style.list}>
                <RenderSmallTable data={data} />
              </div>
            </>
          )}
        </ScrollContainer>
      </div>

      {showPagination && (
        <>
          {!showOnlyBullet && (
            <div
              className={classNames(
                style.pages__results,
                resultContainerClassName
              )}
            >
              <div className={classNames(style.result, resultClassName)}>
                Showing <span>{firstRangeDisplayed}</span> to{" "}
                <span>{lastRangeDisplayed}</span> of <span>{totalItems}</span>{" "}
                results
              </div>
              <PageDropdown
                className={classNames(style.button__page, dropdownClassName)}
                pageSize={pageSize}
                handlePageSizeChange={handleChangePageSize}
                direction={direction}
              />
            </div>
          )}
          <ReactPaginate
            pageCount={Math.ceil(totalItems / pageSize)}
            pageRangeDisplayed={width < 1116 ? 2 : 5}
            marginPagesDisplayed={1}
            previousLabel={<img src={carretLeft} alt="carretLeft" />}
            nextLabel={<img src={carretRight} alt="carretRight" />}
            breakLabel="..."
            containerClassName={classNames(style.paginate, paginationClassName)}
            pageClassName={style.paginate__page}
            activeClassName={style.paginate__page_active}
            nextClassName={classNames(
              style.paginate__next,
              showOnlyBullet && style._hide
            )}
            previousClassName={classNames(
              style.paginate__previous,
              showOnlyBullet && style._hide
            )}
            breakClassName={style.paginate__break}
            onPageChange={({ selected }) => {
              handlePageChange(selected + 1, Math.ceil(totalItems / pageSize));
            }}
            forcePage={currentPage - 1}
          />
        </>
      )}
    </div>
  );
};
