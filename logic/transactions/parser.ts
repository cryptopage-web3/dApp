import { web3 } from '~/plugins/web3'
import {
  TransactionType,
  TransferType,
  TokenInfoType
} from '~/logic/transactions/types'
import {
  EtherscanTransactionType,
  EtherscanERC20TransactionType,
  EtherscanERC721TransactionType
} from '~/logic/transactions/models'

export default class TransactionParser {
  private parseTransactionBody(
    transaction:
      | EtherscanTransactionType
      | EtherscanERC20TransactionType
      | EtherscanERC721TransactionType
  ): TransactionType {
    return {
      gas: transaction.gas,
      hash: transaction.hash,
      input: transaction.input,
      nonce: transaction.nonce,
      value: typeof transaction.value === 'string' ? transaction.value : '',
      blockHash: transaction.blockHash,
      blockNumber: transaction.blockNumber,
      confirmations: transaction.confirmations,
      cumulativeGasUsed: transaction.cumulativeGasUsed,
      from: transaction.from,
      gasPrice: transaction.gasPrice,
      gasUsed: transaction.gasUsed,
      timeStamp: transaction.timeStamp,
      to: transaction.to,
      nft: undefined
    }
  }

  private parseTokenInfo(
    transaction: EtherscanERC20TransactionType | EtherscanERC721TransactionType
  ): TokenInfoType {
    return {
      tokenDecimal: transaction.tokenDecimal,
      tokenName: transaction.tokenName,
      tokenSymbol: transaction.tokenSymbol
    }
  }

  private parseTransfer(
    tx: EtherscanTransactionType
  ): TransferType | undefined {
    if (tx.input.length === 138 || tx.input.slice(2, 10) === 'a9059cbb') {
      return {
        receiver: web3.utils.toChecksumAddress(
          '0x' + tx.input.slice(34, 74).toString()
        ),
        amount: web3.utils
          .toBN('0x' + tx.input.slice(74).toString())
          .toString(),
        contractAddress: web3.utils.toChecksumAddress(tx.to),
        sender: web3.utils.toChecksumAddress(tx.from)
      }
    }
    return undefined
  }

  public parse(
    transaction:
      | EtherscanTransactionType
      | EtherscanERC20TransactionType
      | EtherscanERC721TransactionType
  ): TransactionType {
    const transactionBody = this.parseTransactionBody(transaction)
    if ('tokenSymbol' in transaction) {
      transactionBody.tokenInfo = this.parseTokenInfo(transaction)
    }
    if (transaction.input.startsWith('0x')) {
      transactionBody.transfer = this.parseTransfer(transaction)
    }
    return transactionBody
  }
}
