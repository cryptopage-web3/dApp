<template>
  <div class="profile-center profile-my-nfts">
    <own-nfts-top />
    <own-nfts-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftsModalInit } from '~/utils/nftsModal';
import { nftsCommentInit } from '~/utils/nftsComment';
import { marketProductDropInit } from '~/utils/marketProductDrop';
import marketProductThumb1 from '~/assets/img/market-product_thumb1.png';
import marketProductExclusive1 from '~/assets/img/market-product_exclusive_bg1.png';
import marketProductExclusive2 from '~/assets/img/market-product_exclusive_bg2.png';
import marketProductExclusive3 from '~/assets/img/market-product_exclusive_bg3.png';
import { favoriteSelectInit } from '~/utils/favoriteSelect';
import { addressModule } from '~/store';

@Component({
  head: {
    title: 'My NFTs | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'My NFTs | Crypto.Page',
      },
    ],
  },
})
export default class NftsPage extends Vue {
  thumb1 = marketProductThumb1;
  exclusive1 = marketProductExclusive1;
  exclusive2 = marketProductExclusive2;
  exclusive3 = marketProductExclusive3;

  get chainSlug(): string {
    return addressModule.chainSlug;
  }

  get address(): string {
    return addressModule.address;
  }

  mounted() {
    nftsModalInit();
    favoriteSelectInit();
    nftsCommentInit();
    marketProductDropInit();
  }
}
</script>
