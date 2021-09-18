<template>
  <div
    class="
      tweet-add__buttons
      d-flex
      align-center
      justify-space-between
      flex-wrap
    "
  >
    <div class="tweet-add__post-links">
      <a class="post-link post-link_blue" @click="$emit('onImageClick')">
        <div>
          <icon type="uploadImage" />
        </div>
      </a>
    </div>
    <div class="tweet-add__send d-flex align-center">
      <button
        type="button"
        class="post-follow-top__link btn btn_blue btn_blue--bg"
        :disabled="!disabled"
        @click="$emit('onButtonSubmit')"
      >
        Send crypto-post
      </button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Icon: async () => await import('@/components/icons/Icon')
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
