<template>
  <div id="__modal">
    <div class="modal-close d-flex align-center">
      <div
        class="modal-close__btn d-flex align-center justify-center"
        @click="$modal.hide('tweet')"
      >
        <icon type="close" />
      </div>
    </div>
    <TweetAddForm />
  </div>
</template>

<script>
export default {
  name: 'Tweet',
  components: {
    Icon: async () => await import('@/components/icons/Icon'),
    TweetAddForm: () => import('@/components/tweet/TweetAddForm.vue')
  }
}
</script>
