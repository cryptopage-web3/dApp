<template>
  <div class="form-field mb_20">
    <div class="form-field__title">Description</div>
    <textarea
      class="global-input global-input_textarea"
      placeholder="Enter text"
      :value="description"
      @input="updateDescription"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalDescription extends Vue {
  get description(): string {
    return nftFormModule.values.description;
  }

  updateDescription(e: InputEvent) {
    nftFormModule.setDescription(
      (e.target as HTMLTextAreaElement)?.value || '',
    );
  }
}
</script>
