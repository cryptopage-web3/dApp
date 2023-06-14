<template>
  <div class="token">
    <div class="token-left">
      <img :src="logo" alt="" class="token__icon" />
      <div>
        <div class="token__name">{{ name }} ({{ symbol }})</div>
        <div class="token__address">
          Contract address:
          <nuxt-link v-if="address" :to="`/${chainSlug}/${address}`">
            {{ address | shortAddress }}
          </nuxt-link>
          <span v-else>unknown</span>
        </div>
      </div>
    </div>
    <div class="token-right">
      <div class="token-row">
        <div
          class="token__procent"
          :class="{
            'token__procent-green': percentChange >= 0,
            'token__procent-red': percentChange < 0,
          }"
        >
          {{ Math.abs(percentChange) }}%
        </div>
        <div class="token__dollar" :title="balancePrice">
          ${{ balancePrice | formatNumberFloatDigits }}
        </div>
        <TokenDropdown />
      </div>
      <div class="token-row">
        <div class="token__count" :title="balance">Quantity: {{ balance }}</div>
        <div class="token__price" :title="price">
          Price: ${{ price | formatNumberFloatDigits }}
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

  get address() {
    return this.token.address || '';
  }

  get logo() {
    return this.token.logo || '';
  }

  get balance() {
    return this.token.balance || 0;
  }

  get name() {
    return this.token.name || '';
  }

  get symbol() {
    return this.token.symbol || '';
  }

  get percentChange() {
    return this.token.percentChange || 0;
  }

  get price() {
    return this.token.price || 0;
  }

  get balancePrice() {
    return this.token.balancePrice || 0;
  }
}
</script>
