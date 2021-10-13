import { TransactionType } from '~/logic/transactions/types'
import { EthplorerGetAddressInfoResponseType } from '~/logic/address/types'
/**
 * We use this state type to enforce the same structure with `vuex-simple`.
 *
 * There are places where we use `Store<StateType>` and it cannot be changed.
 * This is a temporary solution.
 *
 * @see https://github.com/sascha245/vuex-simple/issues/30
 */
export interface StateType {
  // Module:
  auth: {
    address: string,
    chain: number
    loggedIn: boolean,
    addressInfo: EthplorerGetAddressInfoResponseType
  },
  transactions: TransactionType[]
}

export interface ChainType {
    networkName: string
    serviceName: string
    chainId: number
    apiURL: string
}