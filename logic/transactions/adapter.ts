import {
  TransactionType,
  ParamsAdaptarType,
  TransactionAdapterType,
  EtherscanTransactionType,
  EtherscanERC20TransactionType,
  EtherscanERC721TransactionType
} from '~/logic/transactions/types'
import TransactionParser from '~/logic/transactions/parser'

const TransactionAdapter = (
  transaction:
    | EtherscanTransactionType
    | EtherscanERC20TransactionType
    | EtherscanERC721TransactionType
): TransactionAdapterType => {
  return {
    request: ({ nft, token }: ParamsAdaptarType): TransactionType => {
      const parser = new TransactionParser()
      const data = parser.parse(transaction)
      if (nft) {
        data.nft = nft
      }
      if (token) {
        data.token = token
      }
      data.amount = parser.parseAmount(data)
      return data
    }
  }
}

export default TransactionAdapter
