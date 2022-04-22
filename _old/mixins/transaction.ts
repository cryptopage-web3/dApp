import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { TransactionType } from '~/logic/transactions/types'
import NetworkNameMixin from '~/mixins/networkName'

Component.registerHooks(['fetchOnServer'])

@Component({})
export default class TransactionMixin extends mixins(NetworkNameMixin) {
  fetchOnServer = (): boolean => true

  @Prop({ required: true }) readonly transaction!: TransactionType

  protected get income(): boolean {
    try {
      const address = this.address.toLowerCase()
      const receiver = this.transaction.receiver.toLowerCase()

      if (receiver === address) {
        return true
      }

      return false
    } catch (e) {
      return false
    }
  }

  /**
   * Token symbol of main currency on current network.
   */
  get tokenSymbol(): string {
    return this.typedStore.address.basicTokenSymbol
  }

  /**
   * Address for link in transaction.
   * If transaction is income, method returns sender address.
   * If transaction is outcome, method returns receiver address.
   */
  get transactionAddress(): string {
    return this.income ? this.transaction.sender : this.transaction.receiver
  }
}
