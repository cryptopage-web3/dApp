<template>
  <div class="profile-content__text" @click.prevent="$emit('show-modal')">
    <div class="profile-content__title">
      Transaction Hash:
      <a ref="hash" href="#" @click.prevent.stop="copyHash">
        {{ txHash | shortAddress(5, 7) }}
      </a>
    </div>
    <div v-if="title" class="profile-content__title">
      {{ title }}
    </div>
    <div v-if="description" class="profile-content__desc">
      {{ description }}
      <span v-if="isLongDescription" @click.prevent.stop="switchFull">
        {{ showFull ? 'hide' : 'show more' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { INftTransaction } from '~/types';
import { copyToClipboard } from '~/utils/copyToClipboard';

type TNftTransaction = INftTransaction;

@Component({})
export default class NftText extends Vue {
  showFull = false;

  @Prop({ required: true })
  readonly nft!: TNftTransaction;

  $refs!: {
    hash: HTMLAnchorElement;
  };

  get isLongDescription(): boolean {
    return this.nft.description.length > 250;
  }

  get shortDescription(): string {
    return this.isLongDescription
      ? this.nft.description.slice(0, 200) + '...'
      : this.nft.description;
  }

  get description(): string {
    return this.showFull ? this.nft.description : this.shortDescription;
  }

  get title(): string {
    return this.nft.name;
  }

  get txHash(): string {
    return this.nft.txHash;
  }

  mounted() {
    this.$nextTick(() => {
      ($(this.$refs.hash) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy',
      });
    });
  }

  switchFull() {
    this.showFull = !this.showFull;
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
