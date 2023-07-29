export interface INftAttachment {
  id: string;
  type: string;
  data:
    | string
    | {
        contentType: string;
        bluredImageUrl: string;
        encryptedImageUrl: string;
      };
}
