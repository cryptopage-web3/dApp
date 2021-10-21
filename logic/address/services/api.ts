import { AbiItem } from 'web3-utils'
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
}
