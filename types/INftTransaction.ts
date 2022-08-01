import { ETypeNft, IAttribute } from '.';

export interface INftTransaction {
  url?: string;
  price: number;
  name: string;
  description?: string;
  symbol: string;
  date: string;
  to: string;
  from: string;
  txHash: string;
  tokenId: string;
  contract_address: string;
  type?: ETypeNft;
  attributes?: IAttribute[];
}
