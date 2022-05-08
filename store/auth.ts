import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true,
})
export default class AuthModule extends VuexModule {
  public isAuth = false;

  @Mutation
  public setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }
}
