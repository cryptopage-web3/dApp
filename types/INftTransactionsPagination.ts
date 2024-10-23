import { INftTransaction } from './INftTransaction';
import { IPagination } from './IPagination';

export interface INftTransactionsPagination extends IPagination {
  nfts: INftTransaction[];
  count: number;
  continue?: {
    pageKey?: string;
  };
}

export type TNftTransactionsPagination = INftTransactionsPagination;
