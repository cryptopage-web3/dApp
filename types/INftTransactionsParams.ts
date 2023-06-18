export interface INftTransactionsParams {
  chainSlug: string;
  address: string;
  pageSize?: number;
  continue?: {
    pageKey?: string;
  };
}
