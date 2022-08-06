<template>
  <div class="modal-creat-checkbox mb_20">
    <div class="modal-creat-checkbox__left">
      <div class="modal-creat-checkbox__icon">
        <img src="@/assets/img/modal-creat-checkbox_icon1.svg" alt="" />
      </div>
      <div class="modal-creat-checkbox__cont">
        <div class="modal-creat-checkbox__title">Comments</div>
        <div class="modal-creat-checkbox__text">
          Enable or disable the ability to comment
        </div>
      </div>
    </div>
    <div class="modal-creat-checkbox__right">
      <label class="global-checkbox">
        <input type="checkbox" :checked="isEnable" @change="updateIsEnable" />
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
export default class ModalComments extends Vue {
  get isEnable(): boolean {
    return nftFormModule.values.isCommentsEnable;
  }

  updateIsEnable(e: InputEvent) {
    nftFormModule.setIsCommentsEnable(
      (e.target as HTMLInputElement)?.checked || false,
    );
  }
}
</script>
