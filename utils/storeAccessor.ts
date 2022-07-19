/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '~/store/auth';
import AlertModule from '~/store/alert';
import AddressModule from '~/store/address';
import StickyModule from '~/store/sticky';
import MarketModule from '~/store/market';

let authModule: AuthModule;
let alertModule: AlertModule;
let addressModule: AddressModule;
let stickyModule: StickyModule;
let marketModule: MarketModule;

function initialiseStores(store: Store<any>): void {
  authModule = getModule(AuthModule, store);
  alertModule = getModule(AlertModule, store);
  addressModule = getModule(AddressModule, store);
  stickyModule = getModule(StickyModule, store);
  marketModule = getModule(MarketModule, store);

  if (process.browser) {
    authModule.init();
  }
}

export {
  initialiseStores,
  authModule,
  alertModule,
  addressModule,
  stickyModule,
  marketModule,
};
