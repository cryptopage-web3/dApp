<template>
  <div class="profile-my-nfts-top">
    <div class="profile-my-nfts__title">
      <nuxt-link :to="`/${chainSlug}/${address}`" class="market-sidebar__more">
        <OwnNftsBackIcon />
      </nuxt-link>
      <h2 class="global-zag">{{ isOwner ? 'My' : 'Account' }} NFT’s</h2>
    </div>
    <div class="profile-my-nfts-top__btns">
      <a href="#" class="btn-blue-transparent" @click.prevent="showModal">
        + Create NFT
      </a>
      <a
        href="#"
        class="btn_transparent"
        role="button"
        data-toggle="modal"
        data-target="#profile-nfts-board-modal"
      >
        + Board
      </a>
    </div>
    <!-- TODO: модалка добавления Board -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { addressModule, authModule, nftFormModule } from '~/store';
import OwnNftsBackIcon from '~/components/icon/own-nfts/OwnNftsBackIcon.vue';

@Component({
  components: {
    OwnNftsBackIcon,
  },
})
export default class OwnNftsTop extends Vue {
  get chainSlug(): string {
    return addressModule.chainSlug;
  }

  get address(): string {
    return addressModule.address;
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  // methods

  async showModal() {
    const connectSuccess = await nftFormModule.validateConnect();

    if (!connectSuccess) {
      return;
    }

    nftFormModule.setShowModal(true);
  }
}
</script>
