import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  SnackBar,
  Status,
  StatusChip,
} from "shared/ui";
import headerIcon from "assets/images/profile/verification.svg";
import verifyIcon from "assets/images/verification/verify.svg";
import style from "./verification.module.css";
import { ButtonEdit } from "features/button-edit";
import { ProvideDocument } from "features/provide-document";
import { useGetCurrentUser } from "shared/hooks";
import { DocumentUpload } from "./lib";
import { VerificationApi } from "shared/api";
import classNames from "classnames";
import { verificationSteps } from "features/walkthrough/candidate/steps";
import { CandidateSteps } from "features/walkthrough/candidate";

export const Verification = () => {
  const { userData } = useGetCurrentUser();
  const [personalDocumentTypes, setPersonalDocumentTypes] = useState<
    IDocumentType[]
  >([]);
  const [experienceDocumentTypes, setExperienceDocumentTypes] = useState<
    IDocumentType[]
  >([]);

  const [personalDocumentType, setPersonalDocumentType] =
    useState<IDocumentType>();
  const [experienceDocumentType, setExperienceDocumentType] =
    useState<IDocumentType>();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [documentsProvided, setDocumentsProvided] = useState<boolean>(false);
  const [personalDocument, setPersonalDocument] = useState<File | string>(
    "Upload"
  );
  const [experienceDocument, setExperienceDocument] = useState<File | string>(
    "Upload"
  );

  const [kebabMenu, setKebabMenu] = useState<boolean>(false);

  const [stepsEnabled, setStepsEnabled] = useState<boolean>(false);

  const cancelSave = (): void => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await VerificationApi.getCandidatesDocumentsInfo();
      const isDocumentProvided =
        !!data.personal_document_name && !!data.experience_document_name;
      setDocumentsProvided(isDocumentProvided);
      setKebabMenu(isDocumentProvided);

      setPersonalDocument(data.personal_document_name);
      setExperienceDocument(data.experience_document_name);
      const personalDocType = personalDocumentTypes.find(
        (type) => type.id === data.personal_document_type_id
      );
      const experienceDocType = experienceDocumentTypes.find(
        (type) => type.id === data.experience_document_type_id
      );
      setPersonalDocumentType(personalDocType);
      setExperienceDocumentType(experienceDocType);
    };
    fetchData();
  }, [personalDocumentTypes, experienceDocumentTypes]);

  useEffect(() => {
    if (!userData) return;
    setVerified(userData.candidate_data.verified);
    VerificationApi.getDocumentsTypes().then((data) => {
      setPersonalDocumentTypes(data.personalDocumentTypes);
      setExperienceDocumentTypes(data.experienceDocumentTypes);
    });
  }, [userData]);

  const uploadDocument = async (
    document: File,
    documentType: IDocumentType
  ) => {
    const res = await DocumentUpload.uploadDocumentToCDN(
      document,
      documentType
    );
    return res;
  };

  const saveChanges = async (): Promise<void> => {
    if (
      !personalDocumentType ||
      !experienceDocumentType ||
      personalDocument === "Upload" ||
      experienceDocument === "Upload" ||
      !personalDocument ||
      !experienceDocument
    ) {
      SnackBar({ text: "Please provide both documents and their types." });
      return;
    }

    const uploadPersonalSuccess = await uploadDocument(
      personalDocument as File,
      personalDocumentType
    );

    const uploadExperienceSuccess = await uploadDocument(
      experienceDocument as File,
      experienceDocumentType
    );

    if (uploadPersonalSuccess === null || uploadExperienceSuccess === null) {
      return;
    }

    const data: IUserUploadDocument = {
      personal_document_name: uploadPersonalSuccess.documentName,
      personal_document_type_id: uploadPersonalSuccess.documentTypeId,
      personal_document_uploaded: true,
      experience_document_name: uploadExperienceSuccess.documentName,
      experience_document_type_id: uploadExperienceSuccess.documentTypeId,
      experience_document_uploaded: true,
    };

    try {
      await VerificationApi.updateCandidateDocuments(data);
      SnackBar({ text: "Documents updated successfully", variant: "success" });
    } catch (error) {
      SnackBar({ text: "Error updating documents" });
    }

    setDocumentsProvided(true);
    setIsEditing(false);
    setKebabMenu(true);
  };

  const handleChangeDocument = (
    value: IDocumentType,
    setDocumentType: React.Dispatch<
      React.SetStateAction<IDocumentType | undefined>
    >
  ): void => {
    setDocumentType(value);
  };

  const handleUploadDocument = (
    files: FileList | string,
    setDocument: React.Dispatch<React.SetStateAction<File | string>>
  ): void => {
    if (typeof files === "string") {
      setDocument(files);
    } else {
      setDocument(files[0]);
    }
  };

  const handleProvideDocument = () => {
    setDocumentsProvided(!documentsProvided);
    setIsEditing(!isEditing);
  };

  const handleDeleteDocument = async (value: "PERSONAL" | "EXPERIENCE") => {
    const data = {
      personal_document_name:
        typeof personalDocument === "string"
          ? personalDocument
          : personalDocument.name,
      personal_document_type_id: personalDocumentType?.id || "",
      personal_document_uploaded: true,
      experience_document_name:
        typeof experienceDocument === "string"
          ? experienceDocument
          : experienceDocument.name,
      experience_document_type_id: experienceDocumentType?.id || "",
      experience_document_uploaded: true,
    };
    try {
      if (value === "PERSONAL") {
        await VerificationApi.deleteDocument(data, "personal_document_name");
        setPersonalDocument("Upload");
        setPersonalDocumentType(undefined);
      } else {
        await VerificationApi.deleteDocument(data, "experience_document_name");
        setExperienceDocument("Upload");
        setExperienceDocumentType(undefined);
      }
      setIsEditing(true);
      setKebabMenu(false);
    } catch (error) {
      SnackBar({ text: "Error deleting document" });
    }
  };

  useEffect(() => {
    if (
      userData &&
      personalDocumentTypes.length &&
      experienceDocumentTypes.length
    ) {
      setStepsEnabled(true);
    }
  }, [userData, personalDocumentTypes, experienceDocumentTypes]);

  return (
    <Card className={classNames(style.container, "verifStep")}>
      <CandidateSteps
        enabled={stepsEnabled}
        steps={verificationSteps}
        identifier="profile"
      />
      <div className={style.header}>
        <CardHeader image={headerIcon} title="Verification" />
        <StatusChip
          className={style.status}
          status={
            userData?.candidate_data.verified
              ? Status.Active
              : Status.NotVerified
          }
          label={
            userData?.candidate_data.verified ? "Verified" : "Non-Verified"
          }
        />
        {(verified || documentsProvided || isEditing) && (
          <ButtonEdit
            isEditing={isEditing}
            cancelSave={cancelSave}
            saveChanges={saveChanges}
            className={style.edit}
          />
        )}
      </div>
      {isEditing ||
        (!documentsProvided && (
          <div className={style.description}>
            Upload x2 documents to become a verified candidate
          </div>
        ))}
      {!verified && !documentsProvided && !isEditing && (
        <Button
          variant="primaryBlue"
          className={style.button__verify}
          onClick={handleProvideDocument}
        >
          <img src={verifyIcon} alt="verifyIcon" />
          <span>Verify Now</span>
        </Button>
      )}
      {(isEditing || documentsProvided) && (
        <div className={style.documents}>
          <ProvideDocument
            title="Document"
            dropZoneLabel={getDropZoneLabel(personalDocument)}
            documentTypes={personalDocumentTypes}
            value={personalDocumentType}
            handleChange={(value) =>
              handleChangeDocument(value, setPersonalDocumentType)
            }
            handleUpload={(files) =>
              handleUploadDocument(files, setPersonalDocument)
            }
            documentsProvided={documentsProvided}
            isEditing={isEditing}
            kebabMenu={kebabMenu}
            onKebabMenuDelete={() => {
              handleDeleteDocument("PERSONAL");
            }}
            onKebabMenuReload={saveChanges}
          />
          <ProvideDocument
            title="Document"
            dropZoneLabel={getDropZoneLabel(experienceDocument)}
            documentTypes={experienceDocumentTypes}
            value={experienceDocumentType}
            handleChange={(value) =>
              handleChangeDocument(value, setExperienceDocumentType)
            }
            handleUpload={(files) =>
              handleUploadDocument(files, setExperienceDocument)
            }
            documentsProvided={documentsProvided}
            isEditing={isEditing}
            kebabMenu={kebabMenu}
            onKebabMenuDelete={() => {
              handleDeleteDocument("EXPERIENCE");
            }}
            onKebabMenuReload={saveChanges}
          />
        </div>
      )}
    </Card>
  );
};

const getDropZoneLabel = (document: File | string): string => {
  if (typeof document === "string") {
    return document;
  }
  if (document?.name) {
    return document.name;
  }
  return "Upload";
};
