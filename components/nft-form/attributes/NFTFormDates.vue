<template>
  <div class="nft-form__attribute">
    <div class="nft-form__attribute-header" @click="toggle">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Traits with date"
      >
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
  mounted() {
    this.$nextTick(() => {
      $(this.$refs.icon).tooltip({
        trigger: 'hover'
      })
    })
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    }
  }
}
</script>
