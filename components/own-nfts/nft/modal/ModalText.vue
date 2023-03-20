<template>
  <div class="profile-content__text" @click.prevent="$emit('show-modal')">
    <div class="profile-content__title">
      Contract Address:
      <a ref="hash" href="#" @click.prevent.stop="copyHash">
        {{ contractAddress | shortAddress }}
      </a>
      <br />
      Token ID: {{ tokenId }}
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
import { INft } from '~/types';
import { copyToClipboard } from '~/utils/copyToClipboard';

type TNft = INft;

@Component({})
export default class ModalText extends Vue {
  showFull = false;

  @Prop({ required: true })
  readonly nft!: TNft;

  $refs!: {
    hash: HTMLAnchorElement;
  };

  get originDescription(): string {
    return this.nft.description || '';
  }

  get isLongDescription(): boolean {
    return this.originDescription.length > 250;
  }

  get shortDescription(): string {
    return this.isLongDescription
      ? this.originDescription.slice(0, 200) + '...'
      : this.originDescription;
  }

  get description(): string {
    return this.showFull ? this.originDescription : this.shortDescription;
  }

  get title(): string {
    return this.nft.name || '';
  }

  get tokenId(): string {
    return this.nft.tokenId;
  }

  get contractAddress(): string {
    return this.nft.contract_address;
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
    copyToClipboard(this.contractAddress);
    ($(this.$refs.hash) as any).tooltip('hide');

    this.$notify({
      type: 'success',
      title: 'Contract Address copied to clipboard',
    });
  }
}
</script>
