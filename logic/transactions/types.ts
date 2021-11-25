import { NFTType } from '~/logic/nft/types'
import { TokenInfoType } from '~/logic/tokens/types'

export type DecodedInputType = {
  signature: string
  name: string
  text: string
  decoded: { [key: string]: any }
}

export type TransactionAdaptarParamsType = {
  token?: TokenInfoType | null
  nft?: NFTType | null
}

/**
 * Supported currencies for calculatins amount, fee, token price, etc.
 */
export type Rate = {
  [currency: string]: number
}

export type TransactionAmountType = {
  value: number
  decimalsValue: number
  rate: Rate
}

export type TransactionFeeType = TransactionAmountType

export type InternalTransactionType = TransactionAdaptarParamsType & {
  decodedInput?: DecodedInputType | null
  fee?: number
  USDFee?: number
  sender: string
  receiver: string
  amount?: number
  USDAmount?: number
}

export enum ESortDirectionType {
  asc = 'asc',
  desc = 'desc'
}

export enum ESortFieldType {
  timestamp = 'timestamp',
  value = 'value'
}

export enum EServiceType {
  all = 'all',
  api = 'api',
  web3 = 'web3',
  ipfs = 'ipfs',
  cache = 'cache'
}

export enum ETransactionStoreType {
  all = 'all',
  normal = 'normal',
  internal = 'internal',
  erc20 = 'erc20',
  erc721 = 'erc721'
}

export type ParamsTransactionsType = {
  address: string
  contractAddress?: string
  page?: number
  offset?: number
  sort?: ESortDirectionType
  sortField?: ESortFieldType
  serviceTypes?: EServiceType[]
  transactionType?: ETransactionStoreType
  module?: string
  action?: string
}

export type TransactionType = InternalTransactionType & {
  gas: string
  hash: string
  input: string
  nonce: string
  value: string
  blockHash: string
  blockNumber: string
  confirmations: string
  cumulativeGasUsed: string
  from: string
  gasPrice: string
  gasUsed: string
  timeStamp: string
  to: string
}

export type TransactionPagination = {
  pageSize: number
  sort: string
  page: number
  hasAllPages: boolean
}

export enum ETransactionPaginationType {
  normal = 'normal',
  ERC721 = 'ERC721',
  ERC20 = 'ERC20'
}

export type ParamsSetTransactionPagination = {
  type: ETransactionPaginationType
  page: number
  hasAllPages?: boolean
}
