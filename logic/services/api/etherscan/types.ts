import {
  EtherscanNormalTransaction,
  EtherscanInternalTransaction,
  EtherscanERC20Transaction,
  EtherscanERC721Transaction,
  EtherscanNormalTransactionsResponse,
  EtherscanInternalTransactionsResponse,
  EtherscanERC20TransactionsResponse,
  EtherscanERC721TransactionsResponse,
  EtherscanABIResponse,
  EtherscanLastPriceResponse
} from '~/logic/services/api/etherscan/models'
export type EtherscanLastPriceResponseType = EtherscanLastPriceResponse
export type EtherscanNormalTransactionType = EtherscanNormalTransaction
export type EtherscanInternalTransactionType = EtherscanInternalTransaction
export type EtherscanERC20TransactionType = EtherscanERC20Transaction
export type EtherscanERC721TransactionType = EtherscanERC721Transaction
export type EtherscanNormalTransactionsResponseType =
  EtherscanNormalTransactionsResponse
export type EtherscanInternalTransactionsResponseType =
  EtherscanInternalTransactionsResponse
export type EtherscanERC20TransactionsResponseType =
  EtherscanERC20TransactionsResponse
export type EtherscanERC721TransactionsResponseType =
  EtherscanERC721TransactionsResponse
export type EtherscanABIResponseType = EtherscanABIResponse
