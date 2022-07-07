import { INftTransaction, IPagination } from '.';

export interface INftTransactionsPagination extends IPagination {
  nfts: INftTransaction[];
  count: number;
}
