<template>
  <div class="room form">
    <input v-model="address" placeholder="0x..." />
    <button
      class="btn btn_blue btn_transparent post-follow-top__link"
      @click="createRoom"
    >
      Send invite
    </button>
  </div>
</template>
<script>
export default {
  data: () => ({
    address: ''
  }),
  computed: {
    dataExist() {
      return this.address && this.$store.getters['auth/selectedAddress']
    },
    addressValid() {
      return this.$web3.utils.isAddress(this.address)
    },
    addressesNotEquals() {
      return this.address !== this.$store.getters['auth/selectedAddress']
    }
  },
  methods: {
    createRoom() {
      const selectedAddress = this.$store.getters['auth/selectedAddress']
      if (this.dataExist && this.addressesNotEquals)
        if (this.addressValid) {
          this.$createRoom(
            this.$web3.utils.toChecksumAddress(selectedAddress),
            this.$web3.utils.toChecksumAddress(this.address)
          )
          this.address = ''
        } else {
          this.$notify({
            type: 'error',
            title: 'Please, enter valid address'
          })
        }
    }
  }
}
</script>
<style>
.room.form {
  background-color: #fff;
}
.room.form button {
  margin: 0 0.5em;
}
.room.form input {
  width: 175px;
  padding: 0.6em 1em;
  border-radius: 1.5em;
  background-color: #ecf1f4;
  border: none;
}
</style>
