import { TEthTransaction } from './ITransaction';

export interface IEthTransactionsResponse {
  continue?: {
    tx: number;
    erc20: number;
  };
  transactions: TEthTransaction[];
}
