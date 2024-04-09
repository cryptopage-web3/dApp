<template>
  <div class="token">
    <div class="token-left">
      <img :src="logo" alt="" class="token__icon" />
      <div>
        <div class="token__name">{{ name }} ({{ symbol }})</div>
      </div>
    </div>
    <div class="token-right">
      <div class="token-row">
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
import { IUserToken } from '~/types';
import { addressModule } from '~/store';

type TToken = IUserToken;

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

  get logo() {
    return this.token.logo_url || '';
  }

  get balance() {
    return this.token.amount || 0;
  }

  get name() {
    return this.token.name || '';
  }

  get symbol() {
    return this.token.symbol || '';
  }

  get price() {
    return this.token.price || 0;
  }

  get balancePrice() {
    return this.balance * this.price;
  }
}
</script>
