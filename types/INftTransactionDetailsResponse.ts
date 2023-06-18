import { IAttribute, INftComment } from '.';

export interface INftTransactionDetailsResponse {
  tokenId?: string;
  chain?: string;
  contractAddress?: string;
  name?: string;
  description?: string;
  contentUrl?: string;
  attributes?: IAttribute[];
  isEncrypted?: boolean;
  accessPrice?: number | null;
  accessDuration?: number | null;
  date?: string;
  comments?: INftComment[];
}
