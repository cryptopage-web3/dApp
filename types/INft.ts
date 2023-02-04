import {
  ENftTransactionAccessType,
  ETypeNft,
  IAttribute,
  INftComment,
} from '.';

export interface INft {
  collectionName: string;
  contract_address: string;
  date: string;
  description?: string;
  contentUrl: string;
  hasDetails?: boolean;
  name: string;
  to: string;
  from: string;
  tokenId: string;
  usdPrice: number;
  likes: number;
  dislikes: number;
  type: ETypeNft;
  attributes: IAttribute[];
  comments?: INftComment[];

  isEncrypted?: boolean;
  accessType?: ENftTransactionAccessType;
  accessPrice?: number;
  accessDuration?: number;
}
