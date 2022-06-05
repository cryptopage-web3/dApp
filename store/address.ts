import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { IAddressInfo } from '~/types';
import { networkHelper } from '~/utils/networkHelper';

type TAddressInfo = IAddressInfo;

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
}
