<template>
  <div>
    <div v-if="isAuth" class="profile-bottom">
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
      <router-link
        to="/messages"
        class="profile__send btn_profile btn btn_blue"
      >
        <img src="@/assets/img/profile__send_img.svg" alt="" />
        <span> Send message </span>
      </router-link>
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
      $('.profile-bottom').slideUp()
      $('.creat-post-form').slideDown(300)
    } else {
      $('.creat-post-form').slideUp()
      $('.profile-bottom').slideDown(300)
    }
  }

  // methods

  showForm() {
    this.isFormShown = true
  }

  closeForm() {
    this.isFormShown = false
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
