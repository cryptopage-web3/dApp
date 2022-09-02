import { EAttributeDisplayType } from '.';

export interface IAttributesServer {
  trait_type: string;
  value: string | number;
  max_value?: number;
  display_type?: EAttributeDisplayType;
}
