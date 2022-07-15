import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { alertModule } from '.';
import { CollectionsService } from '~/services';
import { ICollection } from '~/types';

const collectionsService = new CollectionsService();

@Module({
  name: 'market',
  namespaced: true,
  stateFactory: true,
})
export default class MarketModule extends VuexModule {
  collections: ICollection[] = [];

  @Mutation
  public setCollections(collections: ICollection[]) {
    this.collections = collections;
  }

  @Action
  public async fetchCollections(search = '') {
    try {
      const { data } = await collectionsService.getList({
        offset: 0,
        limit: 10,
        filter: {
          name: `${search}%`,
        },
      });

      this.setCollections(data);
    } catch {
      alertModule.error('Error getting collections');

      this.setCollections([]);
    }
  }
}
