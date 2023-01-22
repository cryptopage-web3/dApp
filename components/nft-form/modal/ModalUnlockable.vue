<template>
  <div>
    <div class="modal-creat-checkbox mb_20">
      <div class="modal-creat-checkbox__left">
        <div class="modal-creat-checkbox__icon">
          <img src="@/assets/img/modal-creat-checkbox_icon2_3.svg" alt="" />
        </div>
        <div class="modal-creat-checkbox__cont">
          <div class="modal-creat-checkbox__title">
            NFT monetization settings
          </div>
          <div class="modal-creat-checkbox__text">
            Include unlockable content that can only be revealed by the owner of
            the item
          </div>
        </div>
      </div>
      <div class="modal-creat-checkbox__right">
        <label class="global-checkbox">
          <input
            type="checkbox"
            :checked="isUnlockable"
            @change="updateIsUnlockable"
          />
          <div class="global-checkbox__wrap">
            <div class="global-checkbox__circle"></div>
          </div>
        </label>
      </div>
    </div>
    <div
      v-show="isUnlockable"
      class="modal-creat-unlocks-tabs voite-collapse mb_20 checkbox-collapse"
    >
      <UnlockableFields />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import UnlockableFields from '../UnlockableFields.vue';
import { nftFormModule } from '~/store';

@Component({
  components: {
    UnlockableFields,
  },
})
export default class ModalUnlockable extends Vue {
  get isUnlockable(): boolean {
    return nftFormModule.values.isUnlockableContent;
  }

  updateIsUnlockable(e: InputEvent) {
    nftFormModule.setIsUnlockableContent(
      (e.target as HTMLInputElement)?.checked || false,
    );
  }
}
</script>
