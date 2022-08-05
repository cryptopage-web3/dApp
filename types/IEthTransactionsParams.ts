export interface IEthTransactionsParams {
  chainSlug: string;
  address: string;
  pageSize?: number;
  continue?: {
    tx?: number;
    erc20?: number;
  };
}
