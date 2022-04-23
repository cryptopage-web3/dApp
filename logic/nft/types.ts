/* eslint-disable camelcase */
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
export type AttributeType = Attribute
export type PropertyType = Property
export type NFTPayloadType = NFTPayload
export type ParsedNFTType = ParsedNFT
export type NFTMediaType = NFTMedia
export type NFTAttributesType = NFTAttributes

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

/** Create NFT */

export enum EAttributeDisplayType {
  number = 'number',
  date = 'date',
  boostPercentage = 'boost_percentage',
  boostNumber = 'boost_number'
}

export interface INFTAttributesDataToCreate {
  trait_type: string
  value: string | number
  max_value?: number
  display_type?: EAttributeDisplayType
}

export interface INFTDataToCreate {
  name: string
  description: string
  /** get link after save file */
  animation_url?: string | null
  image?: string | null
  /** get from form */
  file?: File | null
  attributes: INFTAttributesDataToCreate[]
}

export interface ICreateNFTParams {
  nft: INFTDataToCreate
  address: string
  from: string
}

export interface ICreateNFT {
  params: ICreateNFTParams
  callback: (params: {
    status: string
    txHash?: string
    message?: string
  }) => void
}

export interface ISendNFTParams {
  address: string
  from: string
  hash: string
}

export interface ISendNFTWeb3 {
  params: ISendNFTParams
  callbacks: {
    onTransactionHash: (hash: string) => void
    onReceipt: () => void
    onError: () => void
  }
}

/** Send comment */

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

/** Burn */

export type IBurnParamsType = {
  params: { tokenId: string; from: string }
  callbacks: {
    onTransactionHash: (hash: string) => void
    onReceipt: () => void
    onError: () => void
  }
}
