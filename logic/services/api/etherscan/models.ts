import { BaseTransaction } from '~/logic/transactions/models'

type BaseEtherscanTransaction = {
  blockHash: string
  blockNumber: string
  confirmations: string
  cumulativeGasUsed: string
  from: string
  gasPrice: string
  gasUsed: string
  timeStamp: string
  to: string
  transactionIndex: string
  isError?: string
}

/* Transaction types */

type EtherscanInternal = {
  type: string
  traceId: string
  errCode: string
  isError: string
}

type EtherscanERC20 = {
  contractAddress: string
  tokenDecimal: string
  tokenName: string
  tokenSymbol: string
}

type EtherscanERC721 = {
  tokenID: string
}

/* Transactions */

export type EtherscanNormalTransaction = BaseTransaction &
  BaseEtherscanTransaction

export type EtherscanInternalTransaction = EtherscanNormalTransaction &
  EtherscanInternal

export type EtherscanERC20Transaction = EtherscanNormalTransaction &
  EtherscanERC20

export type EtherscanERC721Transaction = EtherscanNormalTransaction &
  EtherscanERC20 &
  EtherscanERC721

/* Responses */

export type EtherscanABIResponse = {
  status: string
  message: string
  result: string
}

export type EtherscanNormalTransactionsResponse = {
  status: string
  message: string
  result: EtherscanNormalTransaction[]
}

export type EtherscanInternalTransactionsResponse = {
  status: string
  message: string
  result: EtherscanInternalTransaction[]
}

export type EtherscanERC20TransactionsResponse = {
  status: string
  message: string
  result: EtherscanERC20Transaction[]
}

export type EtherscanERC721TransactionsResponse = {
  status: string
  message: string
  result: EtherscanERC721Transaction[]
}

export type EtherscanLastPriceResponse = {
  status: string
  message: string
  result: any
}
