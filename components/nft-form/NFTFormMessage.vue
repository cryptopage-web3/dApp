<template>
  <div class="nft-form__message">
    <label v-if="!value">{{ placeholder }}</label>
    <span
      ref="input"
      class="nft-form__input"
      :class="{ 'nft-form__input_single': isSingleLine }"
      contenteditable="true"
      @input="$emit('input', $event.target.innerHTML)"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Enter value'
    },
    isSingleLine: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(value) {
        this.$nextTick(() => {
          if (this.$refs.input.innerHTML !== value) {
            this.$refs.input.innerHTML = value
          }
        })
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.nft-form__input {
  min-height: 100px;
}

.nft-form__input_single {
  min-height: 50px;
}
</style>
