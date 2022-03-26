import { Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import TokenService from '~/logic/tokens/services'
import NFTService from '~/logic/nft/services'
import TransactionAPIService from '~/logic/transactions/services/api'
import TransactionAdapter from '~/logic/transactions/adapter'
import {
  ESortFieldType,
  TransactionType,
  ETransactionStoreType,
  ParamsTransactionsType
} from '~/logic/transactions/types'
// import { EtherscanABIResponse } from '~/logic/services/api/etherscan/models'

@Service(tokens.TRANSACTION_SERVICE)
export default class TransactionService {
  @Inject(tokens.TOKEN_SERVICE)
  public tokenService!: TokenService

  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  @Inject(tokens.TRANSACTION_API_SERVICE)
  public transactionAPIService!: TransactionAPIService

  private getMethodByType(
    type: ETransactionStoreType
  ): (params: ParamsTransactionsType) => Promise<TransactionType[]> {
    /** Метод normal */

    if (type === ETransactionStoreType.normal) {
      return this.getNormalTransactions
    }

    /** Метод erc20 */

    if (type === ETransactionStoreType.erc20) {
      return this.getERC20Transactions
    }

    /** Метод erc721 */

    if (type === ETransactionStoreType.erc721) {
      return this.getERC721Transactions
    }

    /** По умолчанию */

    return this.getNormalTransactions
  }

  public getTransactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    const transactionType =
      params.transactionType || ETransactionStoreType.normal
    const method = this.getMethodByType(transactionType)

    const transactions: TransactionType[] = await method(params)

    if (params.sort) {
      if (!params.sortField || params.sortField === ESortFieldType.timestamp) {
        return transactions.sort((a, b) =>
          Number(a.timeStamp) > Number(b.timeStamp) ? -1 : 1
        )
      }
    }

    return transactions
  }

  /**
   * Get a list of 'Normal' Transactions By Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getNormalTransactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    const transactions: TransactionType[] =
      await this.transactionAPIService.getNormalTransactions(params)

    return await Promise.all(
      transactions.map(
        async (transaction: TransactionType): Promise<TransactionType> => {
          const adapter = new TransactionAdapter(transaction)
          const token = await this.tokenService.getTokenInfo(transaction.to)
          return adapter.request({ token })
        }
      )
    )
  }

  /**
   * Get a list of "ERC20 - Token Transfer Events" by Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getERC20Transactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    const transactions: TransactionType[] =
      await this.transactionAPIService.getERC20Transactions(params)

    return await Promise.all(
      transactions.map(
        async (transaction: TransactionType): Promise<TransactionType> => {
          const adapter = new TransactionAdapter(transaction)
          return await adapter.request({})
        }
      )
    )
  }

  /**
   * Get a list of "ERC721 - Token Transfer Events" by Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getERC721Transactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    const transactions: TransactionType[] =
      await this.transactionAPIService.getERC721Transactions(params)

    return await Promise.all(
      transactions.map(
        async (transaction: TransactionType): Promise<TransactionType> => {
          const adapter = new TransactionAdapter(transaction)

          if (transaction.token && transaction.token.id) {
            const nft = await this.nftService.fetchOne({
              tokenId: String(transaction.token.id),
              contractAddress: transaction.token.address
            })
            transaction = adapter.request({ nft })
          }

          transaction = adapter.request({})

          return transaction
        }
      )
    )
  }

  /** refresh NFT data */
  public refreshERC721Transaction = async (
    transaction: TransactionType
  ): Promise<TransactionType> => {
    const actualTransaction = { ...transaction }

    if (!actualTransaction?.token?.id) {
      return actualTransaction
    }

    const adapter = new TransactionAdapter(actualTransaction)

    const nft = await this.nftService.fetchOne({
      tokenId: String(actualTransaction.token.id),
      contractAddress: actualTransaction.token.address
    })

    return adapter.request({ nft })
  }
}
