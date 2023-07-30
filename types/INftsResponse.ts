import { INftServer } from '.';

export interface INftsResponse {
  list: INftServer[];
  continue?: {
    pageKey?: string;
  };
}
