<template>
  <div>
    <div v-if="!!!sender || !!!receiver" style="text-align: center">
      Loading ...
    </div>
    <messages
      v-if="!!sender && !!receiver"
      :room-name="$route.params.room"
      :sender="sender"
      :receiver="receiver"
    />
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data: () => ({
    sender: null,
    receiver: null
  }),
  fetchOnServer: false,
  async mounted() {
    await this.$nextTick(async () => {
      await setTimeout(async () => {
        const members = this.$route.params.room // await this.$getRoom(this.$route.params.room)
        const [sender, receiver] = members.split('.')
        if (!!sender && !!receiver) {
          if (sender === this.$store.getters['auth/selectedAddress']) {
            await this.getKeysByAddress(sender)
            this.receiver = { address: receiver }
            this.$getKeysByAddress(receiver.toLowerCase(), this.setReceiver)
          } else {
            await this.getKeysByAddress(receiver)
            this.receiver = { address: sender }
            this.$getKeysByAddress(sender.toLowerCase(), this.setReceiver)
          }
        }
      }, 1000)
    })
  },
  methods: {
    async getKeysByAddress(address) {
      address = address.toLowerCase()
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
    },
    setReceiver(receiver) {
      Object.assign(this.receiver, receiver)
    }
  }
}
</script>
