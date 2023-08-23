<template>
  <div v-if="showDescription" class="mt_15 collapse form-creat-nav-text show">
    <div class="global-text_14 light_grey">
      {{
        isUnlockable
          ? 'Encrypted text content (optional)'
          : 'Text content (optional)'
      }}
    </div>
    <input
      type="text"
      placeholder="Enter post text"
      class="global-input global-input_large w-100 mt_4"
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

  get showDescription(): boolean {
    return nftFormModule.showDescription;
  }

  get isUnlockable(): boolean {
    return nftFormModule.values.isUnlockableContent;
  }

  updateDescription(e: InputEvent) {
    nftFormModule.setDescription(
      (e.target as HTMLTextAreaElement)?.value || '',
    );
  }
}
</script>
