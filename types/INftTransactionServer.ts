import { ETypeNft } from './ETypeNft';

export interface INftTransactionServer {
  type: ETypeNft;
  txHash: string;
  blockNumber: number;
  contract_address: string;
  tokenId: string;
  to: string;
  from: string;
}
