<template>
  <div class="modal-creat-text mb_20">
    <div class="modal-creat__title2">Supply</div>
    <div class="global-text">
      The number of items that can be minted (minimum: 1). No gas cost to you!
    </div>
    <input
      type="text"
      :value="supply"
      placeholder="number"
      class="global-input global-input_large mt_10"
      @input="updateSupply"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { nftFormModule } from '~/store';

@Component({})
export default class ModalSupply extends Vue {
  get supply(): string {
    return nftFormModule.values.supply;
  }

  updateSupply(e: InputEvent) {
    nftFormModule.setSupply((e.target as HTMLInputElement)?.value || '');
  }
}
</script>
