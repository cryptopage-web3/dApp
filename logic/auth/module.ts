import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import AddressAPIService from '~/logic/address/services/api'
import {
  EthplorerTokenType,
  EthplorerGetAddressInfoResponseType
} from '~/logic/address/types'
import tokens from '~/logic/tokens'

@Injectable()
/**
 * Represents a typed Vuex module.
 *
 * @see https://vuex.vuejs.org/guide/modules.html
 * @see https://github.com/sascha245/vuex-simple
 */
export default class AuthModule {
  // Dependencies

  @Inject(tokens.ADDRESS_API_SERVICE)
  public addressAPIService!: AddressAPIService

  // State

  @State()
  public address = ''

  @State()
  public chain = ''

  @State()
  public loggedIn = false

  @State()
  public addressInfo: EthplorerGetAddressInfoResponseType | undefined

  // Getters

  @Getter()
  public get selectedAddress(): string {
    return this.address
  }

  @Getter()
  public get chainId(): string {
    return this.chain
  }

  @Getter()
  public get isAuth(): boolean {
    return this.loggedIn
  }

  @Getter()
  public get balance(): number {
    if (this.addressInfo) {
      return this.addressInfo.ETH.balance
    }
    return 0
  }

  @Getter()
  public get price(): number {
    if (this.addressInfo) {
      return this.addressInfo.ETH.price.rate
    }
    return 3500
  }

  @Getter()
  public get count(): number {
    if (this.addressInfo) {
      return this.addressInfo.countTxs
    }
    return 0
  }

  @Getter()
  public get tokens(): EthplorerTokenType[] {
    let tokens: EthplorerTokenType[] = []
    if (this.addressInfo && 'tokens' in this.addressInfo) {
      tokens = this.addressInfo.tokens || []
    }
    return tokens.sort((a, b) => (a.balance > b.balance ? -1 : 1))
  }

  // Mutations

  @Mutation()
  public setSelectedAddress(selectedAddress: string): void {
    this.address = selectedAddress
  }

  @Mutation()
  public popSelectedAddress(): void {
    this.address = ''
  }

  @Mutation()
  public setIsAuth(isAuth: boolean): void {
    this.loggedIn = isAuth
  }

  @Mutation()
  public setChainId(chainId: string): void {
    this.chain = chainId
  }

  @Mutation()
  public popChainId(): void {
    this.chain = ''
  }

  @Mutation()
  public setAddressInfo(
    addressInfo: EthplorerGetAddressInfoResponseType
  ): void {
    this.addressInfo = addressInfo
  }

  // Actions

  @Action()
  public signin(address: string): void {
    this.setSelectedAddress(address)
    this.setIsAuth(true)
  }

  @Action()
  public signout(): void {
    this.popSelectedAddress()
    this.setIsAuth(false)
  }

  @Action()
  public async updateAddressInfo(): Promise<void> {
    const addressInfo = await this.addressAPIService.getAddressInfo(
      this.address
    )
    this.setAddressInfo(addressInfo)
  }
}
