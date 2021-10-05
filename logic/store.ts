import { Module } from 'vuex-simple'

import NFTModule from '~/logic/nft/module'
import AuthModule from '~/logic/auth/module'
import TransactionModule from '~/logic/transactions/module'
/**
 * We use typed store with different modules inside.
 *
 * Root level store should only contain links to other modules.
 * It might have some utility or shared data in the root state.
 *
 * @see https://github.com/sascha245/vuex-simple#root-state
 */
export default class TypedStore {
  @Module()
  public nft = new NFTModule()

  @Module()
  public auth = new AuthModule()

  @Module()
  public transactions = new TransactionModule()
}
