import { AbiItem } from 'web3-utils'
import * as ts from 'io-ts'
import * as tPromise from 'io-ts-promise'
import { Service } from 'vue-typedi'
import { EtherscanABIResponse } from '~/logic/transactions/models'
import { AddressInfoType } from '~/logic/address/types'
import { EthplorerGetAddressInfoResponse } from '~/logic/address/models'
import { APIServiceMixin } from '~/logic/mixins'
import AddressInfoAdapter from '~/logic/address/adapter'
import tokens from '~/logic/tokens'

@Service(tokens.ADDRESS_API_SERVICE)
export default class AddressAPIService extends APIServiceMixin {
  /**
   * Get Contract ABI for Verified Contract Source Codes
   * https://etherscan.io/apidocs#contracts
   */
  public getABI = async (address: string): Promise<AbiItem[]> => {
    const options = { address, module: 'contract', action: 'getabi' }
    const params = new URLSearchParams(options).toString()
    const URL = `${this.baseURL}${params}`
    const response = await this.$axios.get(URL)
    const data = await tPromise.decode(EtherscanABIResponse, response.data)
    return JSON.parse(data.result)
  }

  /**
   * Get address info from Ethpltorer API
   * https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
   */
  public getAddressInfo = async (address: string): Promise<AddressInfoType> => {
    const URL = `${this.ethplorerBaseURL}getAddressInfo/${address}?apiKey=${this.ethplorerApiKey}`
    try {
      const response = await this.$axios.get(URL)
      const data = await tPromise.decode(
        EthplorerGetAddressInfoResponse,
        response.data
      )
      return AddressInfoAdapter(data).request()
    } catch (error) {
      return {
        address,
        tokenInfo: null,
        tokens: [],
        transactionsCount: 0
      }
    }
  }

  /**
   * Get ETH / BNB / MATIC Balance for a Single Address
   * https://docs.bscscan.com/api-endpoints/accounts
   */
  public getBalance = async (address: string): Promise<number> => {
    const options = { address, module: 'address', action: 'balance' }
    const params = new URLSearchParams(options).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    try {
      const response = await this.$axios.get(URL)

      const data = await tPromise.decode(
        ts.type({
          status: ts.string,
          message: ts.string,
          result: ts.string
        }),
        response.data
      )
      return Number(data.result)
    } catch {
      return 0
    }
  }

  /**
   * Returns the number of transactions performed by an address.
   * https://docs.bscscan.com/api-endpoints/geth-parity-proxy
   */
  public getTransactionsCount = async (address: string): Promise<number> => {
    const options = {
      address,
      module: 'proxy',
      action: 'eth_getTransactionCount'
    }
    const params = new URLSearchParams(options).toString()
    const URL = `${this.baseURL}${params}&apikey=${this.APIKey}`
    try {
      const response = await this.$axios.get(URL)
      const data = await tPromise.decode(
        ts.type({
          jsonrpc: ts.string,
          id: ts.number,
          result: ts.string
        }),
        response.data
      )
      return parseInt(data.result, 10)
    } catch {
      return 0
    }
  }
}
