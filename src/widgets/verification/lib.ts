import { VerificationApi } from "shared/api";
import { SnackBar } from "shared/ui";

export class DocumentUpload {
  static uploadDocumentToCDN = async (
    documentFile: File | string,
    documentType: IDocumentType
  ): Promise<{
    documentName: string;
    documentTypeId: string;
  } | null> => {
    const returnObject = {
      documentName:
        typeof documentFile === "string" ? documentFile : documentFile.name,
      documentTypeId: documentType.id,
      documentUploaded: true,
    };

    if (typeof documentFile === "string") {
      return returnObject;
    }

    const personalUrl = await DocumentUpload.getSignedUrl(documentFile.name);
    if (!personalUrl) {
      SnackBar({ text: "Error uploading personal document" });
      return null;
    }

    const uploadSuccess = await DocumentUpload.uploadToSignedUrl({
      url: personalUrl.signedURL,
      file: documentFile,
    });

    if (!uploadSuccess) {
      SnackBar({ text: "Error uploading personal document" });
      return null;
    }

    return returnObject;
  };

  private static uploadToSignedUrl = async (document: {
    url: string;
    file: File;
  }): Promise<boolean> => {
    try {
      await VerificationApi.uploadDocument(document.url, document.file);
      return true;
    } catch (error) {
      return false;
    }
  };

  private static getSignedUrl = async (fileName: string): Promise<any> => {
    return await VerificationApi.getSignedUrlForUploading(fileName);
  };
}
