import { useDropzone } from "react-dropzone";
import style from "./DropZone.module.css";
import pdfIcon from "assets/images/dropzone/pdf.svg";
import dotsIcon from "assets/images/dropzone/DotsThreeVertical.svg";
import reloadIcon from "assets/images/dropzone/reset.svg";
import deleteIcon from "assets/images/dropzone/delete.svg";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useClickOutside } from "shared/hooks";

interface DropZoneProps {
  handleUpload: (value: any) => void;
  label: string;
  kebabMenu?: boolean;
  onKebabMenuDelete?: () => void;
  onKebabMenuReload?: () => Promise<void>;
  isError?: boolean;
}

export const DropZone = ({
  handleUpload,
  label,
  kebabMenu,
  onKebabMenuDelete,
  onKebabMenuReload,
  isError,
}: DropZoneProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "application/pdf": [".pdf"],
    },
  });
  const [kebabOpen, setKebabOpen] = useState<boolean>(false);

  const kebabRef = useRef<HTMLDivElement>(null);

  useClickOutside(kebabRef, () => {
    setKebabOpen(false);
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      handleUpload(acceptedFiles);
    }
  }, [acceptedFiles]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {
    setKebabOpen(false);
    onKebabMenuDelete && onKebabMenuDelete();
  };

  const handleReload = () => {
    setKebabOpen(false);
    onKebabMenuReload && onKebabMenuReload();
  };

  return (
    <div className={style.container}>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={style.dropzone}
      >
        <input {...getInputProps()} />
        <div className={style.image__container}>
          <img src={pdfIcon} alt="" />
        </div>
        <span>{label}</span>
      </div>

      {kebabMenu && (
        <div className={style.kebab} ref={kebabRef}>
          <button
            className={style.kebab__button}
            onClick={() => setKebabOpen(!kebabOpen)}
          >
            <img src={dotsIcon} alt="dots"></img>
          </button>
          <div
            className={classNames(style.kebab__menu, kebabOpen && style.open)}
          >
            {isError && (
              <button className={style.button} onClick={handleReload}>
                <img src={reloadIcon} alt="reload"></img>
                <span>Reload</span>
              </button>
            )}
            <button className={style.button} onClick={handleDelete}>
              <img src={deleteIcon} alt="delete"></img>
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
