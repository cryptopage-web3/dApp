<template>
  <a
    v-if="nft.image"
    :href="nft.image"
    target="_blank"
    class="profile-content__image loading-bg"
  >
    <img :src="nft.image" />
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
