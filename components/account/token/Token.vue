<template>
  <a class="my-token" @click.prevent="">
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
import { IUserToken } from '~/types';
import UpTokenIcon from '~/components/icon/account/UpTokenIcon.vue';
import DownTokenIcon from '~/components/icon/account/DownTokenIcon.vue';

type TToken = IUserToken;

@Component({
  components: {
    UpTokenIcon,
    DownTokenIcon,
  },
})
export default class Token extends Vue {
  @Prop({ required: true })
  readonly token!: TToken;

  get logo() {
    return this.token.logo_url || '';
  }

  get balance() {
    return this.token.amount || 0;
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
