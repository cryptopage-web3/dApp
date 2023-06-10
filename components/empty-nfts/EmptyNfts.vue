<template>
  <div class="transactions__empty-block">
    <div v-if="isNft" class="global-text mb_30 text-center">
      There is not a Content on
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
        + {{ isOwner ? 'Create' : 'Send' }} Content
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { addressModule, authModule, nftFormModule } from '~/store';

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
