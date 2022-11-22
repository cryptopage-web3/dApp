import { ETypeNft, IAttribute, INftComment } from '.';

export enum ENftTransactionAccessType {
  not_requested = 'not_requested',
  has_access = 'has_access',
  has_not_access = 'has_not_access',
}

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

  isEncrypted: boolean;
  accessType: ENftTransactionAccessType;
  accessPrice: number;
  accessDuration: number;

  price?: number;
  symbol?: string;

  comments?: INftComment[];
}
