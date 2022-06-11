import { IPagination, ITransaction } from '.';

export interface ITransactionPagination extends IPagination {
  transactions: ITransaction[];
}
