import { IAttribute } from './IAttribute';
import { INftComment } from './INftComment';

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
  accessPrice?: number;
  accessDuration?: number;
}
