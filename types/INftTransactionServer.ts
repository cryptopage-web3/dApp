import { ETypeNft } from './ETypeNft';

export interface INftTransactionServer {
  type: ETypeNft;
  txHash: string;
  blockNumber: number;
  contractAddress: string;
  tokenId: string;
  to: string;
  from: string;
}
