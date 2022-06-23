export interface IAttribute {
  display_type?: string;
  trait_type: string;
  value: number | string;
  max_value?: number;
}

export enum ETypeNft {
  image = 'image',
  audio = 'audio',
  video = 'video',
}

export interface INft {
  collectionName: string;
  contract_address: string;
  date: string;
  description: string;
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
