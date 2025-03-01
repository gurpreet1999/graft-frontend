import style from "./style.module.css";
import { CandidateInfo } from "widgets/user-info";
import { useCallback, useEffect, useState } from "react";
import { UserManagementApi } from "shared/api";
import { useParams } from "react-router-dom";
import { Verification } from "widgets/user-verification";
import { UserExperience } from "widgets/user-experience";
import { usePageWidth } from "shared/hooks";

export const CandidateDetails = () => {
  const width = usePageWidth();

  const [user, setUser] = useState<IUser | null>(null);
  const [updateUser, setUpdateUser] = useState<boolean>();
  const { id } = useParams<{ id: string }>();

  const updateUserData = useCallback(() => {
    setUpdateUser((prevUpdateUser) => !prevUpdateUser);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (!id) return;
      await UserManagementApi.getCandidate(id).then((response) => {
        setUser(response);
      });
    };

    getUser();
  }, [id, updateUser]);

  if (!user) return null;

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <CandidateInfo user={user} updateInfo={updateUserData} />
        {width > 1024 && (
          <Verification user={user} updateInfo={updateUserData} />
        )}
      </div>
      <div className={style.wrapper}>
        <UserExperience user={user} />
        {width <= 1024 && (
          <Verification user={user} updateInfo={updateUserData} />
        )}
      </div>
    </div>
  );
};
