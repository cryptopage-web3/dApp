<template>
  <div ref="root" class="post-bottom">
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
    <div ref="comment" class="post-comment">
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
    like: true,
    clickOutsideListener: null
  }),

  mounted() {
    this.$nextTick(() => {
      this.clickOutsideListener = this.clickOutsideHandler.bind(this)
      $(document).on('click', this.clickOutsideListener)
    })
  },

  beforeDestroy() {
    $(document).off('click', this.clickOutsideListener)
    this.clickOutsideListener = null
  },

  methods: {
    onLike() {
      this.like = true

      setTimeout(() => {
        $(this.$refs.root).find('.post-dis').fadeOut(0)
        $(this.$refs.root).find('.post-comment').fadeIn(300)
        $(this.$refs.root).addClass('active')
      })
    },

    onDislike() {
      this.like = false

      setTimeout(() => {
        $(this.$refs.root).find('.post-comment').fadeIn(300)
        $(this.$refs.root).addClass('active')
      })
    },

    close() {
      $(this.$refs.root).removeClass('active')
      $(this.$refs.root).find('.post-comment').fadeOut(300)
      $(this.$refs.root).find('.post-dis').fadeIn(300)

      // reset form

      this.resetForm()
    },

    clickOutsideHandler(event) {
      if (
        !$(event.target).closest('.post-comment-wr').length &&
        $(this.$refs.comment).is(':visible') &&
        !this.loading
      ) {
        this.close()
      }
    },

    resetForm() {
      this.comment = ''
      this.like = true
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
    }
  }
}
</script>
