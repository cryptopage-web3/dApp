import { IAttributes } from '.';

export enum ENftFormUnlockableContentAccessDurationType {
  days = 'days',
  weeks = 'weeks',
  months = 'months',
}

export enum ENftFormUnlockableContentAccessType {
  oneTime = 'ONE_TIME',
  customDuration = 'CUSTOM_DURATION',
}

export interface INftForm {
  title: string;
  description: string;
  file: File | null;
  externalLink: string;
  isCommentsEnable: boolean;
  isUnlockableContent: boolean;
  unlockableContentAccessType: ENftFormUnlockableContentAccessType | null;
  unlockableContentPrice: number | null;
  unlockableContentAccessDuration: number | null;
  unlockableContentAccessDurationType: ENftFormUnlockableContentAccessDurationType | null;
  isExplicit: boolean;
  attributes: IAttributes;
  supply: string;
  chain: string;
}
