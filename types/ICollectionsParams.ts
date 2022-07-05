export interface ICollectionsParams {
  limit?: number;
  offset?: number;
  filter?: {
    name?: string;
    blockchain?: string;
  };
}
