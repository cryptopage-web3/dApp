export interface ITransactionsParams {
  chainSlug: string;
  address: string;
  pageSize?: number;
  continue?: {
    fingerprint?: string;
  };
}
