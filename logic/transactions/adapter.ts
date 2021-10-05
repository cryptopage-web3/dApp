import { NFTType } from '~/logic/nft/types'
import { TransactionType } from '~/logic/transactions/types'
import {
  EtherscanTransactionType,
  EtherscanERC20TransactionType,
  EtherscanERC721TransactionType
} from '~/logic/transactions/models'
import TransactionParser from '~/logic/transactions/parser'

const TransactionAdapter = (
  transaction:
    | EtherscanTransactionType
    | EtherscanERC20TransactionType
    | EtherscanERC721TransactionType
) => {
  return {
    request: (nft?: NFTType): TransactionType => {
      const parser = new TransactionParser()
      const data = parser.parse(transaction)
      data.nft = nft
      return data
    }
  }
}

export default TransactionAdapter
