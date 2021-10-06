import { AxiosInstance, AxiosResponse } from 'axios'
import * as tPromise from 'io-ts-promise'
import { Container, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import NFTService from '~/logic/nft/services'
import AddressWeb3Service from '~/logic/address/services/web3'
import TransactionAdapter from '~/logic/transactions/adapter'
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

export default class TransactionAPIService {
  @Inject(tokens.ADDRESS_WEB3_SERVICE)
  private addressWeb3Service!: AddressWeb3Service

  private network = 'mainnet'
  protected etherscanAPIKey = 'VQDBC4GZA5MQT2F6IRW2U6RPH66HJRSF6S'
  protected etherscanNetworks: Array<string> = [
    'mainnet',
    'goerli',
    'kovan',
    'rinkeby',
    'ropsten'
  ]

  protected ethplorerNetworks: Array<string> = ['mainnet', 'kovan']

  protected get $axios(): AxiosInstance {
    return Container.get(tokens.AXIOS) as AxiosInstance
  }

  protected get nftService(): NFTService {
    return Container.get(tokens.NFT_SERVICE) as NFTService
  }

  protected get baseURL(): string {
    const network = this.network === 'mainnet' ? '' : `-${this.network}`
    return `https://api${network}.etherscan.io/api?`
  }

  private changeNetwork = (network: string): void => {
    if (this.network !== network) {
      this.network = network
    }
  }

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
    const URL = `${this.baseURL}${params}&apikey=${this.etherscanAPIKey}`
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
          const address = transaction.contractAddress
            ? transaction.contractAddress
            : transaction.to
          const tokenInfo = await this.addressWeb3Service.getTokenInfo(address)
          return adapter.request({ tokenInfo })
        }
      )
    )
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
    const URL = `${this.baseURL}${params}&apikey=${this.etherscanAPIKey}`
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
  }

  /**
   * Get a list of "ERC20 - Token Transfer Events" by Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getERC20Transactions = async ({
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
      action: 'tokentx'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.etherscanAPIKey}`
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
    const URL = `${this.baseURL}${params}&apikey=${this.etherscanAPIKey}`
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
          const nft = await this.nftService.fetchOne({
            tokenId: transaction.tokenID,
            contractAddress: transaction.contractAddress
          })
          return adapter.request({ nft })
        }
      )
    )
  }
}
