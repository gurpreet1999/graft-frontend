import { SearchCandidatesFlow } from "widgets/search-candidates-flow";
import style from "./search.module.css";

export const SearchCandidates = () => {
  return (
    <div className={style.container}>
      <SearchCandidatesFlow />
    </div>
  );
};
