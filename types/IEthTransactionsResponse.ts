import { TEthTransaction } from './ITransaction';

export interface IEthTransactionsResponse {
  count: number;
  continue?: {
    tx: number;
    erc20: number;
  };
  transactions: TEthTransaction[];
}
