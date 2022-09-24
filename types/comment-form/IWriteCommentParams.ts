import { ISendCommentParams } from '.';

export interface IWriteCommentParams {
  params: ISendCommentParams;
  callbacks: {
    onTransactionHash: (hash: string) => void;
    onReceipt: () => void;
    onError: () => void;
  };
}
