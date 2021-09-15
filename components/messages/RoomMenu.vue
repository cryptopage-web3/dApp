<template>
  <div>
    <room-item
      v-for="room in rooms"
      :key="room"
      :room="room"
      @onClick="handleSelectRoom"
    />
  </div>
</template>
<script>
export default {
  components: {
    roomItem: async () => await import('@/components/messages/RoomMenuItem')
  },
  props: {
    rooms: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelectRoom(event) {
      this.$emit('handleSelectRoom', event)
    }
  }
}
</script>
