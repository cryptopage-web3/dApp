import { web3 } from '~/plugins/web3'
import { signatures } from '~/constants/functionSignatures'
import {
  TransactionType,
  DecodedInputType,
  TransactionAdaptarParamsType
} from '~/logic/transactions/types'

export default class TransactionAdapter {
  protected transaction!: TransactionType
  constructor(transaction: TransactionType) {
    this.transaction = transaction
  }

  public calculateSender(): string {
    return this.transaction.from
  }

  public calculateReceiver(): string {
    const tx = this.transaction
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

  public calculateAmount(): number {
    const tx = this.transaction
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
    return amount / divider
  }

  public calculateFee(): number {
    const tx = this.transaction
    let decimals = 18
    if (tx.token) {
      decimals = tx.token.decimals
    }
    const fee = Number(tx.gasPrice) / 10 ** decimals
    return fee * Number(tx.gasUsed)
  }

  public calculateUSDFee(rate: { [currency: string]: number }): number {
    if ('usd' in rate && this.transaction.fee) {
      const fee = Number(this.transaction.fee)
      return fee * rate.usd
    }
    return 0
  }

  public calculateUSDAmount(rate: { [currency: string]: number }): number {
    if ('usd' in rate) {
      const amount = Number(this.transaction.amount)
      return amount * rate.usd
    }
    return 0
  }

  public calculateInput(): null | DecodedInputType {
    const tx = this.transaction
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

  public request(params: TransactionAdaptarParamsType): TransactionType {
    if (params && params.nft) {
      this.transaction.nft = params.nft
    }
    if (params && params.token) {
      this.transaction.token = params.token
    }
    if (this.transaction.input.startsWith('0x')) {
      this.transaction.decodedInput = this.calculateInput()
    }
    this.transaction.sender = this.calculateSender()
    this.transaction.receiver = this.calculateReceiver()
    this.transaction.amount = this.calculateAmount() // this.amount
    this.transaction.fee = this.calculateFee() // this.amount
    if (this.transaction.token && this.transaction.token.rate) {
      this.transaction.USDFee = this.calculateUSDFee(
        this.transaction.token.rate
      )
      this.transaction.USDAmount = this.calculateUSDAmount(
        this.transaction.token.rate
      )
    }
    return this.transaction
  }
}
