import { IAttributes } from '.';

export interface INftForm {
  title: string;
  description: string;
  file: File | null;
  externalLink: string;
  isCommentsEnable: boolean;
  isUnlockableContent: boolean;
  unlockableText: string;
  attributes: IAttributes;
}
