import { IAttributesServer } from '.';

export interface INFTCreateParams {
  name: string;
  description: string;
  external_url: string;
  /** get link after save file */
  animation_url?: string | null;
  image?: string | null;
  attributes: IAttributesServer[];
}
