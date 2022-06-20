import { INft, IPagination } from '.';

export interface INftsPagination extends IPagination {
  nfts: INft[];
  count: number;
}
