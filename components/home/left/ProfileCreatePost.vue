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
import { nftFormModule } from '~/store';

@Component({})
export default class ProfileCreatePost extends Vue {
  showModal() {
    nftFormModule.setForceOwner(true);
    nftFormModule.setShowModal(true);
  }
}
</script>
