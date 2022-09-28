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
      <NftDeleteConfirm ref="modal" :nft="nft" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';
import NftShareIcon from '~/components/icon/nft/NftShareIcon.vue';
import NftBurnIcon from '~/components/icon/nft/NftBurnIcon.vue';
import NftDeleteConfirm from '~/components/address/nft/NftDeleteConfirm.vue';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    NftShareIcon,
    NftBurnIcon,
    NftDeleteConfirm,
  },
})
export default class NftBurn extends Vue {
  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    modal: NftDeleteConfirm;
  };

  showModal() {
    this.$refs.modal.show();
  }
}
</script>
