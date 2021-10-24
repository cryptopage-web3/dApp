import Web3 from 'web3'
import { Container, Service, Inject } from 'vue-typedi'
import tokens from '~/logic/tokens'
import {
  TokenInfoType,
  TokenBalanceType,
  AddressInfoType
} from '~/logic/address/types'
import AddressIPFSService from '~/logic/address/services/ipfs'
import AddressWEB3Service from '~/logic/address/services/web3'
import AddressAPIService from '~/logic/address/services/api'
import TokenAPIService from '~/logic/tokens/services/api'

@Service(tokens.ADDRESS_SERVICE)
export default class AddressService {
  @Inject(tokens.ADDRESS_IPFS_SERVICE)
  public addressIPFSService!: AddressIPFSService

  @Inject(tokens.ADDRESS_WEB3_SERVICE)
  public addressWEB3Service!: AddressWEB3Service

  @Inject(tokens.ADDRESS_API_SERVICE)
  public addressAPIService!: AddressAPIService

  @Inject(tokens.TOKEN_API_SERVICE)
  public tokenAPIService!: TokenAPIService

  private CACHE: { [address: string]: TokenInfoType | null } = {}

  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  private cached = (address: string): boolean => address in this.CACHE

  private cacheGet = (address: string): TokenInfoType | null => {
    return this.cached(address) ? this.CACHE[address] : null
  }

  private cacheSet = (address: string, value: TokenInfoType | null): void => {
    this.CACHE[address] = value
  }

  public getTokenInfo = async (
    address: string
  ): Promise<TokenInfoType | null> => {
    if (this.cached(address)) return this.cacheGet(address)
    let tokenInfo = await this.addressIPFSService.getTokenInfo(address)
    if (!tokenInfo) {
      tokenInfo = await this.addressWEB3Service.getTokenInfo(address)
    }
    this.cacheSet(address, tokenInfo)
    return tokenInfo
  }

  public getTokens = async (address: string): Promise<TokenBalanceType[]> => {
    let tokens = await this.tokenAPIService.getTokens(address)
    if (tokens.length === 0) {
      const ethToken = await this.addressWEB3Service.getETHToken(address)
      tokens = [ethToken]
    }
    return tokens
  }

  public getTransactionsCount = async (address: string): Promise<number> =>
    await this.addressWEB3Service.getTransactionsCount(address)

  public getAddressInfo = async (address: string): Promise<AddressInfoType> => {
    const tokenInfo = await this.getTokenInfo(address)
    const tokens = await this.tokenAPIService.getTokens(address)
    const transactionsCount =
      await this.addressWEB3Service.getTransactionsCount(address)
    return {
      address,
      tokens,
      tokenInfo,
      transactionsCount
    }
  }
}
