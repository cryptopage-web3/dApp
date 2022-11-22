export interface ISendNFTParams {
  authChainSlug: string;
  authAddress: string;
  ownerAddress: string;
  communityId: number;
  ipfsHash: string;
  isEncrypted: boolean;
  accessPrice: number;
  accessDuration: number;
}
