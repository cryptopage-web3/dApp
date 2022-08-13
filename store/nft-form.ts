import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import {
  IAttributeLevel,
  IAttributeProperty,
  IAttributeStat,
  INftForm,
} from '~/types/nft-form';

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
    externalLink: '',
    isCommentsEnable: false,
    attributes: {
      properties: [],
      levels: [],
      stats: [],
      dates: [],
      boosts: [],
    },
    isUnlockableContent: false,
    unlockableText: '',
    isExplicit: false,
    supply: '1',
    chain: '',
  };

  get isValid(): boolean {
    const { title, file } = this.values;

    return Boolean(title && file);
  }

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

  @Mutation
  public setExternalLink(link: string) {
    this.values.externalLink = link;
  }

  @Mutation
  public setIsCommentsEnable(isEnable: boolean) {
    this.values.isCommentsEnable = isEnable;
  }

  @Mutation
  public setIsUnlockableContent(isUnlockable: boolean) {
    this.values.isUnlockableContent = isUnlockable;
  }

  @Mutation
  public setUnlockableText(text: string) {
    this.values.unlockableText = text;
  }

  @Mutation
  public setIsExplicit(isExplicit: boolean) {
    this.values.isExplicit = isExplicit;
  }

  @Mutation
  public setProperties(properties: IAttributeProperty[]) {
    this.values.attributes.properties = properties;
  }

  @Mutation
  public setStats(stats: IAttributeStat[]) {
    this.values.attributes.stats = stats;
  }

  @Mutation
  public setLevels(levels: IAttributeLevel[]) {
    this.values.attributes.levels = levels;
  }

  @Mutation
  public setSupply(supply: string) {
    this.values.supply = supply;
  }

  @Mutation
  public setChain(chain: string) {
    this.values.chain = chain;
  }
}
