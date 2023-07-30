export interface INftsParams {
  chainSlug: string;
  address: string;
  pageSize?: number;
  continue?: {
    pageKey?: string;
  };
}
