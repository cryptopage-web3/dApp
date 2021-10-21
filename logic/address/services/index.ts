import Web3 from 'web3'
import { Container, Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import { TokenInfoType, AddressInfoType } from '~/logic/address/types'
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
  public addressAPIService!: AddressAPIService

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
    let tokenInfo = this.cacheGet(address)
    if (!tokenInfo) {
      tokenInfo = await this.addressIPFSService.getTokenInfo(address)
    }
    if (!tokenInfo) {
      tokenInfo = await this.addressWEB3Service.getTokenInfo(address)
    }
    this.cacheSet(address, tokenInfo)
    return tokenInfo
  }

  public getAddressInfo = async (address: string): Promise<AddressInfoType> => {
    const addressInfo = await this.addressAPIService.getAddressInfo(address)
    if (!addressInfo.tokenInfo) {
      addressInfo.tokenInfo = await this.getTokenInfo(address)
    }
    if (addressInfo.tokens.length === 0) {
      const balance = await this.addressWEB3Service.getBalance(address)
      addressInfo.tokens = [
        {
          balance: balance / 10 ** 18,
          usdBalance: 0,
          rate: 0,
          diff: 0,
          tokenInfo: {
            address,
            symbol: 'ETH',
            name: 'Ethereum',
            decimals: 18,
            image:
              'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbitinfocharts.com%2Fimgs33%2Fethereum.png'
          }
        }
      ]
    }
    if (!addressInfo.transactionsCount) {
      addressInfo.transactionsCount =
        await this.addressWEB3Service.getTransactionsCount(address)
    }
    return addressInfo
  }
}
