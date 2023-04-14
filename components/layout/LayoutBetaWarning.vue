<template>
  <div
    v-if="isOpen"
    class="info-fixed-block info-fixed-block_relative text-center"
  >
    <div
      class="d-inline-flex align-items-start justify-content-center flex-wrap"
    >
      <div class="d-flex align-items-start flex-all">
        <div class="d-flex align-items-center mr_5">
          <img src="@/assets/img/beta-version-icon.svg" class="mr_5" alt="" />
          <span class="white global-text_14 fw-600"> Beta Warning! </span>
        </div>
        <div class="flex-all white global-text_14 pt_2 text-left">
          Crypto.Page is still in the beta phase, things may break please handle
          us with care
        </div>
      </div>
      <a href="#" class="info-fixed-block__close ml_5" @click.prevent="close">
        <img src="@/assets/img/global-hint-close_img.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { stickyModule } from '~/store';
import { ELocalStorageKey } from '~/types';

@Component({})
export default class LayoutBetaWarning extends Vue {
  isOpen = false;

  mounted() {
    const hasClosed = localStorage.getItem(ELocalStorageKey.betaWarning);

    if (hasClosed) {
      return;
    }

    this.isOpen = true;
  }

  close() {
    localStorage.setItem(ELocalStorageKey.betaWarning, 'true');
    stickyModule.update();

    this.isOpen = false;
  }
}
</script>
