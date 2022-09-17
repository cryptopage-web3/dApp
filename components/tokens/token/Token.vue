<template>
  <div class="token">
    <div class="token-left">
      <img :src="token.logo" alt="" class="token__icon" />
      <div>
        <div class="token__name">{{ token.name }} ({{ token.symbol }})</div>
        <div class="token__address">
          Contract address:
          <nuxt-link :to="`/${chainSlug}/${token.address}`">
            {{ token.address | shortAddress }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="token-right">
      <div class="token-row">
        <div
          class="token__procent"
          :class="{
            'token__procent-green': token.percentChange >= 0,
            'token__procent-red': token.percentChange < 0,
          }"
        >
          {{ Math.abs(token.percentChange) }}%
        </div>
        <div class="token__dollar" :title="token.balancePrice">
          ${{ token.balancePrice | formatNumberFloatDigits }}
        </div>
        <TokenDropdown />
      </div>
      <div class="token-row">
        <div class="token__count" :title="token.balance">
          Quantity: {{ token.balance }}
        </div>
        <div class="token__price" :title="token.price">
          Price: ${{ token.price | formatNumberFloatDigits }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import TokenDropdown from './TokenDropdown.vue';
import { IToken } from '~/types';
import { addressModule } from '~/store';

type TToken = IToken;

@Component({
  components: {
    TokenDropdown,
  },
})
export default class Token extends Vue {
  @Prop({ required: true })
  readonly token!: TToken;

  get chainSlug(): string {
    return addressModule.chainSlug;
  }
}
</script>
