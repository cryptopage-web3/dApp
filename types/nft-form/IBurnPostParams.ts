import { IDeleteNFTParams } from '.';

export interface IBurnPostParams {
  params: IDeleteNFTParams;
  callbacks: {
    onTransactionHash: (hash: string) => void;
    onReceipt: () => void;
    onError: () => void;
  };
}
