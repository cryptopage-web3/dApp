<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div class="nft-form__attribute-header-icon">
        <font-awesome-icon :icon="['fas', 'calendar']" />
      </div>
      <div class="nft-form__attribute-header-title">Dates</div>
      <div class="nft-form__attribute-header-arrow">
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
