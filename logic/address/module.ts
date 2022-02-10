import Vue from 'vue'
import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import { AddressInfoType } from '~/logic/address/types'
import { TokenBalanceType, TokenInfoType } from '~/logic/tokens/types'
import {
  ParamsSetTransactionPagination,
  ParamsTransactionsType,
  TransactionPagination,
  TransactionType,
  ESortDirectionType,
  ETransactionStoreType
} from '~/logic/transactions/types'
import TransactionService from '~/logic/transactions/services'
import TokenService from '~/logic/tokens/services'
import AddressService from '~/logic/address/services/index'
import tokens from '~/logic/tokens'

const defaultPagination: TransactionPagination = {
  pageSize: 10,
  sort: 'desc',
  page: 0,
  hasAllPages: false
}

@Injectable()
/**
 * Represents a typed Vuex module.
 *
 * @see https://vuex.vuejs.org/guide/modules.html
 * @see https://github.com/sascha245/vuex-simple
 */
export default class AddressModule {
  // Dependencies

  @Inject(tokens.TRANSACTION_SERVICE)
  public transactionService!: TransactionService

  @Inject(tokens.ADDRESS_SERVICE)
  public addressService!: AddressService

  @Inject(tokens.TOKEN_SERVICE)
  public tokenService!: TokenService

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

  @State()
  public normalTransactionPagination: TransactionPagination = {
    ...defaultPagination
  }

  @State()
  public ERC721TransactionPagination: TransactionPagination = {
    ...defaultPagination
  }

  @State()
  public ERC20TransactionPagination: TransactionPagination = {
    ...defaultPagination
  }

  @State()
  public loadingInfo = false

  // Getters

  @Getter()
  public get address(): string {
    return this.addressInfo.address
  }

  @Getter()
  public get tokens(): TokenBalanceType[] {
    return this.addressInfo ? this.addressInfo.tokens : []
  }

  @Getter()
  public get image(): string {
    return this.addressInfo.tokenInfo && this.addressInfo.tokenInfo.image
      ? this.addressInfo.tokenInfo.image
      : ''
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
    if (!this.addressInfo) {
      return 0
    }

    return this.transactions.length > this.addressInfo.transactionsCount
      ? this.transactions.length
      : this.addressInfo.transactionsCount
  }

  @Getter()
  public get inputAddressesCount(): number {
    return new Set(
      this.transactions
        .filter((tx: TransactionType) => tx.to === this.addressInfo.address)
        .map((tx: TransactionType) => tx.from)
    ).size
  }

  @Getter()
  public get outputAddressesCount(): number {
    return new Set(
      this.transactions
        .filter((tx: TransactionType) => tx.from === this.addressInfo.address)
        .map((tx: TransactionType) => tx.to)
    ).size
  }

  @Getter()
  public get allTransactions(): TransactionType[] {
    return this.transactions.sort((a, b) =>
      a.timeStamp > b.timeStamp ? -1 : 1
    )
  }

