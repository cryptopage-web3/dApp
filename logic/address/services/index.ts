import Web3 from 'web3'
import { Container, Service, Inject } from 'vue-typedi'
import { AddressInfoType } from '~/logic/address/types'
import AddressWEB3Service from '~/logic/address/services/web3'
import AddressAPIService from '~/logic/address/services/api'
import TokenService from '~/logic/tokens/services'
import tokens from '~/logic/tokens'

@Service(tokens.ADDRESS_SERVICE)
export default class AddressService {
  // @Inject(tokens.ADDRESS_IPFS_SERVICE)
  // public addressIPFSService!: AddressIPFSService

  @Inject(tokens.ADDRESS_WEB3_SERVICE)
  public addressWEB3Service!: AddressWEB3Service

  @Inject(tokens.ADDRESS_API_SERVICE)
  public addressAPIService!: AddressAPIService

  @Inject(tokens.TOKEN_SERVICE)
  public tokenService!: TokenService

  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  public getBalance = async (address: string): Promise<number> => {
    let balance = 0
    balance = await this.addressWEB3Service.getBalance(address)
    /*
    Sometimes addressAPIService.getBalance returns Nan
    Need to fix it
    if (!balance) {
      balance = await this.addressAPIService.getBalance(address)
    }
    */
    return balance
  }

  public getTransactionsCount = async (address: string): Promise<number> => {
    let transactionsCount = await this.addressWEB3Service.getTransactionsCount(
      address
    )
    if (!transactionsCount) {
      transactionsCount = await this.addressAPIService.getTransactionsCount(
        address
      )
    }
    return transactionsCount
  }

  public getAddressInfo = async (address: string): Promise<AddressInfoType> => {
    const tokenInfo = await this.tokenService.getTokenInfo(address)
    const tokenBalances = await this.tokenService.getTokenBalances(address)
    const transactionsCount = await this.getTransactionsCount(address)
    return {
      address,
      tokens: tokenBalances,
      tokenInfo,
      transactionsCount
    }
  }
}
