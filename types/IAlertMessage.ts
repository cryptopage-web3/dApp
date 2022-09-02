export enum IAlertType {
  success = 'success',
  error = 'error',
  info = 'info',
}

export interface IAlertMessage {
  type: IAlertType;
  title?: string;
  text?: string;
}
