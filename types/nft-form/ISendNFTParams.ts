export interface ISendNFTParams {
  authChainSlug: string;
  authAddress: string;
  ownerAddress: string;
  ipfsHash: string;
  isEncrypted: boolean;
  isSensitive: boolean;
  isCommented: boolean;
  accessType: number;
  accessPrice: number;
  accessDuration: number;
}
