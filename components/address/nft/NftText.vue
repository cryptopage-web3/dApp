<template>
  <div class="profile-content__text" @click.prevent="$emit('show-modal')">
    <div v-if="txHash" class="profile-content__title">
      Transaction Hash:
      <a ref="hash" href="#" @click.prevent.stop="copyHash">
        {{ txHash | shortAddress(5, 7) }}
      </a>
    </div>
    <div v-else class="profile-content__title">
      Token ID:
      <a href="#" @click.prevent.stop="">
        {{ tokenId }}
      </a>
    </div>

    <div v-if="title" class="profile-content__title">
      {{ title }}
    </div>
    <NftTextDescription
      v-if="description"
      :text="description"
      :has-margin="false"
    />
    <NftTextDescription
      v-if="encryptedText"
      :text="encryptedText"
      :has-margin="!!description"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import NftTextDescription from './NftTextDescription.vue';
import { INftTransaction } from '~/types';
import { copyToClipboard } from '~/utils/copyToClipboard';

type TNftTransaction = INftTransaction;

@Component({
  components: {
    NftTextDescription,
  },
})
export default class NftText extends Vue {
  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    hash: HTMLAnchorElement;
  };

  get description(): string {
    return this.nft.description || '';
  }

  get encryptedText(): string {
    return this.nft.encryptedText || '';
  }

  get title(): string {
    return this.nft.name || '';
  }

  get txHash(): string {
    return this.nft.txHash;
  }

  get tokenId(): string {
    return this.nft.tokenId;
  }

  mounted() {
    this.$nextTick(() => {
      ($(this.$refs.hash) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy',
      });
    });
  }

  copyHash() {
    copyToClipboard(this.txHash);
    ($(this.$refs.hash) as any).tooltip('hide');

    this.$notify({
      type: 'success',
      title: 'Transaction Hash copied to clipboard',
    });
  }
}
</script>
