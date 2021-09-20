<template>
  <div class="room" @click="onClick">
    <jazzicon :seed="10211" :diameter="35" :address="receiverAddress" />
    <div>{{ roomName }}</div>
  </div>
</template>
<script>
import { shortAddress } from '~/utils/web3'
export default {
  props: {
    room: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    senderAddress: '',
    receiverAddress: '',
    roomName: '',
    members: ''
  }),
  async fetch() {
    // db+54dmjgt9+y93YIYzdGbI0Kvdgjb5ESLAd8Y9acAc=
    this.members = await this.$getRoom(this.room)
    const [sender, receiver] = this.members.split('.')
    const selectedAddress = this.$store.getters['auth/selectedAddress']
    if (sender.toLowerCase() === selectedAddress.toLowerCase()) {
      this.senderAddress = sender
      this.receiverAddress = receiver
      this.roomName = shortAddress(receiver, 15, 7)
    } else {
      this.senderAddress = receiver
      this.receiverAddress = sender
      this.roomName = shortAddress(sender, 15, 7)
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick', {
        room: this.room,
        sender: this.senderAddress.toLowerCase(),
        receiver: this.receiverAddress.toLowerCase()
      })
    }
  }
}
</script>
<style>
.room {
  cursor: pointer;
  width: 300px;
  padding: 0.5em 0;
  margin: 0.25em;
  border-radius: 1.5em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ecf1f4;
}
</style>
