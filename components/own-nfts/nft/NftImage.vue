<template>
  <a
    v-if="nft.url"
    :href="nft.url"
    target="_blank"
    class="market-product__media-image loading-bg"
  >
    <img :src="nft.url" />
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';

type TNft = INft;

@Component({})
export default class NftImage extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
