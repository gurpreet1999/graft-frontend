import {
  CardHeader,
  Input,
  PageDropdown,
  TabButton,
  useTheme,
  ViewSwitch,
  ViewType,
} from "shared/ui";
import style from "./style.module.css";
import userIcon from "assets/images/jobs/user-list.svg";
import searchIcon from "assets/images/glass.svg";
import { useCallback, useEffect, useState } from "react";
import { useGetSuggestions, useInputState, usePageWidth } from "shared/hooks";
import {
  allPricingPlan,
  getPricingPlans,
  getSelect,
  STATUSES,
} from "./helpers";
import { UserManagementApi } from "shared/api";
import { Table } from "features/table";
import { getColumns, UsersTab } from "./users.column";
import { INormalizedUser, normalizeUsers } from "../lib";
import { List } from "../list/ui";
import { useNavigate } from "react-router-dom";
import { SuspendUserModal } from "features/suspend-user-modal";
import classNames from "classnames";
import { CreateAdminModal } from "features/create-admin-modal";
import { AdminDetailsModal } from "features/details-admin-modal";

export const UserManagementLists = () => {
  const { suggestions, experience } = useGetSuggestions();
  const { theme } = useTheme();
  const width = usePageWidth();

  const location = window.location;
  const searchParams = new URLSearchParams(location.search);
  const candidates = searchParams.get("candidates");
  const sectorParam: number = Number(searchParams.get("sector"));

  const nav = useNavigate();

  const [users, setUsers] = useState<INormalizedUser[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [suspendUserId, setSuspendUserId] = useState<string>();
  const [suspendUserName, setSuspendUserName] = useState<string>();
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);

  const [pricingPlans, setPricingPlans] = useState<ISuggestion[]>([]);
  const [pricingPlan, setPricingPlan] = useState(allPricingPlan);
  const [credits, setCredits] = useState([0, 3000]);
  const [status, setStatus] = useState(STATUSES[0]);
  const [isOpenNewAdmin, setIsOpenNewAdmin] = useState(false);
  const { value: search, setValue: setSearch } = useInputState<string>("");

  const [isOpenAdminDetails, setIsOpenAdminDetails] = useState(false);
  const [adminDetailsId, setAdminDetailsId] = useState<string>();

  const [updateData, setUpdateData] = useState(false);

  const [tab, setTab] = useState<UsersTab>(
    candidates ? "CANDIDATES" : "CLIENTS"
  );

  const [activeView, setActiveView] = useState<ViewType>(
    width < 768 ? "list" : "table"
  );
  const [sector, setSector] = useState(
    sectorParam ? suggestions?.sectors[sectorParam] : suggestions?.sectors[0]
  );

  const rangeDisplayed = page * pageSize;
  const firstRangeDisplayed = rangeDisplayed - pageSize + 1;
  const lastRangeDisplayed = rangeDisplayed > total ? total : rangeDisplayed;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPricingPlans();
      setPricingPlans(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!suggestions) return;
    if (sectorParam) {
      return setSector(suggestions.sectors[sectorParam]);
    }
    setSector(suggestions.sectors[0]);
  }, [suggestions, sectorParam]);

  const handleDetails = useCallback(
    (id: string) => {
      if (tab === "CANDIDATES") {
        nav(`candidate-details/${id}`);
      }
      if (tab === "CLIENTS") {
        nav(`client-details/${id}`);
      }
      if (tab === "ADMINS") {
        setIsOpenAdminDetails(true);
        setAdminDetailsId(id);
      }
    },
    [tab, nav]
  );

  const update = () => {
    setUpdateData(!updateData);
  };

  const handleSuspend = useCallback(async (id: string, name: string) => {
    setSuspendUserId(id);
    setSuspendUserName(name);
    setSuspendModalOpen(true);
    update();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUnsuspend = useCallback(async (id: string) => {
    await UserManagementApi.activateUser(id);
    update();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchUsers = async () => {
      let users: IUser[] = [];
      const searchParam = search === "" ? undefined : search;
      if (tab === "CANDIDATES") {
        if (!sector) return;
        const statusId = status.id === "all" ? undefined : status.id;
        const res = await UserManagementApi.getCandidates(
          sector.id,
          page,
          pageSize,
          searchParam,
          statusId
        );
        if (res) {
          users = res.users;
          setTotal(res.total_count);
        }
      }
      if (tab === "CLIENTS") {
        const creditsFrom = credits[0] === 0 ? undefined : credits[0];
        const creditsTo = credits[1] === 3000 ? undefined : credits[1];
        const pricingPlanId =
          pricingPlan.id === "all" ? undefined : pricingPlan.id;
        const res = await UserManagementApi.getRecruiters(
          page,
          pageSize,
          pricingPlanId,
          searchParam,
          creditsFrom,
          creditsTo
        );
        if (res) {
          users = res.users;
          setTotal(res.total_count);
        }
      }
      if (tab === "ADMINS") {
        const res = await UserManagementApi.getAdmins(
          page,
          pageSize,
          searchParam
        );
        if (res) {
          users = res.users;
          setTotal(res.total_count);
        }
      }
      if (!experience) return;
      const normalizedUsers = normalizeUsers(
        users,
        tab,
        experience,
        handleDetails,
        handleSuspend,
        handleUnsuspend,
        theme
      );
      setUsers(normalizedUsers);
    };

    fetchUsers();
  }, [
    tab,
    experience,
    page,
    pageSize,
    search,
    status,
    sector,
    pricingPlan,
    credits,
    theme,
    handleDetails,
    handleSuspend,
    handleUnsuspend,
    updateData,
  ]);

  useEffect(() => {
    setPage(1);
  }, [tab, search, status, sector, pricingPlan, credits]);

  return (
    <>
      <SuspendUserModal
        suspendUserName={suspendUserName}
        suspendUserId={suspendUserId}
        suspendModalOpen={suspendModalOpen}
        onClose={() => {
          setSuspendModalOpen(false);
        }}
        updateData={update}
      />
      <CreateAdminModal
        open={isOpenNewAdmin}
        onClose={() => setIsOpenNewAdmin(false)}
      />
      <AdminDetailsModal
        open={isOpenAdminDetails}
        onClose={() => setIsOpenAdminDetails(false)}
        id={adminDetailsId}
        updateTableData={update}
      />
      <div
        className={classNames(
          style.container,
          tab === "ADMINS" && style.admin,
          tab === "CANDIDATES" && style.candidates,
          tab === "CLIENTS" && style.clients
        )}
      >
        <div className={style.header}>
          <CardHeader image={userIcon} title="User management" />
          <PageDropdown
            className={style.button__page}
            pageSize={pageSize}
            handlePageSizeChange={setPageSize}
            direction="bottom"
          />
          <div className={style.header__inputs}>
            <Input
              icon={searchIcon}
              placeholder="Search"
              value={search}
              handleChange={setSearch}
              type="text"
              className={style.header__input}
              withoutImgLine={true}
            />
            <ViewSwitch activeView={activeView} setActiveView={setActiveView} />
          </div>
        </div>
        <div className={style.filters}>
          <div className={style.result__mobile}>
            Showing <span>{firstRangeDisplayed}</span> to{" "}
            <span>{lastRangeDisplayed}</span> of <span>{total}</span> results
          </div>
          <div className={style.tabs}>
            <TabButton
              className={style.button}
              tabName="CLIENTS"
              currentTab={tab}
              changeTab={setTab}
            >
              Clients
            </TabButton>
            <TabButton
              className={style.button}
              tabName="CANDIDATES"
              currentTab={tab}
              changeTab={setTab}
            >
              Candidates
            </TabButton>
            <TabButton
              className={style.button}
              tabName="ADMINS"
              currentTab={tab}
              changeTab={setTab}
            >
              Admins
            </TabButton>
          </div>
          <div className={style.select__container}>
            {sector &&
              suggestions &&
              getSelect(
                tab,
                {
                  pricing: {
                    pricingPlans,
                    value: pricingPlan,
                    setValue: setPricingPlan,
                  },
                  credits: { value: credits, setValue: setCredits },
                },
                { value: status, setValue: setStatus, sector, setSector },
                { isOpen: isOpenNewAdmin, setIsOpen: setIsOpenNewAdmin },
                suggestions
              )}
            <Input
              icon={searchIcon}
              placeholder="Search"
              value={search}
              handleChange={setSearch}
              type="text"
              className={style.search__mobile}
              containerClassName={style.search__container}
              withoutImgLine={true}
            />
          </div>
        </div>
        {sector && (
          <div className={style.table__container}>
            <Table
              columns={getColumns(sector.value, tab)}
              data={users}
              totalItems={total}
              currentPage={page}
              pageSize={pageSize}
              className={classNames(
                style.table,
                tab === "ADMINS" && style.admins
              )}
              handlePageChange={setPage}
              handleChangePageSize={setPageSize}
              resultClassName={style.result}
              ListView={activeView === "list" ? List : undefined}
              additionalProps={{
                sector: sector.value,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
