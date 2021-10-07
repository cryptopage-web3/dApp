<template>
  <div>
    <div class="profile-bottom">
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
      <div class="profile-form__container"></div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isOwner() {
      return (
        this.$store.getters['transactions/address'] ===
        this.$store.getters['auth/selectedAddress']
      )
    }
  },
  methods: {
    showCreateForm() {
      console.log('showCreateForm')
    },
    showSendNft() {
      console.log('showSendNft')
    }
  }
}
</script>
