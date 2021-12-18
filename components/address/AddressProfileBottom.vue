<template>
  <div>
    <div v-if="isAuth" class="profile-bottom">
      <a
        v-if="isOwner"
        href="#"
        class="profile__add btn_profile btn btn_blue"
        @click.prevent="showForm"
      >
        <img src="@/assets/img/profile__add_img.png" alt="" />
        <span> Create NFT </span>
      </a>
      <a
        v-else
        href="#"
        class="profile__add btn_profile btn btn_blue"
        @click.prevent="showForm"
      >
        <img src="@/assets/img/profile__add_img.png" alt="" />
        <span> Send NFT </span>
      </a>
      <router-link
        to="/messages"
        class="profile__send btn_profile btn btn_blue"
      >
        <img src="@/assets/img/profile__send_img.png" alt="" />
        <span> Send message </span>
      </router-link>
    </div>
    <div class="profile-form">
      <div class="profile-form__container">
        <div class="profile-form__container-inner">
          <nft-form :is-send-to="!isOwner" @submited="nftSubmitedHandler" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'nuxt-property-decorator'

@Component({
  components: {
    'nft-form': async () => await import('@/components/nft-form/NFTForm.vue')
  }
})
export default class AddressProfileBottom extends Vue {
  isFormShown = false

  // computed

  get isOwner(): boolean {
    return (
      String(this.$store.getters['address/address']).toLowerCase() ===
      String(this.$store.getters['auth/selectedAddress']).toLowerCase()
    )
  }

  get isAuth(): boolean {
    return this.$store.getters['auth/isAuth']
  }

  // watch

  @Watch('isFormShown')
  onIsFormShownChanged(isShown: boolean) {
    if (isShown) {
      $('.profile-form__container-inner').slideDown(200)
    } else {
      $('.profile-form__container-inner').slideUp(100)
    }
  }

  // methods

  showForm() {
    this.isFormShown = !this.isFormShown
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
