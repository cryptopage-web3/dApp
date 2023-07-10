import { EAttributeDisplayType } from './EAttributeDisplayType';

export interface IPublishNFTParams {
  metadata: {
    name: string;
    description?: string | undefined;
    external_url?: string | undefined;
    attributes?: {
      trait_type: string;
      value: string | number;
      max_value?: number;
      display_type?: EAttributeDisplayType;
    }[];
  };
  encrypt: boolean;
  attachments?: (
    | {
        type: 'Text';
        textContent: string;
      }
    | {
        type: 'Image';
        fileId: string;
      }
  )[];
}
