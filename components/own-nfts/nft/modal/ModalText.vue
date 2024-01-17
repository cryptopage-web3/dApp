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
    <ModalTextDescription
      v-if="description"
      :text="description"
      :has-margin="false"
    />
    <ModalTextDescription
      v-if="encryptedText"
      :text="encryptedText"
      :has-margin="!!description"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import ModalTextDescription from './ModalTextDescription.vue';
import { INft } from '~/types';
import { copyToClipboard } from '~/utils/copyToClipboard';
import { shortToken } from '~/utils/shortToken';
import { notify } from '~/utils/notify';

type TNft = INft;

@Component({
  components: {
    ModalTextDescription,
  },
})
export default class ModalText extends Vue {
  @Prop({ required: true })
  readonly nft!: TNft;

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

  get tokenId(): string {
    return this.nft.tokenId && shortToken(this.nft.tokenId);
  }

  get contractAddress(): string {
    return this.nft.contractAddress;
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
    copyToClipboard(this.contractAddress);
    ($(this.$refs.hash) as any).tooltip('hide');

    notify.success('Contract Address copied to clipboard');
  }
}
</script>
