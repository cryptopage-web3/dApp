export interface ICollectionNft {
  id: number;
  itemId: string;
  metaName: string;
  metaDescr: string;
  meta: {
    url: string;
    type: string;
    representation: string;
    mimeType: string;
  }[];
}
