import Web3 from 'web3'
import { PROVIDER_HOST_BY_CHAINID } from '~/constants'

export const web3Builder = (chainId: number | string): Web3 => {
  return new Web3(PROVIDER_HOST_BY_CHAINID[chainId])
}
