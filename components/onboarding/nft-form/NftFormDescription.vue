<template>
  <div class="form-creat-textarea-wrap" style="display: block">
    <textarea
      class="form-creat__text"
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
