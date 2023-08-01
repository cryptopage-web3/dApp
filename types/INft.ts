import {
  ENftTransactionAccessType,
  ETypeNft,
  IAttribute,
  INftComment,
} from '.';

export interface INft {
  collectionName: string;
  contractAddress: string;
  date: string;
  description: string;
  contentUrl: string;
  name: string;
  symbol: string;
  tokenId: string;
  attributes: IAttribute[];
  comments: INftComment[];

  hasDetails?: boolean;
  type?: ETypeNft;

  isEncrypted?: boolean;
  accessType?: ENftTransactionAccessType;
  accessPrice?: number;
  /** период в днях */
  accessDuration?: number;
}
