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
  contractAddress: string;
  tokenId: string;
  to: string;
  from: string;

  hasDetails?: boolean;
  date?: string;
  chain?: string;
  name?: string;
  description?: string;
  contentUrl?: string;
  attributes?: IAttribute[];

  isEncrypted?: boolean;
  accessType?: ENftTransactionAccessType;
  accessPrice?: number | null;
  accessDuration?: number | null;

  comments?: INftComment[];
}
