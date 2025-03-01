/* eslint-disable @typescript-eslint/no-unused-vars */
interface IVerification {
  personalDocument: File | string;
  personalDocumentType: IDocumentType;
  experienceDocument: File | string;
  experienceDocumentType: IDocumentType;
}

interface IDocument {
  url: string;
  file: File;
}

interface IUserDocuments {
  id?: string;
  personal_document_name: string;
  experience_document_name: string;
  personal_document_type_id: string;
  experience_document_type_id: string;
  personal_document_status: string;
  experience_document_status: string;
}

interface IUserUploadDocument {
  personal_document_name: string;
  personal_document_type_id: string;
  personal_document_uploaded: boolean;
  experience_document_name: string;
  experience_document_type_id: string;
  experience_document_uploaded: boolean;
}
