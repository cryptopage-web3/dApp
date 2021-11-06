import { Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import TokenService from '~/logic/tokens/services'
import NFTService from '~/logic/nft/services'
import TransactionAPIService from '~/logic/transactions/services/api'
import TransactionAdapter from '~/logic/transactions/adapter'
import {
  TransactionType,
  ParamsTransactionsType
} from '~/logic/transactions/types'

@Service(tokens.TRANSACTION_SERVICE)
export default class TransactionService {
  @Inject(tokens.TOKEN_SERVICE)
  public tokenService!: TokenService

  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  @Inject(tokens.TRANSACTION_API_SERVICE)
  public transactionAPIService!: TransactionAPIService

  public getTransactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    const [normalTransactions, ERC20Transactions, ERC721Transactions] =
      await Promise.all([
        await this.getNormalTransactions(params),
        await this.getERC20Transactions(params),
        await this.getERC721Transactions(params)
      ])
    const transactions = [
      ...normalTransactions,
      ...ERC20Transactions,
      ...ERC721Transactions
    ]
    return transactions.sort((a, b) =>
      Number(a.timeStamp) > Number(b.timeStamp) ? -1 : 1
    )
  }

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
    const transactions = await this.transactionAPIService.getNormalTransactions(
      {
        address,
        page,
        offset,
        sort
      }
    )
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

  public getInternalTransactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    return await this.transactionAPIService.getInternalTransactions({
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
    const transactions = await this.transactionAPIService.getERC20Transactions({
      address,
      contractAddress,
      page,
      offset,
      sort
    })
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
  public getERC721Transactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    const transactions = await this.transactionAPIService.getERC721Transactions(
      {
        address,
        page,
        offset,
        sort
      }
    )
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
}
