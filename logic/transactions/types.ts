import { NFTType } from '~/logic/nft/types'

export type TokenInfoType = {
  tokenDecimal: string
  tokenName: string
  tokenSymbol: string
  tokenID?: string
}

export type TransferType = {
  receiver: string
  amount: string
  contractAddress: string
  sender: string
}

export type TransactionType = {
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
  tokenInfo?: TokenInfoType
  nft?: NFTType
  transfer?: TransferType
}

export type ParamsAddressType = {
  address: string
}

export type ParamsTransactionsType = ParamsAddressType & {
  page?: number
  offset?: number
  sort?: string
}
