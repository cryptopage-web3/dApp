import { AbiItem } from 'web3-utils'
import { AxiosInstance } from 'axios'
import * as tPromise from 'io-ts-promise'
import { Service, Container } from 'vue-typedi'
import tokens from '~/logic/tokens'
import { EtherscanABIResponse } from '~/logic/transactions/models'
import { EthplorerGetAddressInfoResponseType } from '~/logic/address/types'
import { EthplorerGetAddressInfoResponse } from '~/logic/address/models'

@Service(tokens.ADDRESS_API_SERVICE)
export default class AddressAPIService {
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
   * Get Contract ABI for Verified Contract Source Codes
   * https://etherscan.io/apidocs#contracts
   */
  public getABI = async (address: string): Promise<AbiItem[]> => {
    const baseURL = this.getBaseURL('etherscan')
    const options = { address, module: 'contract', action: 'getabi' }
    const params = new URLSearchParams(options).toString()
    const URL = `${baseURL}${params}`
    const response = await this.$axios.get(URL)
    const data = await tPromise.decode(EtherscanABIResponse, response.data)
    return JSON.parse(data.result)
  }

  /**
   * Get address info from Ethpltorer API
   * https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
   */
  public getAddressInfo = async (
    address: string
  ): Promise<EthplorerGetAddressInfoResponseType> => {
    const baseURL = this.getBaseURL('ethplorer')
    const URL = `${baseURL}getAddressInfo/${address}?apiKey=freekey`
    const response = await this.$axios.get(URL)
    return await tPromise.decode(EthplorerGetAddressInfoResponse, response.data)
  }
}
