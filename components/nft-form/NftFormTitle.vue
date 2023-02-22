<template>
  <input
    type="text"
    :value="title"
    :placeholder="isOwner ? 'What\'s new with you?' : 'ENTER YOUR MESSAGE'"
    class="form-creat__name form-creat-input-js form-creat-focus-js"
    @input="updateTitle"
    @focus="$emit('focus')"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class NftFormTitle extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly isOwner!: boolean;

  get title(): string {
    return nftFormModule.values.title;
  }

  updateTitle(e: InputEvent) {
    nftFormModule.setTitle((e.target as HTMLInputElement)?.value || '');
  }
}
</script>
