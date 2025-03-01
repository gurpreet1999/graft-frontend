import { Heading } from "shared/ui";
import style from "./search.module.css";
import { CreateCampaign } from "features/create-campaign/ui/ui";
import { useEffect, useState } from "react";
import { SearchCandidatesForm } from "./search-candidates-form";
import { SearchCandidatesTable } from "./search-candidates-table";
import { Search } from "../lib";
import { useGetSuggestions } from "shared/hooks";
import {
  COLUMNS,
  COLUMNS_WITH_DISTANCE,
  COLUMNS_WITHOUT_SKILLS,
  COLUMNS_WITHOUT_SKILLS_AND_DISTANCE,
  INDUSTRIAL_COLUMNS,
  INDUSTRIAL_COLUMNS_WITH_DISTANCE,
} from "./columns";
import classNames from "classnames";
import { RecruiterSteps } from "features/walkthrough/recruiter";
import { searchSteps } from "features/walkthrough/recruiter/steps";

const getColumns = (distance: boolean, sector: string) => {
  if (sector === "Hospitality") {
    if (distance) {
      return COLUMNS_WITH_DISTANCE;
    }
    return COLUMNS;
  }
  if (sector === "Construction") {
    if (distance) {
      return COLUMNS_WITHOUT_SKILLS;
    }
    return COLUMNS_WITHOUT_SKILLS_AND_DISTANCE;
  }
  if (sector === "Industrial & Driving") {
    if (distance) {
      return INDUSTRIAL_COLUMNS_WITH_DISTANCE;
    }
    return INDUSTRIAL_COLUMNS;
  }
  return COLUMNS;
};

export const SearchCandidatesFlow = () => {
  const [searchState, setSearchState] = useState<ISearchState>({
    sector: {
      value: "",
      id: "",
    },
    fields: {} as ISearchForms,
  });
  const { experience } = useGetSuggestions();
  const [tableData, setTableData] = useState<any[]>([]);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handlePageChange = (page: number, totalPage: number) => {
    if (page !== currentPage && page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const handleSearchData = async (
    sector: ISuggestion,
    fields: ISearchForms
  ) => {
    setSearchState({ sector: sector, fields });
    if (!experience) return;

    setSearchPerformed(true);
  };

  useEffect(() => {
    setTableData([]);
    if (searchPerformed && experience) {
      Search.getTableData(
        searchState.sector,
        searchState.fields,
        pageSize,
        currentPage,
        experience
      ).then((data) => {
        if (!data) return;
        setTableData(data.table);
        setTotalItems(data.totalItems);
      });
    }
  }, [currentPage, pageSize, experience, searchState, searchPerformed]);

  return (
    <div className={style.container}>
      <div className={classNames(style.onboarding, "search")} />
      <div className={classNames(style.onboarding2, "search__result")} />
      <RecruiterSteps steps={searchSteps} identifier="search" />
      <div className={style.header}>
        <div className={style.header__wrapper}>
          <div className={style.header__info}>
            <Heading variant="h2">Search</Heading>
            <div className={style.header__text}>
              Welcome to your Search page where you can search for the perfect
              candidates for your role, then create a unique SMS campaign to
              notify them about it.
            </div>
          </div>
          <CreateCampaign
            from="search"
            searchState={searchState}
            candidatesFound={totalItems}
          />
        </div>
        <div className={style.header__text_mob}>
          Welcome to your Search page where you can search for the perfect
          candidates for your role, then create a unique SMS campaign to notify
          them about it.
        </div>
      </div>
      <div className={style.search}>
        <SearchCandidatesForm
          searchFields={searchState}
          setSearchFields={handleSearchData}
          setCurrentPage={setCurrentPage}
        />
        <SearchCandidatesTable
          columns={getColumns(
            !!searchState?.fields?.distance,
            searchState.sector.value
          )}
          tableData={tableData}
          searchPerformed={searchPerformed}
          pageSize={pageSize}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          handleChangePageSize={setPageSize}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
};
