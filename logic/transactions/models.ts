import * as ts from 'io-ts'

/* Base transactions */

const BasePartialTransaction = ts.partial({
  value: ts.string
})

const BaseStrictTransaction = ts.type({
  gas: ts.string,
  hash: ts.string,
  input: ts.string,
  nonce: ts.string,
  // maxFeePerGas: ts.string,
  // maxPriorityFeePerGas: ts.string,
  to: ts.string
  // v: ts.string,
  // r: ts.string,
  // s: ts.string
})

const BaseTransaction = ts.intersection([
  BasePartialTransaction,
  BaseStrictTransaction
])

const BaseEtherscanTransaction = ts.type({
  blockHash: ts.string,
  blockNumber: ts.string,
  confirmations: ts.string,
  contractAddress: ts.string,
  cumulativeGasUsed: ts.string,
  from: ts.string,
  gasPrice: ts.string,
  gasUsed: ts.string,
  timeStamp: ts.string,
  to: ts.string,
  transactionIndex: ts.string
  // txreceipt_status: ts.string
})

/* Transaction types */

const EtherscanInternal = ts.type({
  type: ts.string,
  traceId: ts.string,
  errCode: ts.string,
  isError: ts.string
})

const EtherscanERC20 = ts.type({
  // value: ts.string,
  tokenDecimal: ts.string,
  tokenName: ts.string,
  tokenSymbol: ts.string
})

const EtherscanERC721 = ts.type({
  tokenID: ts.string
})

/* Transactions */

export const EtherscanTransaction = ts.intersection([
  BaseTransaction,
  BaseEtherscanTransaction
])

export const EtherscanInternalTransaction = ts.intersection([
  EtherscanTransaction,
  EtherscanInternal
])

export const EtherscanERC20Transaction = ts.intersection([
  EtherscanTransaction,
  EtherscanERC20
])

export const EtherscanERC721Transaction = ts.intersection([
  EtherscanTransaction,
  EtherscanERC20,
  EtherscanERC721
])

/* Responses */

export const EtherscanStringResponse = ts.type({
  status: ts.string,
  message: ts.string,
  result: ts.string
})

export const EtherscanTransactionsResponse = ts.type({
  status: ts.string,
  message: ts.string,
  result: ts.array(EtherscanTransaction)
})

export const EtherscanInternalTransactionsResponse = ts.type({
  status: ts.string,
  message: ts.string,
  result: ts.array(EtherscanInternalTransaction)
})

export const EtherscanERC20TransactionsResponse = ts.type({
  status: ts.string,
  message: ts.string,
  result: ts.array(EtherscanERC20Transaction)
})

export const EtherscanERC721TransactionsResponse = ts.type({
  status: ts.string,
  message: ts.string,
  result: ts.array(EtherscanERC721Transaction)
})

/* Types */
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
export type EtherscanStringResponseType = ts.TypeOf<
  typeof EtherscanStringResponse
>
