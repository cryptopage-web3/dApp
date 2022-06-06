<template>
  <a href="#" class="my-token" @click.prevent="">
    <div class="my-token__top">
      <div class="my-token__icon">
        <img :src="'@/assets/img/my-token_img1.svg'" alt="" />
      </div>
      <div class="right">
        <div class="my-token__kurs">5.321</div>
        <div class="my-token__wallet">USDT</div>
      </div>
    </div>
    <div class="my-token__bottom">
      <div class="my-token__procent my-token__procent-green">
        1.44%
        <svg
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
      </div>
      <div class="my-token__count">$ 11,2</div>
      <div class="my-token__value">Value: $ 2 237.24</div>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { IToken } from '~/types';

@Component({})
export default class SidebarToken extends Vue {
  @Prop({ required: true })
  readonly item!: IToken;
}
</script>
