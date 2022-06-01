import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { IAddressInfo } from '~/types';

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

  @Mutation
  public setInfo(info: TAddressInfo) {
    this.info = info;
  }
}
