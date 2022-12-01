<template>
  <div class="transactions__empty-block">
    <div v-if="isNft" class="global-text mb_30 text-center">
      There is not a single NFT on
      {{ isOwner ? 'your' : 'user' }} address<br />
      you can {{ isOwner ? 'create' : 'send' }} it here
    </div>

    <div v-if="isTransaction" class="global-text mb_30 text-center">
      There is not a single Transaction on
      {{ isOwner ? 'your' : 'user' }} address<br />
      you can {{ isOwner ? 'create' : 'send' }} it here by
    </div>

    <div v-if="isReaction" class="global-text mb_30 text-center">
      There is not a single {{ isOwner ? 'Your' : 'User' }} Reaction on any
      NFT's<br />
      You can {{ isOwner ? 'create' : 'send' }} NFT to get reaction from another
      users
    </div>

    <div class="text-center">
      <a href="#" class="btn-blue_button btn_large" @click.prevent="showModal">
        + {{ isOwner ? 'Create' : 'Send' }} NFT
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop } from 'nuxt-property-decorator';
import { addressModule, authModule } from '~/store';

@Component({})
export default class EmptyNfts extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly isTransaction!: false;

  @Prop({ type: Boolean, default: false })
  readonly isNft!: false;

  @Prop({ type: Boolean, default: false })
  readonly isReaction!: false;

  get isOwner(): boolean {
    return (
      authModule.address.toLowerCase() === addressModule.address.toLowerCase()
    );
  }

  get isAuth(): boolean {
    return authModule.isAuth;
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

  @Emit('show-modal')
  emitShowModal() {
    return true;
  }

  // methods

  validateCreateNFT() {
    if (!this.isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to create NFTs',
      });

      return false;
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

      return false;
    }

    return true;
  }

  showModal() {
    if (!this.validateCreateNFT()) {
      return;
    }

    this.emitShowModal();
  }
}
</script>
