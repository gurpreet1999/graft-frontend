import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { UserManagementApi } from "shared/api";
import style from "./style.module.css";
import { ClientInfo } from "widgets/user-info";
import { UserPricingPlan } from "features/user-plan";
import { UserBalance } from "features/user-balance";

export const ClientDetails = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [updateUser, setUpdateUser] = useState<boolean>();
  const { id } = useParams<{ id: string }>();

  const updateUserData = useCallback(() => {
    setUpdateUser((prevUpdateUser) => !prevUpdateUser);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (!id) return;
      await UserManagementApi.getClient(id).then((response) => {
        setUser(response);
      });
    };

    getUser();
  }, [id, updateUser]);

  if (!user) return null;

  return (
    <div className={style.container}>
      <ClientInfo user={user} updateInfo={updateUserData} />
      <div className={style.wrapper}>
        <UserPricingPlan user={user} />
        <UserBalance user={user} />
      </div>
    </div>
  );
};
