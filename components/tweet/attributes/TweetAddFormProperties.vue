<template>
  <div class="tweet-add__attribute">
    <div class="tweet-add__attribute-header" @click="toggle">
      <div class="tweet-add__attribute-header-icon">
        <font-awesome-icon :icon="['fas', 'tag']" />
      </div>
      <div class="tweet-add__attribute-header-title">Properties</div>
      <div class="tweet-add__attribute-header-arrow">
        <font-awesome-icon
          :icon="['fas', isShow ? 'chevron-up' : 'chevron-down']"
        />
      </div>
    </div>
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
