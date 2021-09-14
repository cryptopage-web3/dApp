<template>
  <button
    :class="cssClass"
    :type="type"
    :disabled="disabled"
    @click="$emit('onSubmit')"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    cssClass: {
      type: String,
      default: 'post-follow-top__link btn btn_blue btn_transparent'
    },
    text: {
      type: String,
      default: 'Tweet'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
