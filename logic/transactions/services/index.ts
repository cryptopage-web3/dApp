import { AxiosInstance, AxiosResponse } from 'axios'
import * as tPromise from 'io-ts-promise'
import { Service, Container } from 'vue-typedi'
import { web3 } from '~/plugins/web3'
import NFTService from '~/logic/nft/services'
import { NFTType } from '~/logic/nft/types'
import {
  TransferType,
  TokenInfoType,
  TransactionType,
  ParamsAddressType,
  ParamsTransactionsType
} from '~/logic/transactions/types'
import {
  EtherscanTransactionType,
  EtherscanInternalTransactionType,
  EtherscanERC20TransactionType,
  EtherscanERC721TransactionType,
  EtherscanStringResponse,
  EtherscanTransactionsResponse,
  EtherscanTransactionsResponseType,
  EtherscanInternalTransactionsResponse,
  EtherscanInternalTransactionsResponseType,
  EtherscanERC20TransactionsResponse,
  EtherscanERC20TransactionsResponseType,
  EtherscanERC721TransactionsResponse,
  EtherscanERC721TransactionsResponseType
} from '~/logic/transactions/models'
import tokens from '~/logic/tokens'

class TransactionParser {
  private parseTransactionBody(
    transaction:
      | EtherscanTransactionType
      | EtherscanERC20TransactionType
      | EtherscanERC721TransactionType
  ): TransactionType {
    return {
      gas: transaction.gas,
      hash: transaction.hash,
      input: transaction.input,
      nonce: transaction.nonce,
      value: typeof transaction.value === 'string' ? transaction.value : '',
      blockHash: transaction.blockHash,
      blockNumber: transaction.blockNumber,
      confirmations: transaction.confirmations,
      cumulativeGasUsed: transaction.cumulativeGasUsed,
      from: transaction.from,
      gasPrice: transaction.gasPrice,
      gasUsed: transaction.gasUsed,
      timeStamp: transaction.timeStamp,
      to: transaction.to,
      nft: undefined
    }
  }

  private parseTokenInfo(
    transaction: EtherscanERC20TransactionType | EtherscanERC721TransactionType
  ): TokenInfoType {
    return {
      tokenDecimal: transaction.tokenDecimal,
      tokenName: transaction.tokenName,
      tokenSymbol: transaction.tokenSymbol
    }
  }

  private parseTransfer(
    tx: EtherscanTransactionType
  ): TransferType | undefined {
    if (tx.input.length === 138 || tx.input.slice(2, 10) === 'a9059cbb') {
      return {
        receiver: web3.utils.toChecksumAddress(
          '0x' + tx.input.slice(34, 74).toString()
        ),
        amount: web3.utils
          .toBN('0x' + tx.input.slice(74).toString())
          .toString(),
        contractAddress: web3.utils.toChecksumAddress(tx.to),
        sender: web3.utils.toChecksumAddress(tx.from)
      }
    }
    return undefined
  }

  public parse(
    transaction:
      | EtherscanTransactionType
      | EtherscanERC20TransactionType
      | EtherscanERC721TransactionType
  ): TransactionType {
    const transactionBody = this.parseTransactionBody(transaction)
    if ('tokenSymbol' in transaction || 'tokenID' in transaction) {
      transactionBody.tokenInfo = this.parseTokenInfo(transaction)
    }
    if (transaction.input.startsWith('0x')) {
      transactionBody.transfer = this.parseTransfer(transaction)
    }
    return transactionBody
  }
}

const TransactionAdapter = (
  transaction:
    | EtherscanTransactionType
    | EtherscanERC20TransactionType
    | EtherscanERC721TransactionType
) => {
  return {
    request: (nft?: NFTType): TransactionType => {
      const parser = new TransactionParser()
      const data = parser.parse(transaction)
      data.nft = nft
      return data
    }
  }
}

@Service(tokens.TRANSACTION_SERVICE)
export default class TransactionService {
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

  protected get NFTService(): NFTService {
    return Container.get(tokens.NFT_SERVICE) as NFTService
  }

  private getBaseURL = (APIServiceName: string): string => {
    if (APIServiceName === 'etherscan') {
      const network = this.network === 'mainnet' ? '' : `-${this.network}`
      return `https://api${network}.etherscan.io/api?`
    } else {
      const network = this.network === 'mainnet' ? '' : `${this.network}-`
      return `https://${network}api.ethplorer.io/`
    }
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
    const baseURL = this.getBaseURL('etherscan')
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'txlist'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}&apikey=${this.etherscanAPIKey}`
    const response: AxiosResponse<EtherscanTransactionsResponseType> =
      await this.$axios.get(URL)
    const data = await tPromise.decode(
      EtherscanTransactionsResponse,
      response.data
    )
    return data.result.map(
      (transaction: EtherscanTransactionType): TransactionType => {
        const adapter = TransactionAdapter(transaction)
        return adapter.request()
      }
    )
  }

  public getInternalTransactions = async ({
    address,
    page = 1,
    offset = 10,
    sort = 'desc'
  }: ParamsTransactionsType): Promise<TransactionType[]> => {
    const baseURL = this.getBaseURL('etherscan')
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'txlistinternal'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}&apikey=${this.etherscanAPIKey}`
    const response: AxiosResponse<EtherscanInternalTransactionsResponseType> =
      await this.$axios.get(URL)
    const data = await tPromise.decode(
      EtherscanInternalTransactionsResponse,
      response.data
    )
    return data.result.map(
      (transaction: EtherscanInternalTransactionType): TransactionType => {
        const adapter = TransactionAdapter(transaction)
        return adapter.request()
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
    const baseURL = this.getBaseURL('etherscan')
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'tokentx'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}&apikey=${this.etherscanAPIKey}`
    const response: AxiosResponse<EtherscanERC20TransactionsResponseType> =
      await this.$axios.get(URL)
    const data = await tPromise.decode(
      EtherscanERC20TransactionsResponse,
      response.data
    )
    return data.result.map(
      (transaction: EtherscanERC20TransactionType): TransactionType => {
        const adapter = TransactionAdapter(transaction)
        return adapter.request()
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
    const baseURL = this.getBaseURL('etherscan')
    const options = {
      address,
      page: `${page}`,
      offset: `${offset}`,
      sort,
      module: 'account',
      action: 'tokennfttx'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}&apikey=${this.etherscanAPIKey}`
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
          const nft: NFTType = await this.NFTService.fetchOne({
            tokenId: transaction.tokenID,
            contractAddress: transaction.contractAddress
          })
          return adapter.request(nft)
        }
      )
    )
  }

  /**
   * Get Contract ABI for Verified Contract Source Codes
   * https://etherscan.io/apidocs#contracts
   */
  public getABI = async ({ address }: ParamsAddressType): Promise<string> => {
    const baseURL = this.getBaseURL('etherscan')
    const options = { address, module: 'contract', action: 'getabi' }
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}`
    const response = await this.$axios.get(URL)
    const data = await tPromise.decode(EtherscanStringResponse, response.data)
    return data.result
  }

  /**
   * Get address info from Ethpltorer API
   * https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
   */
  public getAddressInfo = async ({ address }: ParamsAddressType) => {
    const baseURL = this.getBaseURL('etherscan')
    const URL = `${baseURL}getAddressInfo/${address}?apiKey=freekey`
    const response = await this.$axios.get(URL)
    return response.data
  }
}
