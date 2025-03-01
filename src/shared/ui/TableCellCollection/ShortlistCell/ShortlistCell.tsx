import ShortlistStar from "assets/images/jobs/ShortlistStar.svg";
import ShortlistStarActive from "assets/images/jobs/ShortlistStarActive.svg";
import { useState } from "react";

interface IShortlistCell {
  active?: boolean;
  handleShortlist?: () => void;
}

export const ShortlistCell = ({ active, handleShortlist }: IShortlistCell) => {
  const [isActive, setIsActive] = useState(active || false);
  return (
    <button
      onMouseEnter={() => {
        setIsActive(!isActive);
      }}
      onMouseLeave={() => {
        setIsActive(!isActive);
      }}
      onClick={handleShortlist}
    >
      <img
        src={isActive ? ShortlistStarActive : ShortlistStar}
        alt="ShortlistStar"
      />
    </button>
  );
};
