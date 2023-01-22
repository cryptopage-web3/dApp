<template>
  <div
    v-show="isUnlockable"
    id="form-creat-moneta"
    class="form-creat-moneta voite-collapse mt_15 mb_15"
  >
    <div class="mb_10">
      <div class="global-text_16 fw-700 main_black mb_5">
        NFT monetization settings
      </div>
      <div class="global-text_12">
        Include unlockable content that can only be revealed by the owner of the
        item
      </div>
    </div>

    <UnlockableFields />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import UnlockableFields from './UnlockableFields.vue';
import { nftFormModule } from '~/store';

@Component({
  components: {
    UnlockableFields,
  },
})
export default class NftFormUnlockable extends Vue {
  get isUnlockable(): boolean {
    return nftFormModule.values.isUnlockableContent;
  }
}
</script>
