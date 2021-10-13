<template>
  <a href="#" class="transactions-link">
    <div class="transactions-link-left">
      <img v-if="income" src="@/assets/img/transactions-link_img1.png" alt="" />
      <img v-else src="@/assets/img/transactions-link_img2.png" alt="" />
      <div class="transactions-link__text">
        <div class="transactions-link__tool">
          {{ income ? 'Send' : 'Receive' }} {{ transaction.tokenInfo.symbol }}
        </div>
        <div class="transactions-link__number">
          {{ transaction.timeStamp | normalizeDate }} /
          {{ income ? 'To' : 'From' }} :
          <nuxt-link
            style="color: #a5a5a5"
            :to="`/${income ? transaction.receiver : transaction.sender}`"
          >
            {{
              income ? transaction.receiver : transaction.sender | shortAddress
            }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="transactions-link-right">
      <div class="transactions-link__usdt">
        {{ income ? '-' : '' }}
        {{ transaction.amount }}
        {{ transaction.tokenInfo.symbol }}
      </div>
      <!--div class="transactions-link__usd">-$ 1, 185.76 USD</div-->
    </div>
  </a>
</template>
<script lang="ts">
import Vue from 'vue'
import Web3 from 'web3'
import { Container } from 'vue-typedi'
import { Component, Prop } from 'nuxt-property-decorator'
import { TransactionType } from '~/logic/transactions/types'
import tokens from '~/logic/tokens'

Component.registerHooks(['fetchOnServer'])
@Component({})
export default class ERC20Transaction extends Vue {
  protected get $web3(): Web3 {
    return Container.get(tokens.WEB3) as Web3
  }

  @Prop({ required: true }) readonly transaction!: TransactionType
  protected get income(): boolean {
    const sender = this.transaction.sender
    const address = this.$web3.utils.toChecksumAddress(
      this.$route.params.address
    )
    return sender === address
  }

  fetchOnServer(): boolean {
    return true
  }
}
</script>
