import { IAttribute } from './IAttribute';
import { INftComment } from './INftComment';
import { ENftTransactionAccessType } from './INftTransaction';

export interface IOwnNftDetailsResponse {
  tokenId?: string;
  chain?: string;
  contentUrl?: string;
  contractAddress?: string;
  name?: string;
  description?: string;
  attributes?: IAttribute[];
  comments?: INftComment[];
  isEncrypted?: boolean;
  accessType?: ENftTransactionAccessType;
  accessPrice?: number;
  accessDuration?: number;
}
