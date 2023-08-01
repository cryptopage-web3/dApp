import { IAttribute, INftAttachment, INftComment } from '.';

export interface INftServer {
  collectionName: string;
  commentCount: string;
  comments: INftComment[];
  contentUrl: string;
  contractAddress: string;
  creator: string;
  date: string;
  downCount: string;
  ipfsHash: string;
  isEncrypted: boolean;
  minimalPeriod?: string;
  payAmount: string;
  paymentType: string;
  symbol: string;
  tokenId: string;
  upCount: string;

  description?: string;
  name?: string;

  attributes?: IAttribute[];
  attachments?: INftAttachment[];
}
