<template>
  <div class="balances">
    <nuxt-link
      v-for="token in tokens"
      :key="token.tokenInfo.address"
      :to="url(token)"
      class="balance"
    >
      <div class="balance-top">
        <div class="balance__thumb">
          <img :src="token.tokenInfo.image" alt="" />
        </div>
        <div class="balance-right">
          <div class="balance__countusdt">
            {{ token.balance | normalizeAmount | truncate(6) }}
            {{ token.tokenInfo.symbol }}
          </div>
          <div class="balance__procent">
            {{ token.diff }} %
            <img
              v-if="token.diff > 0"
              src="@/assets/img/balance__procent_img1.png"
              alt=""
            />
            <img v-else src="@/assets/img/balance__procent_img2.png" alt="" />
          </div>
        </div>
      </div>
      <div class="balance-bottom">
        {{ token.rate.toFixed(2) }} $
        <br />
        <span> Value: {{ token.usdBalance.toFixed(2) }} $ </span>
      </div>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TypedStoreMixin from '~/mixins/typed-store'
import { TokenBalanceType } from '~/logic/address/types'
import NetworkNameMixin from '~/mixins/networkName'

@Component
export default class SidebarRightBalance extends mixins(
  TypedStoreMixin,
  NetworkNameMixin
) {
  public get tokens(): TokenBalanceType[] {
    return this.typedStore.address.tokens
  }

  public url(token: TokenBalanceType): string {
    const address = this.typedStore.address.address
    const tokenAddress = token && token.tokenInfo ? token.tokenInfo.address : ''
    if (tokenAddress && address !== tokenAddress) {
      return `/${this.networkName}/${tokenAddress}/tokens?address=${address}`
    }
    return `/${this.networkName}/${address}`
  }
}
</script>
