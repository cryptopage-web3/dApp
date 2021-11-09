import * as ts from 'io-ts'
import {
  Attribute,
  Property,
  NFTPayload,
  ParsedNFT,
  NFTMedia
} from '~/logic/nft/models'
/**
 * These are inner types, they are only used inside the client.
 *
 * If your exchange some information with a server - make it a model.
 * And place it in `/models.ts` file.
 */

// We add owner only on the client (for demo purposes)
export type AttributeType = ts.TypeOf<typeof Attribute>
export type PropertyType = ts.TypeOf<typeof Property>
export type NFTPayloadType = ts.TypeOf<typeof NFTPayload>
export type ParsedNFTType = ts.TypeOf<typeof ParsedNFT>
export type NFTMediaType = ts.TypeOf<typeof NFTMedia>

export type NFTType = ParsedNFTType & {
  owner: string
  commentsEnabled: boolean
}

export type NFTAdapterRequestParamsType = NFTMediaType & {
  owner: string
  commentsEnabled: boolean
}

export type NFTAdapterType = {
  request: (params: NFTAdapterRequestParamsType) => NFTType
}

export interface FetchOneType {
  tokenId: string
  contractAddress: string
}

export interface FetchManyType {
  address: string
  page: number
  pageSize: number
}

interface ERC721CommentsType {
  comments: string
  likes: string
  dislakes: string
}

export interface ERC721ContractDataType {
  tokenURI: string
  owner: string
  comments: ERC721CommentsType | null
}

export interface ISendNFTParams {
  from: string
  hash: string
  comment: boolean
}

export interface ISendNFTApi {
  params: ISendNFTParams
  callback: (params: { status: string; txHash: string }) => void
}

export interface ISendNFTWeb3 {
  params: ISendNFTParams
  callbacks: {
    onTransactionHash: (hash: string) => void
    onReceipt: () => void
    onError: () => void
  }
}
