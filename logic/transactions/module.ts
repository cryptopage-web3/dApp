import Vue from 'vue'
import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import TransactionService from '~/logic/transactions/services'
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

  // State

  @State()
  public transactions: TransactionType[] = []

  @State()
  public transactionCount = 0

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
    /*
    if (
      !this.transactions.some(
        (tx: TransactionType) => tx.hash === transaction.hash
      )
    ) {
      this.transactions = [transaction, ...this.transactions]
    }
    */
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
}
