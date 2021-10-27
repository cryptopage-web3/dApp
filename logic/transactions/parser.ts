import { web3 } from '~/plugins/web3'
import {
  TransactionType,
  DecodedInputType,
  EtherscanTransactionType,
  EtherscanERC20TransactionType,
  EtherscanERC721TransactionType
} from '~/logic/transactions/types'
import { TokenInfoType } from '~/logic/address/types'
import { signatures } from '~/constants/functionSignatures'

export default class EtherscanTransactionParser {
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
      sender: transaction.from,
      receiver: transaction.to
    }
  }

  private parseTokenInfo(
    transaction: EtherscanERC20TransactionType | EtherscanERC721TransactionType
  ): TokenInfoType {
    return {
      // totalSupply: undefined,
      address: transaction.contractAddress,
      decimals: Number(transaction.tokenDecimal),
      name: transaction.tokenName,
      symbol: transaction.tokenSymbol,
      image: ''
    }
  }

  private parseInput(tx: EtherscanTransactionType): null | DecodedInputType {
    try {
      const signature = tx.input.slice(0, 10)
      const signatureObject = signatures[signature]
      if (signatureObject) {
        const types = signatureObject.text
          .split('(')[1]
          .replace(')', '')
          .split(',')
        if (types) {
          const decoded = web3.eth.abi.decodeParameters(
            types,
            '0x' + tx.input.slice(10)
          )
          return {
            signature,
            name: signatureObject.name,
            text: signatureObject.text,
            decoded
          }
        }
      }
      return null
    } catch {
      return null
    }
  }

  private parseSender(tx: TransactionType): string {
    return tx.from
  }

  private parseReceiver(tx: TransactionType): string {
    const input = tx.decodedInput
    let receiver = tx.to
    if (input && input.name === 'Transfer') {
      receiver = input.decoded[0]
    }
    if (input && input.name === 'TransferFrom') {
      receiver = input.decoded[1]
    }
    if (input && input.name === 'Swap') {
      receiver = input.decoded[1]
    }
    return receiver
  }

  public parseAmount(tx: TransactionType): string {
    const input = tx.decodedInput
    let amount = Number(tx.value)
    let decimals = 18
    if (input && input.name === 'Transfer') {
      amount = Number(web3.utils.toBN(input.decoded[1]))
    } else if (input && input.name === 'TransferFrom') {
      amount = Number(web3.utils.toBN(input.decoded[2]))
    } else if (input && input.name === 'Swap') {
      amount = Number(web3.utils.toBN(input.decoded[2]))
    } else if (input && input.name.startsWith('Swap Exact')) {
      amount = Number(web3.utils.toBN(input.decoded[3]))
    }
    if (tx.token) {
      decimals = Number(tx.token.decimals)
    }
    const divider = 10 ** decimals
    const result = String(amount / divider)
    return result
  }

  public parseFee(tx: TransactionType): string {
    return String((Number(tx.gasPrice) / 10 ** 18) * Number(tx.gasUsed))
  }

  public parse(
    transaction:
      | EtherscanTransactionType
      | EtherscanERC20TransactionType
      | EtherscanERC721TransactionType
  ): TransactionType {
    const transactionBody = this.parseTransactionBody(transaction)
    if (transaction.input.startsWith('0x')) {
      transactionBody.decodedInput = this.parseInput(transaction)
    }
    if ('tokenSymbol' in transaction) {
      transactionBody.token = this.parseTokenInfo(transaction)
    }
    transactionBody.sender = this.parseSender(transactionBody)
    transactionBody.receiver = this.parseReceiver(transactionBody)
    transactionBody.fee = this.parseFee(transactionBody)
    return transactionBody
  }
}
