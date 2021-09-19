<template>
  <div class="tweet-add__message">
    <label v-if="!value">{{ placeholder }}</label>
    <span
      ref="input"
      class="tweet-add__input"
      :class="{ 'tweet-add__input_single': isSingleLine }"
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
.tweet-add__input {
  min-height: 100px;
}

.tweet-add__input_single {
  min-height: 50px;
}
</style>
