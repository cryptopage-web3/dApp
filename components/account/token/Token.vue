<template>
  <a :href="address" class="my-token" @click.prevent="">
    <div class="my-token__top">
      <div v-if="logo" class="my-token__icon">
        <img :src="logo" alt="" />
      </div>
      <div class="right">
        <div class="my-token__kurs" :title="balance">
          {{ balance | formatNumberFloatDigits }}
        </div>
        <div class="my-token__wallet">{{ symbol }}</div>
      </div>
    </div>
    <div class="my-token__bottom">
      <div
        class="my-token__procent"
        :class="{
          'my-token__procent-green': percentChange >= 0,
          'my-token__procent-red': percentChange < 0,
        }"
      >
        {{ Math.abs(percentChange || 0) }}%
        <UpTokenIcon v-if="percentChange >= 0" />
        <DownTokenIcon v-else />
      </div>
      <div class="my-token__count" :title="price">
        $ {{ price | formatNumberFloatDigits }}
      </div>
      <div class="my-token__value" :title="balancePrice">
        Value: $ {{ balancePrice | formatNumberFloatDigits }}
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IToken } from '~/types';
import UpTokenIcon from '~/components/icon/account/UpTokenIcon.vue';
import DownTokenIcon from '~/components/icon/account/DownTokenIcon.vue';

type TToken = IToken;

@Component({
  components: {
    UpTokenIcon,
    DownTokenIcon,
  },
})
export default class Token extends Vue {
  @Prop({ required: true })
  readonly token!: TToken;

  get address() {
    return this.token.address || '';
  }

  get logo() {
    return this.token.logo || '';
  }

  get balance() {
    return this.token.balance || 0;
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
