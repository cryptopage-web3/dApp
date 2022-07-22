<template>
  <div class="form-creat">
    <div
      v-if="isDisabled"
      class="form-creat__block"
      @click.prevent="showDisableNotify"
    />
    <NftFormTitle :is-owner="isOwner" />
    <NftFormDescription />
    <div class="form-creat-bottom">
      <div class="form-creat-nav">
        <a href="#" class="form-creat-nav-item stroke">
          <NftFormAudioIcon />
        </a>
        <a href="#" class="form-creat-nav-item all">
          <NftFormImageIcon />
        </a>
        <a href="#" class="form-creat-nav-item all">
          <NftFormVideoIcon />
        </a>
        <a
          href="#"
          role="button"
          data-toggle="modal"
          data-target="#modal-creat-nft"
          class="form-creat-nav-item form-creat-nav-item-js fill"
        >
          <NftFormSettingIcon />
        </a>
      </div>
      <div class="form-creat-btns">
        <a
          href="#"
          class="btn btn-blue-transparent_button form-creat__cancel btn_large form-creat-cancel-js w_xl_100 w_sm_80 w_80 mr_5 mr_md_15"
        >
          Cancel
        </a>
        <a
          href="#"
          class="btn btn_large btn_default form-creat__plus disabled w_xl_100 w_sm_80 w_80"
          @click.prevent="createNft"
        >
          {{ isOwner ? 'Create' : 'Send' }}
        </a>
      </div>
    </div>

    <nft-form-modal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import NftFormTitle from './NftFormTitle.vue';
import NftFormDescription from './NftFormDescription.vue';
import { addressModule, authModule, nftFormModule } from '~/store';
import { nftFormInit } from '~/utils/nftForm';
import NftFormAudioIcon from '~/components/icon/nft-form/NftFormAudioIcon.vue';
import NftFormImageIcon from '~/components/icon/nft-form/NftFormImageIcon.vue';
import NftFormVideoIcon from '~/components/icon/nft-form/NftFormVideoIcon.vue';
import NftFormSettingIcon from '~/components/icon/nft-form/NftFormSettingIcon.vue';

@Component({
  components: {
    NftFormAudioIcon,
    NftFormImageIcon,
    NftFormVideoIcon,
    NftFormSettingIcon,
    NftFormTitle,
    NftFormDescription,
  },
})
export default class NftForm extends Vue {
  mounted() {
    nftFormInit();
  }

  get isAuth(): boolean {
    return authModule.isAuth;
  }

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() ===
        addressModule.address.toLowerCase() &&
      authModule.chainSlug === addressModule.chainSlug
    );
  }

  get isSameChain(): boolean {
    return authModule.chainSlug === addressModule.chainSlug;
  }

  get authChainName(): string {
    return authModule.chainName;
  }

  get addressChainName(): string {
    return addressModule.chainName;
  }

  get isDisabled(): boolean {
    return !this.isAuth || !this.isSameChain;
  }

  showDisableNotify() {
    if (!this.isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to create NFTs',
      });

      return true;
    }

    if (!this.isSameChain) {
      this.$notify({
        type: 'error',
        title: `Active chain - ${this.authChainName}<br>
          You are trying ${
            this.isOwner ? 'create' : 'send'
          } nft to account with chain ${this.addressChainName}<br>
          Please connect to ${this.addressChainName}
        `,
      });

      return true;
    }

    return false;
  }

  createNft() {
    console.log(nftFormModule.values);
  }
}
</script>
