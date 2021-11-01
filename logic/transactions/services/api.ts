import { Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import EtherscanAPIService from '~/logic/services/api/etherscan'
import {
  TransactionType,
  ParamsTransactionsType
} from '~/logic/transactions/types'

@Service(tokens.TRANSACTION_API_SERVICE)
export default class TransactionAPIService {
  @Inject(tokens.ETHERSCAN_API_SERVICE)
  public etherscanAPIService!: EtherscanAPIService

  /**
   * Get a list of 'Normal' Transactions By Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getNormalTransactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    return await this.etherscanAPIService.getNormalTransactions({
      address,
      page,
      offset,
      sort
    })
  }

  public getInternalTransactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    return await this.etherscanAPIService.getInternalTransactions({
      address,
      page,
      offset,
      sort
    })
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
    return await this.etherscanAPIService.getERC20Transactions({
      address,
      contractAddress,
      page,
      offset,
      sort
    })
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
    return await this.etherscanAPIService.getERC721Transactions({
      address,
      page,
      offset,
      sort
    })
  }
}
