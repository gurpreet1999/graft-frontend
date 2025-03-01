import { useEffect, useState } from "react";
import { Input } from "shared/ui";
import style from "./search.module.css";
import searchIconLight from "assets/images/search/search-light.svg";
import searchIconDark from "assets/images/search/search-dark.svg";
import { useTheme } from "shared/ui/Theme/useThemes";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const { theme } = useTheme();
  const searchIcon = theme === "light" ? searchIconLight : searchIconDark;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        !(e.target as HTMLElement).closest(`.${style.input__container}`) &&
        !(e.target as HTMLElement).closest(`.${style.search__icon}`)
      ) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <button
        className={style.search__icon}
        onClick={() => {
          setOpenSearch(!openSearch);
        }}
      >
        <img src={searchIcon} alt="search" />
      </button>
      <Input
        type="text"
        value={search}
        handleChange={setSearch}
        placeholder="Search"
        className={`${style.input__container} ${openSearch && style.open}`}
      />
    </>
  );
};
