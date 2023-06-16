import { ITransactionData } from './ITransaction';

export interface ITransactionsResponse {
  transactions: ITransactionData[];
  continue?: {
    pageKey?: string;
  };
}
