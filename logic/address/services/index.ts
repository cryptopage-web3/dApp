import Web3 from 'web3'
import { Container, Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import { TokenInfoType } from '~/logic/address/types'
import AddressIPFSService from '~/logic/address/services/ipfs'
import AddressWEB3Service from '~/logic/address/services/web3'
import AddressAPIService from '~/logic/address/services/api'

@Service(tokens.ADDRESS_SERVICE)
export default class AddressService {
  @Inject(tokens.ADDRESS_IPFS_SERVICE)
  public addressIPFSService!: AddressIPFSService

  @Inject(tokens.ADDRESS_WEB3_SERVICE)
  public addressWEB3Service!: AddressWEB3Service

  @Inject(tokens.ADDRESS_API_SERVICE)
  public addressAPI3Service!: AddressAPIService

  private CACHE: { [address: string]: TokenInfoType | null } = {}

  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  private cacheGet = (address: string): TokenInfoType | null => {
    return address in this.CACHE ? this.CACHE[address] : null
  }

  private cacheSet = (address: string, value: TokenInfoType | null): void => {
    this.CACHE[address] = value
  }

  public getTokenInfo = async (
    address: string
  ): Promise<TokenInfoType | null> => {
    const code = await this.$web3.eth.getCode(address)
    if (code !== '0x') {
      let tokenInfo = this.cacheGet(address)
      if (!tokenInfo) {
        tokenInfo = await this.addressIPFSService.getTokenInfo(address)
      }
      if (!tokenInfo) {
        tokenInfo = await this.addressWEB3Service.getTokenInfo(address)
      }
      this.cacheSet(address, tokenInfo)
      return tokenInfo
    } else {
      this.cacheSet(address, null)
      return null
    }
  }
}
