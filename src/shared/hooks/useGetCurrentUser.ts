import { RootState } from "entities/store";
import { useSelector } from "react-redux";

export const useGetCurrentUser = () => {
  const { userData, status } = useSelector((state: RootState) => state.user);

  return { userData, status };
};
