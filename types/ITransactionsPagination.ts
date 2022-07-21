import { IPagination, ITransaction } from '.';

export interface ITransactionsPagination extends IPagination {
  transactions: ITransaction[];
  count: number;
  continue?: {
    tx: number;
    erc20: number;
  };
}
