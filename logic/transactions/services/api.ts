import { AxiosResponse } from 'axios'
import * as tPromise from 'io-ts-promise'
import { Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import NFTAPIService from '~/logic/nft/services/api'
import AddressService from '~/logic/address/services/index'
import TransactionAdapter from '~/logic/transactions/adapter'
import { APIServiceMixin } from '~/logic/mixins'
import {
  TransactionType,
  ParamsTransactionsType,
  EtherscanTransactionType,
  EtherscanERC20TransactionType,
  EtherscanERC721TransactionType,
  EtherscanTransactionsResponseType,
  EtherscanInternalTransactionType,
  EtherscanERC20TransactionsResponseType,
  EtherscanERC721TransactionsResponseType,
  EtherscanInternalTransactionsResponseType
} from '~/logic/transactions/types'
import {
  EtherscanTransactionsResponse,
  EtherscanERC20TransactionsResponse,
  EtherscanERC721TransactionsResponse,
  EtherscanInternalTransactionsResponse
} from '~/logic/transactions/models'

@Service(tokens.TRANSACTION_API_SERVICE)
export default class TransactionAPIService extends APIServiceMixin {
  @Inject(tokens.ADDRESS_SERVICE)
  private addressService!: AddressService

  @Inject(tokens.NFT_API_SERVICE)
  public nftAPIService!: NFTAPIService

  /**
   * Get a list of 'Normal' Transactions By Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getTransactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
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
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    try {
      const response: AxiosResponse<EtherscanTransactionsResponseType> =
        await this.$axios.get(URL)
      const data = await tPromise.decode(
        EtherscanTransactionsResponse,
        response.data
      )
      return await Promise.all(
        data.result.map(
          async (
            transaction: EtherscanTransactionType
          ): Promise<TransactionType> => {
            const adapter = TransactionAdapter(transaction)
            const token = await this.addressService.getTokenInfo(transaction.to)
            return adapter.request({ token })
          }
        )
      )
    } catch {
      return []
    }
  }

  public getInternalTransactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'txlistinternal'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    try {
      const response: AxiosResponse<EtherscanInternalTransactionsResponseType> =
        await this.$axios.get(URL)
      const data = await tPromise.decode(
        EtherscanInternalTransactionsResponse,
        response.data
      )
      return data.result.map(
        (transaction: EtherscanInternalTransactionType): TransactionType => {
          const adapter = TransactionAdapter(transaction)
          return adapter.request({})
        }
      )
    } catch {
      return []
    }
  }

  /**
   * Get a list of "ERC20 - Token Transfer Events" by Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getERC20Transactions = async ({
    address,
    contractAddress,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'tokentx'
    }
    if (contractAddress) {
      Object.assign(options, { contractAddress })
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    try {
      const response: AxiosResponse<EtherscanERC20TransactionsResponseType> =
        await this.$axios.get(URL)
      const data = await tPromise.decode(
        EtherscanERC20TransactionsResponse,
        response.data
      )
      return data.result.map(
        (transaction: EtherscanERC20TransactionType): TransactionType => {
          const adapter = TransactionAdapter(transaction)
          return adapter.request({})
        }
      )
    } catch {
      return []
    }
  }

  /**
   * Get a list of "ERC721 - Token Transfer Events" by Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getERC721Transactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'tokennfttx'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    try {
      const response: AxiosResponse<EtherscanERC721TransactionsResponseType> =
        await this.$axios.get(URL)
      const data = await tPromise.decode(
        EtherscanERC721TransactionsResponse,
        response.data
      )
      return await Promise.all(
        data.result.map(
          async (
            transaction: EtherscanERC721TransactionType
          ): Promise<TransactionType> => {
            const adapter = TransactionAdapter(transaction)
            const nft = await this.nftAPIService.fetchOne({
              tokenId: transaction.tokenID,
              contractAddress: transaction.contractAddress
            })
            return adapter.request({ nft })
          }
        )
      )
    } catch {
      return []
    }
  }
}
