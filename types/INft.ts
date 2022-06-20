export interface IAttribute {
  display_type?: string;
  trait_type: string;
  value: number | string;
  max_value?: number;
}

export interface INft {
  collectionName: string;
  contract_address: string;
  date: string;
  description: string;
  image: string;
  name: string;
  to: string;
  from: string;
  tokenId: string;
  usdPrice: number;
  attributes: IAttribute[];
}
