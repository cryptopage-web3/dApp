<template>
  <a
    href="#"
    class="btn btn-blue-transparent_button btn_large mb_30 w-100"
    @click.prevent="showModal"
  >
    Create post
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { authModule, nftFormModule } from '~/store';

@Component({})
export default class ProfileCreatePost extends Vue {
  validateCreateNFT() {
    const isAuth = authModule.isAuth;

    if (!isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to create NFTs',
      });

      return false;
    }

    return true;
  }

  showModal() {
    if (!this.validateCreateNFT()) {
      return;
    }

    nftFormModule.setShowModal(true);
  }
}
</script>
