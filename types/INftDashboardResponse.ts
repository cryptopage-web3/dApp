export interface INftDashboardItemResponse {
  tokenId: string;
  commentsCount: number;
}

export interface INftDashboardResponse {
  tokens: INftDashboardItemResponse[];
}
