import { ITransaction } from '.';

export interface ITransactionsResponse {
  count: number;
  transactions: ITransaction[];
}
