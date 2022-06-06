import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { alertModule } from '.';
import { TokensService } from '~/services';
import { IAddressInfo, IToken } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

type TAddressInfo = IAddressInfo;

const tokensService = new TokensService();

@Module({
  name: 'address',
  namespaced: true,
  stateFactory: true,
})
export default class AddressModule extends VuexModule {
  info: TAddressInfo = {
    address: '',
    chainId: 1,
  };

  tokens: IToken[] = [];

  get address(): string {
    return this.info.address;
  }

  get chainId(): string | number {
    return this.info.chainId;
  }

  get chainSlug(): string {
    return networkHelper.getNetworkSlug(this.chainId);
  }

  get chainName(): string {
    return networkHelper.getNetworkName(this.chainId);
  }

  @Mutation
  public setInfo(info: TAddressInfo) {
    this.info = info;
  }

  @Mutation
  public setTokens(tokens: IToken[]) {
    this.tokens = [...tokens];
  }

  @Action
  public async fetchTokens() {
    try {
      const tokens = await tokensService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
      });

      this.setTokens(tokens);
    } catch {
      alertModule.error('Error getting tokens data');

      this.setTokens([]);
    }
  }
}
