import { INftTransaction } from '.';

export interface INftTransactionsResponse {
  count?: number;
  list: INftTransaction[];
}
