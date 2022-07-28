<template>
  <div class="form-field mb_20">
    <div class="form-field__title">Name</div>
    <input
      type="text"
      :value="title"
      class="global-input global-input_large modal-creat-input-js"
      placeholder="Enter name item"
      @input="updateTitle"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalTitle extends Vue {
  get title(): string {
    return nftFormModule.values.title;
  }

  updateTitle(e: InputEvent) {
    nftFormModule.setTitle((e.target as HTMLInputElement)?.value || '');
  }
}
</script>
