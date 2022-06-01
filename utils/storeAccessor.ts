/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import AuthModule from '~/store/auth';
import AlertModule from '~/store/alert';
import AddressModule from '~/store/address';

let authModule: AuthModule;
let alertModule: AlertModule;
let addressModule: AddressModule;

function initialiseStores(store: Store<any>): void {
  authModule = getModule(AuthModule, store);
  alertModule = getModule(AlertModule, store);
  addressModule = getModule(AddressModule, store);

  if (process.browser) {
    authModule.init();
  }
}

export { initialiseStores, authModule, alertModule, addressModule };
