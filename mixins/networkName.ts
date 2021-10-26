import { Component, mixins } from 'nuxt-property-decorator'
import TypedStoreMixin from '~/mixins/typed-store'

Component.registerHooks(['fetchOnServer'])
@Component({})
export default class networkName extends mixins(TypedStoreMixin) {
  get address() {
    return this.typedStore.address.address
  }

  get networkName() {
    const networkName = this.typedStore.auth.selectedNetworkName
    if (networkName === 'Ethereum') {
      return 'eth'
    } else if (networkName === 'Rinkeby TestNet') {
      return 'rinkeby'
    } else if (networkName === 'BSC Network') {
      return 'bsc'
    } else if (networkName === 'Polygon Mainnet') {
      return 'matic'
    }
    return ''
  }
}
