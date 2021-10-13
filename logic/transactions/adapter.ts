import {
  TransactionType,
  ParamsAdaptarType,
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
) => {
  return {
    request: ({ nft, tokenInfo }: ParamsAdaptarType): TransactionType => {
      const parser = new TransactionParser()
      const data = parser.parse(transaction)
      if (nft) {
        data.nft = nft
      }
      if (tokenInfo) {
        data.tokenInfo = tokenInfo
      }
      data.amount = parser.parseAmount(data)
      return data
    }
  }
}

export default TransactionAdapter
