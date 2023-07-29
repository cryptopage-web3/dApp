import { INftServer } from '.';

export interface INftsResponse {
  count?: number;
  list: INftServer[];
}
