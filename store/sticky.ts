import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({
  name: 'sticky',
  namespaced: true,
  stateFactory: true,
})
export default class StickyModule extends VuexModule {
  leftRefresh = false;
  rightRefresh = false;

  @Mutation
  public setLeftRefresh(refresh: boolean) {
    this.leftRefresh = refresh;
  }

  @Mutation
  public setRightRefresh(refresh: boolean) {
    this.rightRefresh = refresh;
  }

  @Action
  public update() {
    this.setLeftRefresh(true);
    this.setRightRefresh(true);
  }

  @Action
  public cleanLeft() {
    this.setLeftRefresh(false);
  }

  @Action
  public cleanRight() {
    this.setRightRefresh(false);
  }
}
