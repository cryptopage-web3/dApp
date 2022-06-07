<template>
  <a href="#" class="my-token" @click.prevent="">
    <div class="my-token__top">
      <div class="my-token__icon">
        <img :src="token.logo" alt="" />
      </div>
      <div class="right">
        <div class="my-token__kurs" :title="token.balance">
          {{ token.balance | formatNumberFloatDigits }}
        </div>
        <div class="my-token__wallet">{{ token.symbol }}</div>
      </div>
    </div>
    <div class="my-token__bottom">
      <div
        class="my-token__procent"
        :class="{
          'my-token__procent-green': token.percentChange >= 0,
          'my-token__procent-red': token.percentChange < 0,
        }"
      >
        {{ Math.abs(token.percentChange) }}%
        <svg
          v-if="token.percentChange >= 0"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.89044 10L11.1099 10C11.2964 10 11.4006 9.80376 11.2851 9.66979L8.17535 6.07713C8.08633 5.97429 7.91494 5.97429 7.82498 6.07713L4.71526 9.66979C4.59973 9.80376 4.7039 10 4.89044 10Z"
            fill="#27BC6A"
          />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1096 6H4.89012C4.70357 6 4.59941 6.19624 4.71493 6.33021L7.82465 9.92287C7.91367 10.0257 8.08506 10.0257 8.17502 9.92287L11.2847 6.33021C11.4003 6.19624 11.2961 6 11.1096 6Z"
            fill="#FF1818"
          />
        </svg>
      </div>
      <div class="my-token__count" :title="token.price">
        $ {{ token.price | formatNumberFloatDigits }}
      </div>
      <div class="my-token__value" :title="token.balancePrice">
        Value: $ {{ token.balancePrice | formatNumberFloatDigits }}
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IToken } from '~/types';

type TToken = IToken;

@Component({})
export default class SidebarToken extends Vue {
  @Prop({ required: true })
  readonly token!: TToken;
}
</script>
