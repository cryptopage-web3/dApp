export interface ISendCommentParams {
  communityAddress: string;
  authChainSlug: string;
  authAddress: string;
  nftTokenId: string;
  ipfsHash: string;
  isUp: boolean;
  isDown: boolean;
}
