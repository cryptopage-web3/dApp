import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { alertModule } from '.';
import { CollectionsService } from '~/services';
import { ICollection, ICollectionNft } from '~/types';

const collectionsService = new CollectionsService();

@Module({
  name: 'market',
  namespaced: true,
  stateFactory: true,
})
export default class MarketModule extends VuexModule {
  collections: ICollection[] = [];

  lastUpdatedNfts: ICollectionNft[] = [];

  @Mutation
  public setCollections(collections: ICollection[]) {
    this.collections = collections;
  }

  @Mutation
  public setLastUpdatedNfts(lastUpdatedNfts: ICollectionNft[]) {
    this.lastUpdatedNfts = lastUpdatedNfts;
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

  @Action
  public async fetchLastUpdated() {
    try {
      const { data } = await collectionsService.getLastUpdated({
        offset: 0,
        limit: 8,
      });

      this.setLastUpdatedNfts(data);
    } catch {
      alertModule.error('Error getting last updated nfts');

      this.setLastUpdatedNfts([]);
    }
  }
}
