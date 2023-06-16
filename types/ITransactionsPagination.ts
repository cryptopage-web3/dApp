import { IPagination, ITransaction } from '.';

export interface ITransactionsPagination extends IPagination {
  transactions: ITransaction[];
  count: number;
  continue?: {
    pageKey?: string;
  };
}
