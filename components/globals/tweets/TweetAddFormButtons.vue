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
    <links @onImageClick="$emit('onImageClick')" />
    <div class="tweet-add__send d-flex align-center">
      <!--Progress
      v-if="!labelShow"
      :value="count"
      :radius="radius"
      :stroke-width="strokeWidth"
      :stroke-color="strokeColor"
      >
        <div class="content">{{ input.length }}</div>
      </Progress-->
      <button
        type="button"
        class="post-follow-top__link btn btn_blue btn_blue--bg"
        :disabled="!disabled"
        @click="$emit('onButtonSubmit')"
      >
        Tweet
      </button>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    links: async () =>
      await import('@/components/globals/tweets/TweetAddPostLinks')
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
