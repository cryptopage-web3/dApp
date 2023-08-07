import { EAttachmentType } from './EAttachmentType';

export interface INftAttachment {
  id: string;
  type: EAttachmentType;
  data:
    | string
    | {
        contentType: string;
        bluredImageUrl: string;
        encryptedImageUrl: string;
      };
}
