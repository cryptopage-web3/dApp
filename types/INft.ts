import {
  ENftTransactionAccessType,
  ETypeNft,
  IAttribute,
  INftAttachment,
  INftComment,
} from '.';

export interface INft {
  collectionName: string;
  contractAddress: string;
  date: string;
  description: string;
  contentUrl: string;
  name: string;
  encryptedText?: string;
  symbol: string;
  tokenId: string;
  attributes: IAttribute[];
  attachments: INftAttachment[];
  comments: INftComment[];

  hasDetails?: boolean;
  type?: ETypeNft;

  isEncrypted?: boolean;
  accessType?: ENftTransactionAccessType;
  accessPrice?: number;
  /** период в днях */
  accessDuration?: number;
}
