import Vue from 'vue'
import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import TransactionAPIService from '~/logic/transactions/services/api'
import AddressAPIService from '~/logic/address/services/api'
import {
  // EthplorerTokenInfoType,
  EthplorerTokenType,
  EthplorerGetAddressInfoResponseType
} from '~/logic/address/types'
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
  public addressInfo: EthplorerGetAddressInfoResponseType | undefined

  // Getters

  @Getter()
  public get address(): string {
    const address = this.addressInfo
      ? this.addressInfo.address
      : this.currentAddress
    console.log('address', address)
    return address
  }

  @Getter()
  public get tokens(): EthplorerTokenType[] {
    let tokens: EthplorerTokenType[] = []
    if (this.addressInfo && 'tokens' in this.addressInfo) {
      tokens = this.addressInfo.tokens || []
    }
    return tokens.sort((a, b) => (a.balance > b.balance ? -1 : 1))
  }

  @Getter()
  public get image(): string {
    return this.addressInfo &&
      this.addressInfo.tokenInfo &&
      this.addressInfo.tokenInfo.image
      ? 'https://ethplorer.io' + this.addressInfo.tokenInfo.image
      : ''
  }

  @Getter()
  public get hasTransactions(): boolean {
    return Boolean(this.transactions && this.transactions.length > 0)
  }

  @Getter()
  public get transactionsCount(): number {
    return this.addressInfo ? this.addressInfo.countTxs : 0
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

  // Mutations

  // @Mutation()
  // public setAddress(address: string): void {
  // this.transactionAddress = address
  // }

  // @Mutation()
  // public setTransactionsCount(count: number): void {
  // this.transactionsCount = count
  // }

  @Mutation()
  public setAddress(address: string): void {
    this.currentAddress = address
  }

  @Mutation()
  public setAddressInfo(
    addressInfo: EthplorerGetAddressInfoResponseType
  ): void {
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
      this.transactions = [transaction, ...this.transactions]
    }
  }

  @Mutation()
  public clearTransactions(): void {
    this.transactions = []
  }

  // Actions

  @Action()
  public async updateAddressInfo(address: string): Promise<void> {
    console.log('updateAddressInfo', address)
    this.setAddress(address)
    // if (address !== this.address) {
    const addressInfo = await this.addressAPIService.getAddressInfo(address)
    this.setAddressInfo(addressInfo)
    // }
    console.log('this.currentAddress', this.currentAddress)
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
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    const transactions = await this.transactionAPIService.getERC20Transactions({
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
}