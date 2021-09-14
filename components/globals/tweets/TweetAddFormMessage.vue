<template>
  <div class="tweet-add__message">
    <label v-if="!disabled"> What's happening? </label>
    <span
      id="input"
      class="tweet-add__input"
      :style="`min-height: ${minHeight}px`"
      contenteditable="true"
      @input="$emit('onMessageUpdate', $event.target.innerHTML)"
    />
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: 100
    }
  }
}
</script>
