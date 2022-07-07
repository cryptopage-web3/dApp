import { ITransactionData } from './ITransaction';

export interface ITransactionsResponse {
  count: number;
  transactions: ITransactionData[];
}
