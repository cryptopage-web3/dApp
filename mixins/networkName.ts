import { Component, mixins } from 'nuxt-property-decorator'
import TypedStoreMixin from '~/mixins/typed-store'

Component.registerHooks(['fetchOnServer'])
@Component({})
export default class networkName extends mixins(TypedStoreMixin) {
  get selectedAddress(): string {
    return this.typedStore.address.address
  }

  get networkName(): string {
    return this.typedStore.auth.selectedNetworkSlug
  }
}
