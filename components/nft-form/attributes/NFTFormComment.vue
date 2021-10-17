<template>
  <div class="nft-form__attribute" @click="toggle">
    <div class="nft-form__attribute-header">
      <div class="nft-form__attribute-header-icon">
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
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    }
  }
}
</script>
