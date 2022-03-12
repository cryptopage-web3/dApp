<template>
  <div>
    <div class="messanger">
      <div class="rooms">
        <generate-key-pair
          v-if="!sender && !loading"
          @onGenerateKeyPair="handleSenderKeys"
        />
        <room-form v-if="sender && sender.epub" />
        <room-menu :rooms="rooms" @handleSelectRoom="handleSelectRoom" />
      </div>
      <div>
        <messages
          v-if="sender && receiver && room"
          :room="room"
          :sender="sender"
          :receiver="receiver"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    roomForm: async () => await import('@/components/messages/RoomForm'),
    generateKeyPair: async () =>
      await import('@/components/messages/GenerateKeyPair'),
    messages: async () => await import('@/components/messages/Messages'),
    roomMenu: async () => await import('@/components/messages/RoomMenu')
  },
  middleware: 'auth',
  fetchOnServer: false,
  data: () => ({
    rooms: [],
    room: '',
    loading: true,
    sender: null,
    receiver: null
  }),
  watch: {
    pair: {
      deep: true,
      handler(pair) {
        if (!pair) {
          this.$notify({
            type: 'error',
            title: "Can't restore keys. Try again later"
          })
        }
      }
    }
  },
  async mounted() {
    await this.$nextTick(async () => {
      const address = this.$store.getters['auth/selectedAddress']
      await setTimeout(async () => {
        const data = await this.$sea.work(address, address)
        const password = await this.$provider.provider.request({
          method: 'personal_sign',
          params: [data, address]
        })
        const self = this
        if (this.$gun.user().is) {
          self.sender = self.$gun.user()._.sea
          self.sender.address = address
        } else {
          this.$gun.user().auth(address, password, (data) => {
            if (!data.err) {
              self.sender = self.$gun.user()._.sea
              self.sender.address = address
            }
          })
        }
        this.$getRooms(address, this.rooms)
        this.loading = false
      }, 1000)
    })
  },
  methods: {
    handleSenderKeys(keyPair) {
      if (keyPair && keyPair.pub) {
        this.sender = keyPair
        this.sender.address = this.$store.getters['auth/selectedAddress']
      }
    },
    handleRecieverKeys(keyPair) {
      if (keyPair && keyPair.pub) Object.assign(this.receiver, keyPair)
    },
    handleSelectRoom(data) {
      this.receiver = {}
      this.room = data.room
      this.$getKeysByAddress(data.receiver, this.handleRecieverKeys)
      Object.assign(this.receiver, { address: data.receiver })
    }
  }
}
</script>
<style>
.rooms {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.messanger {
  display: flex;
}
</style>
