import { Card, CardHeader, EmptyState, useTheme } from "shared/ui";
import glassIcon from "assets/images/search/glass.svg";
import style from "./search.module.css";
import { Table } from "features/table";
import { Column } from "react-table";
import emptySearchLight from "assets/animation/searchEmptyLight.json";
import emptySearchDark from "assets/animation/searchEmptyDark.json";
import noSearchLight from "assets/animation/searchNoneLight.json";
import noSearchDark from "assets/animation/searchNoneDark.json";

interface ISearchCandidatesTable {
  columns: Column[];
  tableData: any;
  pageSize: number;
  currentPage: number;
  handlePageChange: (page: number, totalPage: number) => void;
  handleChangePageSize: (size: number) => void;
  totalItems: number;
  searchPerformed: boolean;
}

export const SearchCandidatesTable = ({
  columns,
  tableData,
  pageSize,
  currentPage,
  handlePageChange,
  handleChangePageSize,
  totalItems,
  searchPerformed,
}: ISearchCandidatesTable) => {
  const { theme } = useTheme();
  return (
    <Card className={style.container}>
      <CardHeader title="Results" image={glassIcon} className={style.header} />
      {searchPerformed && tableData ? (
        <Table
          columns={columns}
          data={tableData}
          pageSize={pageSize}
          className={style.table}
          resultContainerClassName={style.resultContainer}
          resultClassName={style.result}
          dropdownClassName={style.dropdown}
          paginationClassName={style.pagination}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          handleChangePageSize={handleChangePageSize}
          totalItems={totalItems}
          emptyState={
            <EmptyState
              jsonAnimation={
                theme === "light" ? emptySearchLight : emptySearchDark
              }
              text={
                <>
                  <p className="empty__bold">Oops...</p>
                  <p>
                    There is no candidate who&apos;s matched with your search
                    filters.
                  </p>
                  <p className="empty__bold">
                    Try changing your filters to find out more candidates.
                  </p>
                </>
              }
            />
          }
        />
      ) : (
        <EmptyState
          jsonAnimation={theme === "light" ? noSearchLight : noSearchDark}
          text={
            <p>
              Try selecting your preferred parameters to find a perfect set of
              candidates
            </p>
          }
        />
      )}
    </Card>
  );
};
