import { AppDispatch, RootState } from "entities/store";
import { AuthActions } from "entities/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(AuthActions.fetchUser());
  }, [dispatch]);

  const refreshUserData = () => {
    dispatch(AuthActions.fetchUser());
  };

  return { ...user, refreshUserData };
};
