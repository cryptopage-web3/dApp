import Vue from 'vue'
import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import TransactionAPIService from '~/logic/transactions/services/api'
import AddressAPIService from '~/logic/address/services/api'
import { TokenBalanceType, AddressInfoType } from '~/logic/address/types'
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
export default class AddressModule {
  // Dependencies

  @Inject(tokens.TRANSACTION_API_SERVICE)
  public transactionAPIService!: TransactionAPIService

  @Inject(tokens.ADDRESS_API_SERVICE)
  public addressAPIService!: AddressAPIService

  // State

  @State()
  public currentAddress = '0x'

  @State()
  public transactions: TransactionType[] = []

  @State()
  public addressInfo: AddressInfoType | undefined

  // Getters

  @Getter()
  public get address(): string {
    return this.addressInfo ? this.addressInfo.address : this.currentAddress
  }

  @Getter()
  public get tokens(): TokenBalanceType[] {
    const tokens = this.addressInfo ? this.addressInfo.tokens : []
    return tokens.sort((a, b) => (a.usdBalance > b.usdBalance ? -1 : 1))
  }

  @Getter()
  public get image(): string {
    return this.addressInfo &&
      this.addressInfo.tokenInfo &&
      this.addressInfo.tokenInfo.image
      ? this.addressInfo.tokenInfo.image
      : ''
    return ''
  }

  @Getter()
  public get name(): string {
    return this.addressInfo &&
      this.addressInfo.tokenInfo &&
      this.addressInfo.tokenInfo.name
      ? this.addressInfo.tokenInfo.name
      : ''
  }

  @Getter()
  public get symbol(): string {
    return this.addressInfo &&
      this.addressInfo.tokenInfo &&
      this.addressInfo.tokenInfo.symbol
      ? this.addressInfo.tokenInfo.symbol
      : ''
  }

  @Getter()
  public get hasTransactions(): boolean {
    return Boolean(this.transactions && this.transactions.length > 0)
  }

  @Getter()
  public get transactionsCount(): number {
    return this.addressInfo ? this.addressInfo.transactionsCount : 0
  }

  @Getter()
  public get allTransactions(): TransactionType[] {
    return this.transactions.sort((a, b) =>
      a.timeStamp > b.timeStamp ? -1 : 1
    )
  }

  @Getter()
  public get ERC20Transactions(): TransactionType[] {
    return this.transactions
      .filter((tx: TransactionType) => tx.token)
      .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))
  }

  @Getter()
  public get ERC721Transactions(): TransactionType[] {
    return this.transactions
      .filter((tx: TransactionType) => tx.nft)
      .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))
  }

  // Mutations

  @Mutation()
  public setAddress(address: string): void {
    this.currentAddress = address
  }

  @Mutation()
  public setAddressInfo(addressInfo: AddressInfoType): void {
    this.addressInfo = addressInfo
  }

  @Mutation()
  public setTransactions(transactions: TransactionType[]): void {
    transactions.forEach((transaction: TransactionType) => {
      this.setTransaction(transaction)
    })
  }

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
      this.transactions = [...this.transactions, transaction]
    }
  }

  @Mutation()
  public removeTransactions(): void {
    this.transactions = []
  }

  // Actions

  @Action()
  public async updateAddressInfo(address: string): Promise<void> {
    this.setAddress(address)
    const addressInfo = await this.addressAPIService.getAddressInfo(address)
    this.setAddressInfo(addressInfo)
  }

  @Action()
  public async getTransactions({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    const transactions = await this.transactionAPIService.getTransactions({
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
    const transactions =
      await this.transactionAPIService.getInternalTransactions({
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
    contractAddress,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    const transactions = await this.transactionAPIService.getERC20Transactions({
      address,
      contractAddress,
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
    const transactions = await this.transactionAPIService.getERC721Transactions(
      {
        address,
        page,
        offset,
        sort
      }
    )
    this.setTransactions(transactions)
    return transactions
  }

  @Action()
  public clearTransactions(): void {
    this.removeTransactions()
  }
}
