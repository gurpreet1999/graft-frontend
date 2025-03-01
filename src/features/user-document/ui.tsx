import { Button, Modal } from "shared/ui";
import style from "./style.module.css";
import pdfIcon from "assets/images/invoices/pdf.svg";
import { VerificationApi } from "shared/api";
import { useState } from "react";
import classNames from "classnames";

interface IUserDocument {
  submitStatus: "PENDING" | "APPROVED" | "REJECTED";
  documentName: string;
  documentType: string;
  documentTypes: IDocumentType[];
  userId: string;
  documentNumber: number;
  submitDocument: () => void;
}

export const UserDocument = ({
  submitStatus,
  documentName,
  documentType,
  documentTypes,
  userId,
  documentNumber,
  submitDocument,
}: IUserDocument) => {
  const type = documentTypes.find((type) => type.id === documentType);
  const [isOpen, setIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const openDocument = async () => {
    const { signedURL } =
      await VerificationApi.getUrlForDownloadCandidateDocuments(
        userId,
        documentName
      );

    const fileExtension = documentName?.split(".").pop()?.toLowerCase() || "";

    if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    ) {
      setImgUrl(signedURL);
      setIsOpen(true);
    } else {
      const link = document.createElement("a");
      link.href = signedURL;
      link.download = documentName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.name}>
        <span>Document №{documentNumber}</span>
        <span>{type?.name}</span>
      </div>
      <button className={classNames(style.document)} onClick={openDocument}>
        <div className={style.document__icon}>
          <img src={pdfIcon} alt="pdf" />
        </div>
        <div className={style.document__name}>
          <span>{documentName}</span>
        </div>
        {submitStatus === "PENDING" && (
          <Button
            variant="primaryBlue"
            className={style.button}
            onClick={(e) => {
              e.stopPropagation();
              submitDocument();
            }}
          >
            Submit
          </Button>
        )}
      </button>
      <Modal open={isOpen} onClose={closeModal} title={documentName}>
        <div className={style.document__img}>
          {imgUrl && <img src={imgUrl} alt="document" />}
        </div>
      </Modal>
    </div>
  );
};
