export interface IEthTransactionsParams {
  chainSlug: string;
  address: string;
  continue?: {
    tx: number;
    erc20: number;
  };
}
