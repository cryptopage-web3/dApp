<template>
  <div class="profile-center profile-my-nfts">
    <own-nfts-top />
    <own-nfts-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({
  head: {
    title: 'My NFTs | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'My NFTs | Crypto.Page',
      },
    ],
  },
})
export default class NftsPage extends Vue {}
</script>
