import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { alertModule } from '.';
import { NftService, TokensService } from '~/services';
import { IAddressInfo, INft, IToken } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

type TAddressInfo = IAddressInfo;

const tokensService = new TokensService();
const nftService = new NftService();

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
  nfts: INft[] = [];

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

  @Mutation
  public setNfts(nfts: INft[]) {
    this.nfts = [...nfts];
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

  @Action
  public async fetchNfts() {
    try {
      const nfts = await nftService.getList({
        chainSlug: this.chainSlug,
        address: this.address,
      });

      this.setNfts(nfts);
    } catch {
      alertModule.error('Error getting nfts data');

      this.setNfts([]);
    }
  }
}
