import { ETypeNft, IAttribute } from '.';

export interface INftTransactionDetailsResponse {
  id?: number;
  date?: string;
  type?: ETypeNft;
  contentUrl?: string;
  name?: string;
  description?: string;
  chain?: string;
  tokenId?: string;
  attributes?: IAttribute[];
}
