<template>
  <div class="tweet-add__attributes">
    <div class="tweet-add__attributes-toggle" @click="toggle">
      <div class="tweet-add__attributes-toggle-icon">
        <font-awesome-icon
          :icon="['fas', isShow ? 'caret-up' : 'caret-down']"
        />
      </div>
      <div class="tweet-add__attributes-toggle-text">Extended fields</div>
    </div>
    <div v-if="isShow" class="tweet-add__attributes-container">Fields</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    }
  }
}
</script>
