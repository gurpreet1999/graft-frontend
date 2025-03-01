import { Api } from "../Api";

export class VerificationApi extends Api {
  static async getCandidatesDocumentsInfo(): Promise<IUserDocuments> {
    return this.get("/candidate/documents");
  }

  static async getDocumentsTypes() {
    return this.get("/candidate/document-types");
  }

  static async updateCandidateDocuments(data: IUserUploadDocument) {
    return this.put("/candidate/documents", data);
  }

  static async getSignedUrlForDownloading(filename: string) {
    return this.post("/candidate/documents/download", { filename });
  }

  static async getSignedUrlForUploading(filename: string) {
    return this.post("/candidate/documents/upload", { filename });
  }

  static async uploadDocument(url: string, file: File) {
    return this.uploadFileToSignedUrl(url, file);
  }

  static async deleteDocument(
    data: IUserUploadDocument,
    documentTypeForDeleting: keyof IUserUploadDocument
  ) {
    delete data[documentTypeForDeleting];
    return this.put("/candidate/documents", data);
  }

  // For admin
  static async verifyCandidateDocuments(
    user_id: string,
    personal_document_status: string,
    experience_document_status: string
  ) {
    return this.put("/candidate/verification", {
      user_id,
      personal_document_status,
      experience_document_status,
    });
  }

  static async getUrlForDownloadCandidateDocuments(
    id: string,
    filename: string
  ) {
    return this.post(`/candidate/${id}/documents/download`, { filename });
  }
}
