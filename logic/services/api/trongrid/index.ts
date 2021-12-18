import { Service } from 'vue-typedi'
import { TronGridAPIServiceMixin } from '~/logic/mixins/api'
import {
  TronGridAPITokenType,
  TronGridAPITransactionType
} from '~/logic/services/api/trongrid/types'
import {
  TronGridAPITokenBalanceParser,
  TronGridAPITransactionParser
} from '~/logic/services/api/trongrid/parser'
import { TokenBalanceType } from '~/logic/tokens/types'
import tokens from '~/logic/tokens'

import {
  ESortDirectionType,
  TransactionType,
  ParamsTransactionsType
} from '~/logic/transactions/types'

// declare const window: Window &
//   typeof globalThis & {
//     tronWeb: any
//   }

@Service(tokens.TRONGRID_API_SERVICE)
export default class TronGridAPIService extends TronGridAPIServiceMixin {
  public getTokenBalances = async (
    address: string
  ): Promise<TokenBalanceType[]> => {
    const URL = `${this.baseURL}account?address=${address}`
    try {
      const response = await this.$axios.get(URL)
      const parser = new TronGridAPITokenBalanceParser()
      return response.data.tokens.map(
        (token: TronGridAPITokenType): TokenBalanceType => parser.parse(token)
      )
    } catch {
      return []
    }
  }

  public getTransactionsCount = (): Promise<number> => {
    try {
      return Promise.resolve(Number.MAX_SAFE_INTEGER)
    } catch {
      return Promise.resolve(0)
    }
  }

  public getNormalTransactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = ESortDirectionType.desc
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'txlist'
    }
    const params = new URLSearchParams(options).toString()
    // const URL = `${this.transactionsURL}accounts/${address}/transactions${params}`
    const URL = `${this.transactionsURL}accounts/TUN4dKBLbAZjArUS7zYewHwCYA6GSUeSaK/transactions?${params}`
    try {
      const response = await this.$axios.get(URL)
      const parser = new TronGridAPITransactionParser()
      const transactions = response.data.data.map(
        (transaction: TronGridAPITransactionType): TransactionType =>
          parser.parse(transaction)
      )
      // for (let i = 0; i < transactions.length; i++) {
      //   const transaction = transactions[i]
      //   const result = await this.$axios.get(
      //     `https://api.trongrid.io/v1/transactions/${transaction.hash})/events`
      //   )
      //   transaction.from = window.tronWeb.address.fromHex(
      //     result.data.data[0].result.from
      //   )
      //   transaction.to = window.tronWeb.address.fromHex(
      //     result.data.data[0].result.to
      //   )
      //   transaction.value = window.tronWeb.address.fromHex(
      //     result.data.data[0].result.value
      //   )
      // }
      return transactions
    } catch {
      return []
    }
  }
}
