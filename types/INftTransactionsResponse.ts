import { INftTransactionServer } from './INftTransactionServer';

export interface INftTransactionsResponse {
  transactions: INftTransactionServer[];
  continue?: {
    pageKey?: string;
  };
}
