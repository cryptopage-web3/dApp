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
  description?: string;
  contentUrl: string;
  name: string;
  likes: number;
  dislikes: number;
  symbol: string;
  tokenId: string;
  attributes: IAttribute[];
  comments: INftComment[];

  hasDetails?: boolean;
  type?: ETypeNft;

  isEncrypted?: boolean;
  accessType?: ENftTransactionAccessType;
  accessPrice?: number;
  accessDuration?: number;
}
