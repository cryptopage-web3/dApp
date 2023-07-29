import { IAttribute, INftAttachment, INftComment } from '.';

export interface INftTransactionDetailsResponse {
  tokenId?: string;
  chain?: string;
  contractAddress?: string;
  name?: string;
  description?: string;
  contentUrl?: string;
  attributes?: IAttribute[];
  attachments?: INftAttachment[];
  isEncrypted?: boolean;
  payAmount?: string | null;
  paymentType?: number | null;
  accessDuration?: number | null;
  date?: string;
  comments?: INftComment[];
}
