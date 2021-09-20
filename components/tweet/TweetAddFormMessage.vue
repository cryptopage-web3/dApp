<template>
  <div class="tweet-add__message">
    <label v-if="!value"> What's happening? </label>
    <span
      id="input"
      class="tweet-add__input"
      :style="`min-height: ${minHeight}px`"
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
    }
  },
  data() {
    return {
      minHeight: 100
    }
  }
}
</script>
