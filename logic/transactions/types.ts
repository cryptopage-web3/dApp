import * as ts from 'io-ts'
import { NFTType } from '~/logic/nft/types'
import { TokenInfoType } from '~/logic/address/types'
import {
  EtherscanTransaction,
  EtherscanInternalTransaction,
  EtherscanERC20Transaction,
  EtherscanERC721Transaction,
  EtherscanTransactionsResponse,
  EtherscanInternalTransactionsResponse,
  EtherscanERC20TransactionsResponse,
  EtherscanERC721TransactionsResponse,
  EtherscanABIResponse
} from '~/logic/transactions/models'

export type DecodedInputType = {
  signature: string
  name: string
  text: string
  decoded: { [key: string]: any }
}

export type ParamsAdaptarType = {
  token?: TokenInfoType | null
  nft?: NFTType | null
  decodedInput?: DecodedInputType | null
}

export type ParamsTransactionsType = {
  address: string
  contractAddress?: string
  page?: number
  offset?: number
  sort?: string
  module?: string
  action?: string
}

export type TransactionType = ParamsAdaptarType & {
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
  fee?: string
  timeStamp: string
  to: string
  sender: string
  receiver: string
  amount?: string
}

export type TransactionAdapterType = {
  request: ({ nft, token }: ParamsAdaptarType) => TransactionType
}

export type EtherscanTransactionType = ts.TypeOf<typeof EtherscanTransaction>
export type EtherscanInternalTransactionType = ts.TypeOf<
  typeof EtherscanInternalTransaction
>
export type EtherscanERC20TransactionType = ts.TypeOf<
  typeof EtherscanERC20Transaction
>
export type EtherscanERC721TransactionType = ts.TypeOf<
  typeof EtherscanERC721Transaction
>
export type EtherscanTransactionsResponseType = ts.TypeOf<
  typeof EtherscanTransactionsResponse
>
export type EtherscanInternalTransactionsResponseType = ts.TypeOf<
  typeof EtherscanInternalTransactionsResponse
>
export type EtherscanERC20TransactionsResponseType = ts.TypeOf<
  typeof EtherscanERC20TransactionsResponse
>
export type EtherscanERC721TransactionsResponseType = ts.TypeOf<
  typeof EtherscanERC721TransactionsResponse
>
export type EtherscanABIResponseType = ts.TypeOf<typeof EtherscanABIResponse>
