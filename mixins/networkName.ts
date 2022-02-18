import { Component, mixins } from 'nuxt-property-decorator'
import TypedStoreMixin from '~/mixins/typed-store'

Component.registerHooks(['fetchOnServer'])
@Component({})
export default class NetworkName extends mixins(TypedStoreMixin) {
  get address(): string {
    return this.typedStore.address.address
  }

  get networkName(): string {
    return this.typedStore.address.networkSlug
  }
}
