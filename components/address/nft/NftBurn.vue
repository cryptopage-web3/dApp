<template>
  <ul class="market-product-shd">
    <li>
      <a href="#">
        <NftShareIcon />
      </a>
    </li>
    <li>
      <a href="#" @click.prevent="showModal">
        <NftBurnIcon />
      </a>
      <NftDeleteConfirm ref="modal" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INft } from '~/types';
import NftShareIcon from '~/components/icon/nft/NftShareIcon.vue';
import NftBurnIcon from '~/components/icon/nft/NftBurnIcon.vue';
import NftDeleteConfirm from '~/components/address/nft/NftDeleteConfirm.vue';

type TNft = INft;

@Component({
  components: {
    NftShareIcon,
    NftBurnIcon,
    NftDeleteConfirm,
  },
})
export default class NftBurn extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    modal: NftDeleteConfirm;
  };

  showModal() {
    this.$refs.modal.show();
  }
}
</script>
