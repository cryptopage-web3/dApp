<template>
  <div class="profile-content">
    <NftTop :nft="nft" />

    <NftImage :nft="nft" />

    <NftText :nft="nft" />

    <NftComments :nft="nft" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import NftTop from '~/components/address/nft/NftTop.vue';
import NftText from '~/components/address/nft/NftText.vue';
import NftImage from '~/components/address/nft/NftImage.vue';
import NftComments from '~/components/address/nft/NftComments.vue';

type TNft = INft;

@Component({
  components: {
    NftTop,
    NftText,
    NftImage,
    NftComments,
  },
})
export default class Nft extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;
}
</script>
