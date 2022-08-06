<template>
  <div class="modal-creat-text mb_20">
    <div class="modal-creat__title2">External link</div>
    <div class="global-text">
      Crypto.Page will include a link to this URL on this item's detail page, so
      that users can click to learn more about it. You are welcome to link to
      your own webpage with more details.
    </div>
    <input
      type="text"
      :value="link"
      class="global-input global-input_large mt_10"
      placeholder="https://yoursite/item123"
      @input="updateLink"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalExternalLink extends Vue {
  get link(): string {
    return nftFormModule.values.externalLink;
  }

  updateLink(e: InputEvent) {
    nftFormModule.setExternalLink((e.target as HTMLInputElement)?.value || '');
  }
}
</script>
