export enum EVerifiedStatus {
  unverified = 'unverified',
  rejected = 'rejected',
  verified = 'verified',
  pending = 'pending',
}

export interface IVerifiedStatus {
  isChecked: boolean;
  status: EVerifiedStatus;
}

export interface ISaveVerifiedStatusParams {
  address: string;
  status: IVerifiedStatus;
}
