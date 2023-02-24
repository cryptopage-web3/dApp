export enum EMessengerStatus {
  error = 'error',
  success = 'success',
}

export interface IMessengerOnboardingBroadcast {
  data: {
    status: EMessengerStatus;
    message: string;
  };
}
