<template>
  <div class="form-creat-textarea-wrap">
    <textarea
      placeholder="Enter post text"
      class="form-creat__text form-creat-input-js"
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
export default class NftFormDescription extends Vue {
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
