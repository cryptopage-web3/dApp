export interface IVerifiedStatus {
  isVerified: boolean;
  isChecked: boolean;
}

export interface ISaveVerifiedStatusParams {
  address: string;
  status: IVerifiedStatus;
}
