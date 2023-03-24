export interface ILandingMessageBroadcast {
  data: {
    target?: string;
    params: {
      currency: string | null;
      duration: number | string | null;
      files: File[] | null;
      network: string | null;
      price: string | null;
      title: string | null;
    };
  };
}
