<template>
  <div class="post-bottom">
    <div class="post-like-dis">
      <a href="#" class="post-like" @click.prevent="onLike">
        <img src="@/assets/img/post-like_img1.png" alt="" />
        <span> 0 </span>
      </a>
      <a href="#" class="post-dis" @click.prevent="onDislike">
        <img src="@/assets/img/post-like_img2.png" alt="" />
        <span> 0 </span>
      </a>
    </div>
    <div class="post-comment">
      <form>
        <div class="post-comment-wr">
          <input
            v-model="comment"
            :disabled="loading"
            type="text"
            placeholder="Your comment text"
            class="post-comment__input"
          />
          <button
            :disabled="loading"
            class="post-comment__btn"
            @click.prevent="submit"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <template v-else>Send</template>
          </button>
          <div
            v-if="!loading"
            class="post-comment__close"
            @click.prevent="close"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    comment: '',
    like: true
  }),

  methods: {
    onLike(event) {
      this.like = true

      const targetEl = event.target
      $(targetEl).closest('.post-like-dis').find('.post-dis').fadeOut(0)
      $(targetEl).closest('.post-bottom').find('.post-comment').fadeIn(300)
      $(targetEl).closest('.post-bottom').addClass('active')
    },

    onDislike(event) {
      this.like = false

      const targetEl = event.target
      $(targetEl).closest('.post-bottom').find('.post-comment').fadeIn(300)
      $(targetEl).closest('.post-bottom').addClass('active')
    },

    close(event) {
      const targetEl = event.target
      $(targetEl).closest('.post-bottom').removeClass('active')
      $(targetEl).closest('.post-bottom').find('.post-comment').fadeOut(300)
      $(targetEl).closest('.post-bottom').find('.post-dis').fadeIn(300)
    },

    submit() {
      if (!this.comment) {
        this.$notify({
          type: 'error',
          title: 'Empty comment'
        })
        return
      }

      this.loading = true
      // console.log(this.comment)
      // debugger
    }
  }
}
</script>
