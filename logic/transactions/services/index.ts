import { Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import TokenService from '~/logic/tokens/services'
import NFTService from '~/logic/nft/services'
import TransactionAPIService from '~/logic/transactions/services/api'
import TransactionWeb3Service from '~/logic/transactions/services/web3'
import TransactionAdapter from '~/logic/transactions/adapter'
import {
  EServiceType,
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

  @Inject(tokens.TRANSACTION_WEB3_SERVICE)
  public transactionWeb3Service!: TransactionWeb3Service

  private getServiceByType(
    type: string
  ): TransactionAPIService | TransactionWeb3Service {
    if (type === 'api') {
      return this.transactionAPIService
    } else if (type === 'web3') {
      return this.transactionWeb3Service
    }
    // Fallback service
    return this.transactionAPIService
  }

  private getMethodByType(
    type: ETransactionStoreType
    // params: ParamsTransactionsType
  ): (params: ParamsTransactionsType) => Promise<TransactionType[]> {
    // Promise<TransactionType[]> {
    if (type === ETransactionStoreType.all) {
      return async (
        params: ParamsTransactionsType
      ): Promise<TransactionType[]> => {
        const [normalTransactions, ERC20Transactions, ERC721Transactions] =
          await Promise.all([
            await this.getNormalTransactions(params),
            await this.getERC20Transactions(params),
            await this.getERC721Transactions(params)
          ])
        return [
          ...normalTransactions,
          ...ERC20Transactions,
          ...ERC721Transactions
        ]
        // return method
      }
    } else if (type === ETransactionStoreType.normal) {
      return this.getNormalTransactions
    } else if (type === ETransactionStoreType.internal) {
      return this.getInternalTransactions
    } else if (type === ETransactionStoreType.erc20) {
      return this.getERC20Transactions
    } else if (type === ETransactionStoreType.erc721) {
      return this.getERC721Transactions
    }
    // Fallback method
    return this.getNormalTransactions
  }

  public getTransactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    console.log('params in getTransactions', params)
    let transactions: TransactionType[] = []
    const transactionType = params.transactionType
      ? params.transactionType
      : ETransactionStoreType.all
    console.log('transactionType!!', transactionType)
    const method = this.getMethodByType(transactionType)
    console.log('method !!!', method)
    transactions = await method(params)
    console.log('transactions', transactions)
    /*
    if (transactionType === ETransactionStoreType.all) {
      const [normalTransactions, ERC20Transactions, ERC721Transactions] =
        Promise.all([
          this.getNormalTransactions(params),
          this.getERC20Transactions(params),
          this.getERC721Transactions(params)
        ])
      transactions = [
        ...normalTransactions,
        ...ERC20Transactions,
        ...ERC721Transactions
      ]
    } else if (transactionType === ETransactionStoreType.normal) {
      transactions = await Promise.all(await this.getNormalTransactions(params))
    } else if (transactionType === ETransactionStoreType.erc20) {
      transactions = await Promise.all(await this.getERC20Transactions(params))
    } else if (transactionType === ETransactionStoreType.erc721) {
      transactions = await Promise.all(await this.getERC721Transactions(params))
    }
    */
    /*
    if (params.serviceTypes?.includes(ServiceType.all)) {
        const [normalTransactions, ERC20Transactions, ERC721Transactions] =
        await Promise.all([
          await this.getNormalTransactions(params),
          await this.getERC20Transactions(params),
          await this.getERC721Transactions(params)
        ])
        transactions = [
          ...normalTransactions,
          ...ERC20Transactions,
          ...ERC721Transactions
        ]
      // typedTransactiins = [normalTransactions, ERC20Transactions, ERC721Transactions]
    } else if (params.serviceTypes?.includes(ServiceType.)) {
      
    }
    // type = 'all' || 'normal' || 'erc20' || 'erc721'
    // sort = 'desc' || 'asc'
    // sortType = 'timestampt' || 'value'
    // servicesTypes = ['api', 'web3']
    
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
    */
    // const timestamp = ParamsTransactionsType.sortField.timestamp
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
    console.log('params in NormalTransactions', params)
    let transactions: TransactionType[] = []
    const serviceTypes = params.serviceTypes
      ? params.serviceTypes
      : [EServiceType.api]
    const service = this.getServiceByType(serviceTypes[0])
    console.log('service', service)
    transactions = await service.getNormalTransactions(params)
    /*
    if (serviceTypes.includes(EServiceType.api)) {
      transactions = await this.transactionAPIService.getNormalTransactions(
        params
      )
    } else if (params.serviceTypes.includes(EServiceType.all)) {
      const [APITransactions] = await Promise.all([
        await this.transactionAPIService.getNormalTransactions(params)
      ])
      transactions = [...APITransactions]
    }
    */
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

  public getInternalTransactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    let transactions: TransactionType[] = []
    const serviceTypes = params.serviceTypes
      ? params.serviceTypes
      : [EServiceType.api]
    const service = this.getServiceByType(serviceTypes[0])
    transactions = await service.getInternalTransactions(params)
    /*
    if (
      !params.serviceTypes ||
      params.serviceTypes.includes(EServiceType.api)
    ) {
      transactions = await this.transactionAPIService.getInternalTransactions(
        params
      )
    } else if (params.serviceTypes.includes(EServiceType.all)) {
      const [APITransactions] = await Promise.all([
        await this.transactionAPIService.getInternalTransactions(params)
      ])
      transactions = [...APITransactions]
    }
    */
    return transactions
  }

  /**
   * Get a list of "ERC20 - Token Transfer Events" by Address from Etherscan API
   * https://etherscan.io/apidocs#accounts
   */
  public getERC20Transactions = async (
    params: ParamsTransactionsType
  ): Promise<TransactionType[]> => {
    let transactions: TransactionType[] = []
    const serviceTypes = params.serviceTypes
      ? params.serviceTypes
      : [EServiceType.api]
    const service = this.getServiceByType(serviceTypes[0])
    transactions = await service.getERC20Transactions(params)
    /*
    if (
      !params.serviceTypes ||
      params.serviceTypes.includes(EServiceType.api)
    ) {
      transactions = await this.transactionAPIService.getERC20Transactions(
        params
      )
    } else if (params.serviceTypes.includes(EServiceType.all)) {
      const [APITransactions] = await Promise.all([
        await this.transactionAPIService.getERC20Transactions(params)
      ])
      transactions = [...APITransactions]
    }
    */
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
    let transactions: TransactionType[] = []
    const serviceTypes = params.serviceTypes
      ? params.serviceTypes
      : [EServiceType.api]
    const service = this.getServiceByType(serviceTypes[0])
    transactions = await service.getERC721Transactions(params)
    /*    
    if (
      !params.serviceTypes ||
      params.serviceTypes.includes(EServiceType.api)
    ) {
      transactions = await this.transactionAPIService.getERC721Transactions(
        params
      )
      // transactions = [...APITransactions]
    } else if (params.serviceTypes.includes(EServiceType.all)) {
      const [APITransactions] = await Promise.all([
        await this.transactionAPIService.getERC721Transactions(params)
      ])
      transactions = [...APITransactions]
    }
    */
    // const transactions = await this.transactionAPIService.getERC721Transactions(
    // params
    // )
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
