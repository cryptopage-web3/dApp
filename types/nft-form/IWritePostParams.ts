import { ISendNFTParams } from '.';

export interface IWritePostParams {
  params: ISendNFTParams;
  callbacks: {
    onTransactionHash: (hash: string) => void;
    onReceipt: () => void;
    onError: (e: any) => void;
  };
}
