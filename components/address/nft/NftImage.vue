<template>
  <a
    v-if="nft.image"
    :href="nft.image"
    target="_blank"
    class="profile-content__image loading-bg"
    @click.prevent="$emit('show-modal')"
  >
    <img :src="nft.image" />
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftImage extends Vue {
  @Prop({ required: true })
  readonly nft!: TNftTransaction;
}
</script>
