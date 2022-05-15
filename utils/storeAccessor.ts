/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '~/store/auth';

let authModule: AuthModule;

function initialiseStores(store: Store<any>): void {
  authModule = getModule(AuthModule, store);

  if (process.browser) {
    authModule.init();
  }
}

export { initialiseStores, authModule };
