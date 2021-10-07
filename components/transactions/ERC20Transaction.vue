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
          {{
            income ? transaction.receiver : transaction.sender | shortAddress
          }}
        </div>
      </div>
    </div>
    <div class="transactions-link-right">
      <div class="transactions-link__usdt">
        {{ income ? '-' : '' }}
        {{
          transaction.amount | normalizeAmount(transaction.tokenInfo.decimals)
        }}
        {{ transaction.tokenInfo.symbol }}
      </div>
      <!--div class="transactions-link__usd">-$ 1, 185.76 USD</div-->
    </div>
  </a>
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'
import { TransactionType } from '~/logic/transactions/types'
import { web3 } from '~/plugins/web3'
@Component({})
export default class ERC20Transaction extends Vue {
  @Prop({ required: true }) readonly transaction!: TransactionType
  private fetchOnServer = false
  protected get income(): boolean {
    const sender = this.transaction.sender
    const address = web3.utils.toChecksumAddress(this.$route.params.address)
    return sender === address
  }
}
</script>