  @Getter()
  public get normalTransactions(): TransactionType[] {
    return this.transactions
      .filter((tx: TransactionType) => tx.input !== 'deprecated')
      .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))
  }

  @Getter()
  public get hasAllNormalTransactionsPages(): boolean {
    return this.normalTransactionPagination.hasAllPages
  }

  @Getter()
  public get ERC20Transactions(): TransactionType[] {
    return this.transactions
      .filter(
        (tx: TransactionType) =>
          tx.token && tx.token.address !== this.tokenService.basicToken.address
      )
      .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))
  }

  @Getter()
  public get hasAllERC20TransactionsPages(): boolean {
    return this.ERC20TransactionPagination.hasAllPages
  }

  @Getter()
  public get ERC721Transactions(): TransactionType[] {
    return this.transactions
      .filter((tx: TransactionType) => tx.nft)
      .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))
  }

  @Getter()
  public get hasAllERC721TransactionsPages(): boolean {
    return this.ERC721TransactionPagination.hasAllPages
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

      if (
        transaction.input === 'deprecated' &&
        findedTransaction.input.startsWith('0x')
      ) {
        transaction.input = findedTransaction.input
      }

      Vue.set(
        this.transactions,
        index,
        Object.assign(findedTransaction, transaction)
      )
    } else {
      this.transactions = [...this.transactions, transaction]
    }
  }

  @Mutation()
  public removeTransactions(): void {
    this.transactions = []
  }

  @Mutation()
  public setLoadingInfo(loading: boolean): void {
    this.loadingInfo = loading
  }

  @Mutation()
  public setTransactionPagination({
    type,
    page,
    hasAllPages = false
  }: ParamsSetTransactionPagination): void {
    switch (type) {
      case ETransactionStoreType.normal:
        this.normalTransactionPagination = {
          ...this.normalTransactionPagination,
          page,
          hasAllPages
        }
        return

      case ETransactionStoreType.erc721:
        this.ERC721TransactionPagination = {
          ...this.ERC721TransactionPagination,
          page,
          hasAllPages
        }
        return

      case ETransactionStoreType.erc20:
        this.ERC20TransactionPagination = {
          ...this.ERC20TransactionPagination,
          page,
          hasAllPages
        }
    }
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

    // const tokenInfo = await this.tokenService.getTokenInfo(address)
    this.setLoadingInfo(true)

    const tokenInfo = await this.tokenService.getTokenInfo(address)
    this.setTokenInfo(tokenInfo)

    const tokens = await this.tokenService.getTokenBalances(address)
    this.setTokens(tokens)

    const transactionsCount = await this.addressService.getTransactionsCount(
      address
    )
    this.setTransactionsCount(transactionsCount)

    this.setLoadingInfo(false)
  }

  @Action()
  public async getTransactions({
    address,
    transactionType,
    /** для ERC20 */
    contractAddress
  }: ParamsTransactionsType): Promise<TransactionType[]> {
    /** Если не указан тип транзакций, то ничего не делаем */

    if (!transactionType) {
      return []
    }

    /** Получаем текущий статус пагинации
     * Если нет пагинации с данным типом,
     * то выкидываем исключение, т.к. это некорректно
     */

    let pagination: TransactionPagination | null = null

    switch (transactionType) {
      case ETransactionStoreType.normal:
        pagination = this.normalTransactionPagination
        break

      case ETransactionStoreType.erc20:
        pagination = this.ERC20TransactionPagination
        break

      case ETransactionStoreType.erc721:
        pagination = this.ERC721TransactionPagination
        break
    }

    if (!pagination) {
      throw new Error(`No pagination for type - ${transactionType}`)
    }

    const {
      page: currentPage,
      pageSize: offset
      // sort
    } = pagination
    const page = currentPage + 1

    /** Получаем транзакции по типу */

    const transactions = await this.transactionService.getTransactions({
      address,
      page,
      offset,
      sort: ESortDirectionType.desc,
      transactionType,
      /** для ERC20 */
      contractAddress
    })

    this.setTransactions(transactions)

    /** Обновляем пагинацию */

    this.setTransactionPagination({
      type: transactionType,
      page,
      hasAllPages: transactions.length === 0
    })

    return transactions
  }

  @Action()
  public async refreshERC721Transaction(txHash: string) {
    const transaction = this.transactions.find(
      (tx: TransactionType) => tx.hash === txHash
    )

    if (!transaction?.token?.id) {
      return
    }

    const actualTransaction =
      await this.transactionService.refreshERC721Transaction(transaction)

    this.setTransaction(actualTransaction)
  }

  @Action()
  public clearTransactions(): void {
    this.removeTransactions()

    /** Сбрасываем пагинатор у всех транзакций */
    this.setTransactionPagination({
      type: ETransactionStoreType.normal,
      page: 0
    })
    this.setTransactionPagination({
      type: ETransactionStoreType.erc20,
      page: 0
    })
    this.setTransactionPagination({
      type: ETransactionStoreType.erc721,
      page: 0
    })
  }
}
