import {
  Card,
  CardHeader,
  getStatus,
  getStatusLabel,
  Status,
  StatusChip,
} from "shared/ui";
import style from "./style.module.css";
import headerIcon from "assets/images/jobs/Notebook.svg";
import { UserDocument } from "features/user-document";
import { useCallback, useEffect, useState } from "react";
import { VerificationApi } from "shared/api";

export const Verification = ({
  user,
  updateInfo,
}: {
  user: IUser;
  updateInfo: () => void;
}) => {
  const { candidate_verification: candidateVerification } = user;

  const [personalDocumentTypes, setPersonalDocumentTypes] = useState<
    IDocumentType[]
  >([]);
  const [experienceDocumentTypes, setExperienceDocumentTypes] = useState<
    IDocumentType[]
  >([]);

  const submitPersonalDocument = useCallback(async () => {
    if (!candidateVerification) return;
    await VerificationApi.verifyCandidateDocuments(
      user.id,
      "APPROVED",
      candidateVerification.experience_document_status
    );
    updateInfo();
  }, [user.id, candidateVerification, updateInfo]);

  const submitExperienceDocument = useCallback(async () => {
    if (!candidateVerification) return;
    await VerificationApi.verifyCandidateDocuments(
      user.id,
      candidateVerification.personal_document_status,
      "APPROVED"
    );
    updateInfo();
  }, [user.id, candidateVerification, updateInfo]);

  useEffect(() => {
    const getDocumentTypes = async () => {
      await VerificationApi.getDocumentsTypes().then((response) => {
        setPersonalDocumentTypes(response.personalDocumentTypes);
        setExperienceDocumentTypes(response.experienceDocumentTypes);
      });
    };

    getDocumentTypes();
  }, []);

  const status = getStatus(user.candidate_data.verified, candidateVerification);

  return (
    <Card className={style.container}>
      <div className={style.header}>
        <CardHeader image={headerIcon} title="Verification" />
        <StatusChip
          className={style.status}
          status={user.candidate_data.verified ? Status.Active : Status.Pending}
          label={getStatusLabel(status)}
        />
      </div>
      {!candidateVerification ? (
        <span className={style.text}>No documents for review</span>
      ) : (
        <div className={style.documents}>
          <UserDocument
            documentName={candidateVerification.personal_document_name}
            submitStatus={candidateVerification.personal_document_status}
            documentType={candidateVerification.personal_document_type_id}
            documentTypes={personalDocumentTypes}
            userId={candidateVerification.user_id}
            documentNumber={1}
            submitDocument={submitPersonalDocument}
          />
          <UserDocument
            documentName={candidateVerification.experience_document_name}
            submitStatus={candidateVerification.experience_document_status}
            documentType={candidateVerification.experience_document_type_id}
            documentTypes={experienceDocumentTypes}
            userId={candidateVerification.user_id}
            documentNumber={2}
            submitDocument={submitExperienceDocument}
          />
        </div>
      )}
    </Card>
  );
};
