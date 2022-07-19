import { IAttributes } from '.';

export interface INftForm {
  title: string;
  description: string;
  file: File | null;
  attributes: IAttributes;
}
