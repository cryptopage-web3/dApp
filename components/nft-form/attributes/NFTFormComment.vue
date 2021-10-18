<template>
  <div class="nft-form__attribute" @click="toggle">
    <div class="nft-form__attribute-header">
      <div
        ref="icon"
        class="nft-form__attribute-header-icon"
        title="Availability to add a comment"
      >
        <font-awesome-icon :icon="['fas', 'comments']" />
      </div>
      <div class="nft-form__attribute-header-title">Сomments</div>
      <div class="nft-form__attribute-header-arrow">
        <div
          class="nft-form__сomments-switch"
          :class="{ 'nft-form__сomments-switch_selected': value }"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean
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
      this.$emit('input', !this.value)
    }
  }
}
</script>
