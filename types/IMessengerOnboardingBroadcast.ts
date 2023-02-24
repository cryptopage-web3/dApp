export enum EMessengerOnboardingStatus {
  error = 'error',
  success = 'success',
}

export interface IMessengerOnboardingBroadcast {
  data: {
    status: EMessengerOnboardingStatus;
    message: string;
  };
}
