<template>
  <a href="#" class="market-product__fav">
    <CollectionEmptyIcon />
    <CollectionFillIcon />
    <span class="market-product__fav-info"> Add to My collections </span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import CollectionEmptyIcon from '~/components/icon/own-nfts/CollectionEmptyIcon.vue';
import CollectionFillIcon from '~/components/icon/own-nfts/CollectionFillIcon.vue';

type TNft = INft;

@Component({
  components: {
    CollectionEmptyIcon,
    CollectionFillIcon,
  },
})
export default class NftFavorite extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
