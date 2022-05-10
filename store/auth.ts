import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { EChainType, EMainChain, IConnectAuthStore } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true,
})
export default class AuthModule extends VuexModule {
  isAuth = false;

  connect: IConnectAuthStore = {
    address: '',
    chainId: 1,
    provider: '',
  };

  get address(): string {
    return this.connect.address;
  }

  get chainId(): string | number {
    return this.connect.chainId;
  }

  get networkName(): string {
    return networkHelper.getNetworkName(this.chainId);
  }

  get networkSlug(): string {
    return networkHelper.getNetworkSlug(this.chainId);
  }

  get networkType(): EChainType {
    return networkHelper.getNetworkType(this.chainId);
  }

  get providerName(): string {
    return this.connect.provider;
  }

  @Mutation
  public setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  @Mutation
  public setChainId(chainId: string | number) {
    this.connect.chainId = chainId;
  }

  @Action
  public selectMainChain(chain: EMainChain) {
    const data = networkHelper.getChainData(chain);

    this.setChainId(
      [EMainChain.tron, EMainChain.solana].includes(chain)
        ? data.chainId
        : Number(data.chainId),
    );
  }
}
