import Web3 from 'web3'
import { Container } from 'vue-typedi'
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { TransactionType } from '~/logic/transactions/types'
import tokens from '~/logic/tokens'
import NetworkNameMixin from '~/mixins/networkName'

Component.registerHooks(['fetchOnServer'])

@Component({})
export default class TransactionMixin extends mixins(NetworkNameMixin) {
  fetchOnServer = (): boolean => true

  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  @Prop({ required: true }) readonly transaction!: TransactionType

  protected get income(): boolean {
    try {
      const address = this.$web3.utils.toChecksumAddress(
        this.$route.query.address
          ? `${this.$route.query.address}`
          : `${this.$route.params.address}`
      )
      const sender = this.$web3.utils.toChecksumAddress(
        `${this.transaction.sender}` ||
          '0x0000000000000000000000000000000000000000'
      )
      const receiver = this.$web3.utils.toChecksumAddress(
        `${this.transaction.receiver}` ||
          '0x0000000000000000000000000000000000000000'
      )
      if (sender === address) {
        return false
      } else if (receiver === address) {
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
    if (this.income) {
      return this.transaction.sender
    } else {
      return this.transaction.receiver
    }
  }
}
