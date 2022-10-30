import { ETypeNft, IAttribute, INftComment } from '.';

export interface INftTransaction {
  type?: ETypeNft;
  txHash: string;
  blockNumber: number;
  contract_address: string;
  tokenId: string;
  to: string;
  from: string;

  hasDetails?: boolean;
  id?: number;
  date?: string;
  chain?: string;
  name?: string;
  description?: string;
  contentUrl?: string;
  attributes?: IAttribute[];

  price?: number;
  symbol?: string;

  comments?: INftComment[];
}
