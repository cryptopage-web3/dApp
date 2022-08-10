<template>
  <div class="modal-creat-checkbox mb_20">
    <div class="modal-creat-checkbox__left">
      <div class="modal-creat-checkbox__icon">
        <img src="@/assets/img/modal-creat-checkbox_icon3.svg" alt="" />
      </div>
      <div class="modal-creat-checkbox__cont">
        <div class="modal-creat-checkbox__title">
          Explicit & Sensitive Content
        </div>
        <div class="modal-creat-checkbox__text">
          Set this item as explicit and sensitive content
        </div>
      </div>
    </div>
    <div class="modal-creat-checkbox__right">
      <label class="global-checkbox">
        <input
          type="checkbox"
          :checked="isExplicit"
          @change="updateIsExplicit"
        />
        <div class="global-checkbox__wrap">
          <div class="global-checkbox__circle"></div>
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalExplicit extends Vue {
  get isExplicit(): boolean {
    return nftFormModule.values.isExplicit;
  }

  updateIsExplicit(e: InputEvent) {
    nftFormModule.setIsExplicit(
      (e.target as HTMLInputElement)?.checked || false,
    );
  }
}
</script>
