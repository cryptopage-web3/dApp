import { Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'

@Injectable()
/**
 * Represents a typed Vuex module.
 *
 * @see https://vuex.vuejs.org/guide/modules.html
 * @see https://github.com/sascha245/vuex-simple
 */
export default class AuthModule {
  // Dependencies

  // State

  @State()
  public address = ''

  @State()
  public chain = ''

  @State()
  public loggedIn = false

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
}
