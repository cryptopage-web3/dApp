export interface ITransactionsParams {
  chainSlug: string;
  address: string;
  page?: number;
  pageSize?: number;
  continue?: {
    fingerprint?: string;
  };
}
