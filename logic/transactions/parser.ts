import { AbiItem } from 'web3-utils'
import { web3 } from '~/plugins/web3'
import { ERC20ABI } from '~/constants/abi-samples'
import {
  TransactionType,
  EtherscanTransactionType,
  EtherscanERC20TransactionType,
  EtherscanERC721TransactionType
} from '~/logic/transactions/types'
import { TokenInfoType } from '~/logic/address/types'
import { SignatureType, signatures } from '~/constants/functionSignatures'

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
      to: transaction.to
    }
  }

  private parseTokenInfo(
    transaction: EtherscanERC20TransactionType | EtherscanERC721TransactionType
  ): TokenInfoType {
    return {
      id: undefined,
      totalSupply: undefined,
      contractAddress: transaction.contractAddress,
      decimals: transaction.tokenDecimal,
      name: transaction.tokenName,
      symbol: transaction.tokenSymbol
    }
  }

  private parseInput(tx: EtherscanTransactionType) {
    try {
      const inputSignature = tx.input.slice(0, 10)
      const signatureObject = signatures.find(
        (item: SignatureType) => item.signature === inputSignature
      ) || { name: '' }
      const abiItem = ERC20ABI.find(
        (item: AbiItem) => item.name === signatureObject.name
      )
      const inputs =
        abiItem && Array.isArray(abiItem.inputs) ? abiItem.inputs : []
      if (inputs) {
        const types = inputs.map((input) => String(input.type))
        const decoded = web3.eth.abi.decodeParameters(
          types,
          '0x' + tx.input.slice(10)
        )
        const params = inputs.map((input, index: number) => {
          const param = Object.assign({ value: '' }, input)
          param.value = decoded[index]
          return param
        })
        const name = signatureObject ? signatureObject.name : ''
        return { name, params }
      }
      return undefined
    } catch {
      return undefined
    }
  }

  private parseSender(tx: TransactionType): string {
    return web3.utils.toChecksumAddress(tx.from)
  }

  private parseReceiver(tx: TransactionType): string {
    const input = tx.decodedInput
    let receiver = tx.to
    if (input && input.name === 'transfer') {
      receiver = input.params[0].value
    }
    return web3.utils.toChecksumAddress(receiver)
  }

  public parseAmount(tx: TransactionType): string {
    const input = tx.decodedInput
    let amount = Number(tx.value)
    let decimals = 18

    if (input && input.name === 'transfer') {
      amount = Number(web3.utils.toBN(input.params[1].value))
    }
    if (tx.tokenInfo) {
      decimals = Number(tx.tokenInfo.decimals)
    }
    const divider = 10 ** decimals
    const result = String(amount / divider)
    return result
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
      transactionBody.tokenInfo = this.parseTokenInfo(transaction)
    }
    transactionBody.sender = this.parseSender(transactionBody)
    transactionBody.receiver = this.parseReceiver(transactionBody)
    return transactionBody
  }
}
