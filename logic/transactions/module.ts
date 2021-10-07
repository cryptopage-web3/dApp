import Vue from 'vue'
import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import TransactionService from '~/logic/transactions/services'
import AddressAPIService from '~/logic/address/services/api'
import { EthplorerTokenInfoType } from '~/logic/address/types'
import tokens from '~/logic/tokens'
import {
  ParamsTransactionsType,
  TransactionType
} from '~/logic/transactions/types'

@Injectable()
/**
 * Represents a typed Vuex module.
 *
 * @see https://vuex.vuejs.org/guide/modules.html
 * @see https://github.com/sascha245/vuex-simple
 */
export default class TransactionModule {
  // Dependencies

  @Inject(tokens.TRANSACTION_SERVICE)
  public service!: TransactionService

  @Inject(tokens.ADDRESS_API_SERVICE)
  public addressAPIService!: AddressAPIService

  // State

  @State()
  public transactionAddress = ''

  @State()
  public transactions: TransactionType[] = []

  @State()
  public transactionsCount = 0

  @State()
  public tokenInfo?: EthplorerTokenInfoType

  // Getters

  @Getter()
  public get hasTransactions(): boolean {
    return Boolean(this.transactions && this.transactions.length > 0)
  }

  @Getter()
  public get allTransactions(): TransactionType[] {
    return this.transactions
  }

  @Getter()
  public get ERC20Transactions(): TransactionType[] {
    return this.transactions.filter((tx: TransactionType) => tx.tokenInfo)
  }

  @Getter()
  public get ERC721Transactions(): TransactionType[] {
    return this.transactions.filter((tx: TransactionType) => tx.nft)
  }

  @Getter()
  public get address(): string {
    return this.transactionAddress
  }

  @Getter()
  public get image(): string {
    return this.tokenInfo && this.tokenInfo.image
      ? 'https://ethplorer.io' + this.tokenInfo.image
      : ''
  }

  @Getter()
  public get count(): number {
    return this.transactionsCount
  }

  // Mutations

  @Mutation()
  public setTransaction(transaction: TransactionType): void {
    const index: number = this.transactions.findIndex(
      (tx: TransactionType) => tx.hash === transaction.hash
    )
    if (index > -1) {
      const findedTransaction = this.transactions[index]
      Vue.set(
        this.transactions,
        index,
        Object.assign(transaction, findedTransaction)
      )
    } else {
      this.transactions = [transaction, ...this.transactions]
    }
  }

  @Mutation()
  public setTokenInfo(tokenInfo: EthplorerTokenInfoType) {
    this.tokenInfo = tokenInfo
  }

  @Mutation()
  public setAddress(address: string) {
    this.transactionAddress = address
  }

  @Mutation()
  public setTransactionsCount(count: number) {
    this.transactionsCount = count
  }

  @Mutation()
  public setTransactions(transactions: TransactionType[]): void {
    transactions.forEach((transaction: TransactionType) => {
      this.setTransaction(transaction)
    })
  }

  @Mutation()
  public clearTransactions(): void {
    this.transactions = []
  }

  // Actions

  @Action()
  public async getTransactions({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    const transactions = await this.service.getTransactions({
      address,
      page,
      offset,
      sort
    })
    this.setTransactions(transactions)
    return transactions
  }

  @Action()
  public async getInternalTransactions({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    const transactions = await this.service.getInternalTransactions({
      address,
      page,
      offset,
      sort
    })
    this.setTransactions(transactions)
    return transactions
  }

  @Action()
  public async getERC20Transactions({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    const transactions = await this.service.getERC20Transactions({
      address,
      page,
      offset,
      sort
    })
    this.setTransactions(transactions)
    return transactions
  }

  @Action()
  public async getERC721Transactions({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    const transactions = await this.service.getERC721Transactions({
      address,
      page,
      offset,
      sort
    })
    this.setTransactions(transactions)
    return transactions
  }

  @Action()
  public async updateAddressInfo(address: string): Promise<void> {
    if (address !== this.address) {
      this.setAddress(address)
      const addressInfo = await this.addressAPIService.getAddressInfo(address)
      if (addressInfo) {
        const tokenInfo =
          'tokenInfo' in addressInfo ? addressInfo.tokenInfo : undefined
        if (tokenInfo) {
          this.setTokenInfo(tokenInfo)
        }
        this.setTransactionsCount(addressInfo.countTxs)
      }
    }
  }
}
