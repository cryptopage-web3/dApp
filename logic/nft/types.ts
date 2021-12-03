import * as ts from 'io-ts'
import {
  Attribute,
  Property,
  NFTPayload,
  ParsedNFT,
  NFTMedia,
  NFTAttributes
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
export type NFTAttributesType = ts.TypeOf<typeof NFTAttributes>

export type NFTCommentsType = {
  total: string
  likes: string
  dislikes: string
}

export type NFTType = ParsedNFTType & {
  owner: string
  comments: NFTCommentsType | null
}

export type NFTAdapterRequestParamsType = NFTMediaType & {
  owner: string
  comments: NFTCommentsType | null
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

export interface ERC721CommentsType {
  total: string
  likes: string
  dislikes: string
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

export interface ISendNFTCommentParams {
  from: string
  nftContractAddress: string
  tokenId: string
  comment: string
  like: boolean
}

export interface ISendNFTComment {
  params: ISendNFTCommentParams
  callback: (params: { status: string; txHash: string }) => void
}

export interface ISendNFTCommentWeb3 {
  params: ISendNFTCommentParams
  callbacks: {
    onTransactionHash: (hash: string) => void
    onReceipt: () => void
    onError: () => void
  }
}

export interface IActivateCommentsParams {
  from: string
  nftContractAddress: string
  tokenId: string
}

export interface IActivateComments {
  params: IActivateCommentsParams
  callback: (params: { status: string; txHash: string }) => void
}

export interface IActivateCommentsWeb3 {
  params: IActivateCommentsParams
  callbacks: {
    onTransactionHash: (hash: string) => void
    onReceipt: () => void
    onError: () => void
  }
}

export type IBurnParamsType = {
  params: { tokenId: string; from: string }
  callbacks: {
    onTransactionHash: (hash: string) => void
    onReceipt: () => void
    onError: () => void
  }
}
