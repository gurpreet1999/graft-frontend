import { Button, Modal } from "shared/ui";
import style from "./style.module.css";
import { useGetSuggestions, usePageWidth } from "shared/hooks";
import { useEffect, useState } from "react";
import {
  CandidatesByRole,
  UserManagementApi,
} from "shared/api/user-management/lib";
import { ScrollArea } from "@radix-ui/themes";

interface IUsersByRoleModal {
  sector: string;
  isOpen: boolean;
  setIsOpen: () => void;
  totalCount: number;
}

export const UsersByRoleModal = ({
  sector,
  isOpen,
  setIsOpen,
  totalCount,
}: IUsersByRoleModal) => {
  const width = usePageWidth();
  const { experience, suggestions } = useGetSuggestions();
  const [sectorId, setSectorId] = useState<string>();
  const [candidatesData, setCandidatesData] = useState<CandidatesByRole[]>([]);

  useEffect(() => {
    if (!experience || !suggestions) return;
    const currentSector = Object.values(experience.sectors).find(
      (sectorObj) => sectorObj.value === sector
    );
    if (currentSector) {
      setSectorId(currentSector.id);
    }
  }, [experience, suggestions, sector]);

  useEffect(() => {
    const fetchCandidatesInfo = async () => {
      if (!sectorId) return;
      UserManagementApi.getCandidatesByRole(sectorId).then((data) => {
        setCandidatesData(data);
      });
    };
    fetchCandidatesInfo();
  }, [sectorId]);

  return (
    <Modal
      className={style.modal}
      open={isOpen}
      onClose={setIsOpen}
      title="Candidates"
      variant={width < 768 ? "side" : "center"}
    >
      <div className={style.container}>
        <div className={style.header}>
          <h2>{sector}</h2>
          <span>{totalCount}</span>
        </div>
        <ScrollArea className={style.content}>
          {candidatesData.length > 0 &&
            experience &&
            (() => {
              const {
                hospitalityRoles,
                constructionRoles,
                industrialAndDrivingRoles,
              } = experience;
              return candidatesData.map((item) => {
                const role =
                  hospitalityRoles[item.role_id] ??
                  constructionRoles[item.role_id] ??
                  industrialAndDrivingRoles[item.role_id];
                return (
                  <div key={item.role_id} className={style.item}>
                    <div className={style.role}>
                      <span>{role?.value}</span>
                    </div>
                    <div className={style.count}>
                      <span>{item.count}</span>
                    </div>
                  </div>
                );
              });
            })()}
        </ScrollArea>
        <div className={style.footer}>
          <Button variant="primary" onClick={setIsOpen}>
            Back
          </Button>
        </div>
      </div>
    </Modal>
  );
};
