export enum EAlertType {
  success = 'success',
  error = 'error',
  info = 'info',
}

export interface IAlertMessage {
  type: EAlertType;
  title?: string;
  text?: string;
}
