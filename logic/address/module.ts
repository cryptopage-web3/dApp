import Vue from 'vue'
import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import TransactionAPIService from '~/logic/transactions/services/api'
import AddressService from '~/logic/address/services/index'
import {
  TokenBalanceType,
  AddressInfoType,
  TokenInfoType
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

  @Inject(tokens.ADDRESS_SERVICE)
  public addressService!: AddressService

  // State

  @State()
  public addressInfo: AddressInfoType = {
    address: '',
    tokenInfo: null,
    tokens: [],
    transactionsCount: 0
  }

  @State()
  public transactions: TransactionType[] = []

  // Getters

  @Getter()
  public get address(): string {
    return this.addressInfo.address
  }

  @Getter()
  public get tokens(): TokenBalanceType[] {
    let tokens = this.addressInfo ? this.addressInfo.tokens : []
    const ethToken = tokens.find(
      (token) => token && token.tokenInfo && token.tokenInfo.symbol === 'ETH'
    )
    tokens = tokens.filter(
      (token) => token && token.tokenInfo && token.tokenInfo.symbol !== 'ETH'
    )
    tokens = tokens.sort((a, b) => (a.usdBalance > b.usdBalance ? -1 : 1))
    tokens = ethToken ? [ethToken, ...tokens] : tokens
    return tokens
  }

  @Getter()
  public get image(): string {
    return this.addressInfo.tokenInfo && this.addressInfo.tokenInfo.image
      ? this.addressInfo.tokenInfo.image
      : ''
    return ''
  }

  @Getter()
  public get name(): string {
    return this.addressInfo.tokenInfo && this.addressInfo.tokenInfo.name
      ? this.addressInfo.tokenInfo.name
      : ''
  }

  @Getter()
  public get symbol(): string {
    return this.addressInfo.tokenInfo && this.addressInfo.tokenInfo.symbol
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
    Vue.set(this.addressInfo, 'address', address)
  }

  @Mutation()
  public setAddressInfo(addressInfo: AddressInfoType | null): void {
    Vue.set(this, 'addressInfo', addressInfo)
  }

  @Mutation()
  public setTokens(tokens: TokenBalanceType[]): void {
    Vue.set(this.addressInfo, 'tokens', tokens)
  }

  @Mutation()
  public setTransactionsCount(transactionsCount: number): void {
    Vue.set(this.addressInfo, 'transactionsCount', transactionsCount)
  }

  @Mutation()
  public setTokenInfo(tokenInfo: TokenInfoType | null): void {
    Vue.set(this.addressInfo, 'tokenInfo', tokenInfo)
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
    this.setAddressInfo({
      address,
      tokenInfo: null,
      tokens: [],
      transactionsCount: 0
    })
    const tokenInfo = await this.addressService.getTokenInfo(address)
    this.setTokenInfo(tokenInfo)
    const tokens = await this.addressService.getTokens(address)
    this.setTokens(tokens)
    const transactionsCount = await this.addressService.getTransactionsCount(
      address
    )
    this.setTransactionsCount(transactionsCount)
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
