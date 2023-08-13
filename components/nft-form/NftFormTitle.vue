<template>
  <input
    type="text"
    :value="title"
    placeholder="ENTER YOUR MESSAGE"
    class="form-creat__name form-creat__name_main form-creat-input-pc"
    @input="updateTitle"
    @focus="$emit('focus')"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class NftFormTitle extends Vue {
  get title(): string {
    return nftFormModule.values.title;
  }

  updateTitle(e: InputEvent) {
    nftFormModule.setTitle((e.target as HTMLInputElement)?.value || '');
  }
}
</script>
