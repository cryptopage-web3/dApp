import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { INftForm } from '~/types/nft-form';

@Module({
  name: 'nft-form',
  namespaced: true,
  stateFactory: true,
})
export default class NftFormModule extends VuexModule {
  values: INftForm = {
    title: '',
    description: '',
    file: null,
    attributes: {},
  };

  @Mutation
  public setTitle(title: string) {
    this.values.title = title;
  }

  @Mutation
  public setDescription(description: string) {
    this.values.description = description;
  }

  @Mutation
  public setFile(file: File | null) {
    this.values.file = file;
  }
}
