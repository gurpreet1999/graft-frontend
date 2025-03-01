import { Card } from "shared/ui";
import style from "./style.module.css";
import { UserManagementLists } from "widgets/user-management-lists";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "pages/NotFoundPage";
import { CandidateDetails } from "./candidate-details";
import { ClientDetails } from "./clients-details";

export const UserManagement = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={style.container}>
            <Card className={style.card__container}>
              <UserManagementLists />
            </Card>
          </div>
        }
      />
      <Route path="/candidate-details/:id" element={<CandidateDetails />} />
      <Route path="/client-details/:id" element={<ClientDetails />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
