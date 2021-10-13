<template>
  <div class="balances">
    <a
      v-for="token in tokens"
      :key="token.tokenInfo.address"
      href="#"
      class="balance"
    >
      <div class="balance-top">
        <div class="balance__thumb">
          <img :src="`https://ethplorer.io${token.tokenInfo.image}`" alt="" />
        </div>
        <div class="balance-right">
          <div class="balance__countusdt">
            {{
              token.tokenInfo && token.tokenInfo.price
                ? token.tokenInfo.price.rate.toFixed(2)
                : 0
            }}
            $
          </div>
          <div
            v-if="token.tokenInfo.price && token.tokenInfo.price.diff"
            class="balance__procent"
          >
            {{ token.tokenInfo.price.diff }} %
            <img
              v-if="token.tokenInfo.price.diff > 0"
              src="@/assets/img/balance__procent_img1.png"
              alt=""
            />
            <img v-else src="@/assets/img/balance__procent_img2.png" alt="" />
          </div>
        </div>
      </div>
      <div class="balance-bottom">
        Balance:
        {{
          usdBalance(
            Number(token.rawBalance),
            token.tokenInfo.price.rate,
            token.tokenInfo.decimals
          )
        }}
        $
        <br />
        <span>
          {{
            Number(token.rawBalance) | normalizeAmount(token.tokenInfo.decimals)
          }}
          {{ token.tokenInfo.symbol }}
        </span>
      </div>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TypedStoreMixin from '~/mixins/typed-store'
import { EthplorerTokenType } from '~/logic/address/types'

@Component({})
export default class SidebarRightBalance extends mixins(TypedStoreMixin) {
  public get tokens(): EthplorerTokenType[] {
    return this.typedStore.address.tokens
  }

  public usdBalance(balance: number, rate: number, decimals: number): string {
    if (rate > 0) {
      return String(((balance / 10 ** decimals) * rate).toFixed(2))
    }
    return String(0)
  }
}
</script>
