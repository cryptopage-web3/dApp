export interface ISendNFTParams {
  authChainSlug: string;
  authAddress: string;
  ownerAddress: string;
  ipfsHash: string;
  isEncrypted: boolean;
  accessPrice: number;
  accessDuration: number;
}
