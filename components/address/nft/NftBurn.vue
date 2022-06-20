<template>
  <ul class="market-product-shd">
    <li>
      <a href="#">
        <NftShareIcon />
      </a>
    </li>
    <li>
      <a href="#">
        <NftBurnIcon />
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import NftShareIcon from '~/components/icon/nft/NftShareIcon.vue';
import NftBurnIcon from '~/components/icon/nft/NftBurnIcon.vue';

type TNft = INft;

@Component({
  components: {
    NftShareIcon,
    NftBurnIcon,
  },
})
export default class NftBurn extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
