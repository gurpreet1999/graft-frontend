import { DropZone, InputSelect } from "shared/ui";
import style from "./provide-document.module.css";

interface ProvideDocumentProps {
  title: string;
  documentTypes: IDocumentType[];
  dropZoneLabel: string;
  value: IDocumentType | undefined;
  handleChange: (value: IDocumentType) => void;
  handleUpload: (value: any) => void;
  documentsProvided: boolean;
  isEditing: boolean;
  kebabMenu?: boolean;
  onKebabMenuDelete?: () => void;
  onKebabMenuReload?: () => Promise<void>;
  isError?: boolean;
}

export const ProvideDocument = ({
  title,
  documentTypes,
  dropZoneLabel,
  value,
  handleChange,
  handleUpload,
  documentsProvided,
  isEditing,
  kebabMenu,
  onKebabMenuDelete,
  onKebabMenuReload,
  isError,
}: ProvideDocumentProps) => {
  return (
    <div className={style.container}>
      <div className={style.type__container}>
        <div className={style.type__header}>{title}</div>
        <div className={style.type__input}>
          {documentsProvided && !isEditing ? (
            <div className={style.type__input__placeholder}>{value?.name}</div>
          ) : (
            <InputSelect
              options={documentTypes}
              value={value}
              placeholder="Select document type"
              handleChange={handleChange}
            />
          )}
        </div>
      </div>
      <div className={style.dropzone__container}>
        <DropZone
          handleUpload={handleUpload}
          label={dropZoneLabel}
          kebabMenu={kebabMenu}
          onKebabMenuDelete={onKebabMenuDelete}
          onKebabMenuReload={onKebabMenuReload}
          isError={isError}
        />
      </div>
    </div>
  );
};
