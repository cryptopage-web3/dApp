import { ETypeNft, IAttribute } from '.';

export interface INft {
  collectionName: string;
  contract_address: string;
  date: string;
  description?: string;
  image: string;
  url: string;
  name: string;
  to: string;
  from: string;
  tokenId: string;
  usdPrice: number;
  comments: number;
  likes: number;
  dislikes: number;
  type: ETypeNft;
  attributes: IAttribute[];
}
