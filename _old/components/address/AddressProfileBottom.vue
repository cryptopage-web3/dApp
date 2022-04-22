<template>
  <div>
    <div class="profile-bottom">
      <a
        v-if="isOwner"
        href="#"
        class="profile__add btn_profile btn btn_blue"
        @click.prevent="showForm"
      >
        <img src="@/assets/img/profile__add_img.svg" alt="" />
        <span> Create </span>
      </a>
      <a
        v-else
        href="#"
        class="profile__add btn_profile btn btn_blue"
        @click.prevent="showForm"
      >
        <img src="@/assets/img/profile__add_img.svg" alt="" />
        <span> Send </span>
      </a>
      <a
        href="#"
        class="profile__send btn_profile btn btn_blue"
        @click.prevent="sendMessage"
      >
        <img src="@/assets/img/profile__send_img.svg" alt="" />
        <span> Send message </span>
      </a>
    </div>
    <div class="creat-post-form">
      <nft-form
        :is-send-to="!isOwner"
        @canceled="closeForm"
        @submited="nftSubmitedHandler"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import TypedStore from '~/logic/store'

@Component({
  components: {
    'nft-form': async () => await import('~/components/nft-form/NFTForm.vue')
  }
})
export default class AddressProfileBottom extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  isFormShown = false

  // computed

  get isOwner(): boolean {
    return (
      String(this.typedStore.address.address).toLowerCase() ===
      String(this.typedStore.auth.selectedAddress).toLowerCase()
    )
  }

  get isSameChain(): boolean {
    return (
      String(this.typedStore.address.chainId).toLowerCase() ===
      String(this.typedStore.auth.chainId).toLowerCase()
    )
  }

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  get selectedNetworkName(): string {
    return this.typedStore.auth.selectedNetworkName
  }

  get networkName(): string {
    return this.typedStore.address.networkName
  }

  // watch

  @Watch('isFormShown')
  onIsFormShownChanged(isShown: boolean) {
    if (isShown) {
      $('.profile-bottom').slideUp()
      $('.creat-post-form').slideDown(300)
    } else {
      $('.creat-post-form').slideUp()
      $('.profile-bottom').slideDown(300)
    }
  }

  // methods

  showForm() {
    if (!this.isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to create NFTs'
      })
      ;($('#modal-connect') as any).modal('show')
      return
    }

    if (!this.isSameChain) {
      this.$notify({
        type: 'error',
        title: `Active chain - ${this.selectedNetworkName}<br>
          You are trying ${
            this.isOwner ? 'create' : 'send'
          } nft to account with chain ${this.networkName}<br>
          Please connect to ${this.networkName}
        `
      })
      return
    }

    this.isFormShown = true
  }

  closeForm() {
    this.isFormShown = false
  }

  sendMessage() {
    if (!this.isAuth) {
      this.$notify({
        type: 'error',
        title: 'Need to connect a wallet to send a message'
      })
      ;($('#modal-connect') as any).modal('show')
      return
    }

    this.$notify({
      type: 'error',
      title: 'Sending a message is temporarily unavailable'
    })
  }

  nftSubmitedHandler() {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      100
    )
  }
}
</script>
