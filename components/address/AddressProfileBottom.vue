<template>
  <div>
    <div v-if="isAuth" class="profile-bottom">
      <a
        v-if="isOwner"
        href="#"
        class="profile__add btn_profile btn btn_blue"
        @click.prevent="showCreateForm"
      >
        <img src="@/assets/img/profile__add_img.png" alt="" />
        <span> Create NFT </span>
      </a>
      <a
        v-else
        href="#"
        class="profile__add btn_profile btn btn_blue"
        @click.prevent="showSendNft"
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
          <nft-form @submited="nftSubmitedHandler" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    'nft-form': async () => await import('@/components/nft-form/NFTForm.vue')
  },
  data: () => ({
    isCreateFormShown: false
  }),
  computed: {
    isOwner() {
      return (
        String(this.$store.getters['address/address']).toLowerCase() ===
        String(this.$store.getters['auth/selectedAddress']).toLowerCase()
      )
    },
    isAuth() {
      return this.$store.getters['auth/isAuth']
    }
  },
  watch: {
    isCreateFormShown(isShown) {
      if (isShown) {
        $('.profile-form__container-inner').slideDown(200)
      } else {
        $('.profile-form__container-inner').slideUp(100)
      }
    }
  },
  methods: {
    showCreateForm() {
      this.isCreateFormShown = !this.isCreateFormShown
    },
    showSendNft() {
      console.log('showSendNft')
    },
    nftSubmitedHandler() {
      $('html, body').animate(
        {
          scrollTop: 0
        },
        100
      )
    }
  }
}
</script>
