import { Inject, Injectable } from 'vue-typedi'
import { Action, Mutation, State, Getter } from 'vuex-simple'
import AuthService from '~/logic/auth/service'
import { AuthServiceSigninResponseType } from '~/logic/auth/types'
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

  @Inject(tokens.AUTH_SERVICE)
  public authService!: AuthService

  // State

  @State()
  public authenticated = false

  // Getters

  @Getter()
  public get selectedAddress(): string {
    return this.authService.selectedAddress
  }

  @Getter()
  public get chainId(): number {
    return this.authService.selectedChainId
  }

  @Getter()
  public get selectedNetworkName(): string {
    return this.authService.selectedNetworkName
  }

  @Getter()
  public get selectedNetworkSlug(): string {
    return this.authService.selectedNetworkSlug
  }

  @Getter()
  public get selectedNetworkType(): string {
    return this.authService.selectedNetworkType
  }

  @Getter()
  public get selectedProviderName(): string {
    return this.authService.selectedProviderName
  }

  @Getter()
  public get isAuth(): boolean {
    return this.selectedAddress ? this.authenticated : false
  }

  // Mutations

  @Mutation()
  public setIsAuth(isAuth: boolean): void {
    this.authenticated = isAuth
  }

  // Actions

  @Action()
  public signin = async (): Promise<AuthServiceSigninResponseType> => {
    const response = await this.authService.signin()
    if (response.status === 'success') {
      this.setIsAuth(true)
    }
    return response
  }

  @Action()
  public signout(): void {
    this.setIsAuth(false)
  }

  @Action()
  public async switchProvider(providerName: string): Promise<void> {
    await this.authService.switchProvider(providerName)
  }

  @Action()
  public async switchChain(type: string): Promise<void> {
    await this.authService.switchChain(type)
  }

  @Action()
  public async setChainId(chainId: number): Promise<void> {
    await this.authService.setOrChangeWeb3Data(this.selectedAddress, chainId)
  }
}
