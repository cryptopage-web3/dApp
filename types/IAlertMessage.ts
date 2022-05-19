export enum IAlertType {
  success = 'success',
  error = 'error',
}

export interface IAlertMessage {
  type: IAlertType;
  title?: string;
  text?: string;
}
