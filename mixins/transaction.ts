import Vue from 'vue'
import Web3 from 'web3'
import { Container } from 'vue-typedi'
import { Component, Prop } from 'nuxt-property-decorator'
import { TransactionType } from '~/logic/transactions/types'
import tokens from '~/logic/tokens'

Component.registerHooks(['fetchOnServer'])

@Component({})
export default class TransactionMixin extends Vue {
  fetchOnServer = (): boolean => true

  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  @Prop({ required: true }) readonly transaction!: TransactionType
  protected get income(): boolean {
    const sender = this.$web3.utils.toChecksumAddress(
      `${this.transaction.sender}`
    )
    const address = this.$web3.utils.toChecksumAddress(
      this.$route.query.address
        ? `${this.$route.query.address}`
        : `${this.$route.params.address}`
    )
    return sender === address
  }
}
