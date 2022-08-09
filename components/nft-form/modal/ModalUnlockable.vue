<template>
  <div>
    <div class="modal-creat-checkbox mb_20">
      <div class="modal-creat-checkbox__left">
        <div class="modal-creat-checkbox__icon">
          <img src="@/assets/img/modal-creat-checkbox_icon2.svg" alt="" />
        </div>
        <div class="modal-creat-checkbox__cont">
          <div class="modal-creat-checkbox__title">Unlockable content</div>
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
    <div v-if="isUnlockable" class="form-field modal-creat-text-content mb_20">
      <div class="form-field__title">Text content</div>
      <textarea
        class="global-input global-input_textarea"
        placeholder="Enter text"
        :value="text"
        @input="updateText"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalUnlockable extends Vue {
  get isUnlockable(): boolean {
    return nftFormModule.values.isUnlockableContent;
  }

  updateIsUnlockable(e: InputEvent) {
    nftFormModule.setIsUnlockableContent(
      (e.target as HTMLInputElement)?.checked || false,
    );
  }

  get text(): string {
    return nftFormModule.values.unlockableText;
  }

  updateText(e: InputEvent) {
    nftFormModule.setUnlockableText(
      (e.target as HTMLInputElement)?.value || '',
    );
  }
}
</script>
