export interface ITransactionsParams {
  chainSlug: string;
  address: string;
  pageSize?: number;
  continue?: {
    pageKey?: string;
  };
}
