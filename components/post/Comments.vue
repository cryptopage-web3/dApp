<template>
  <div ref="root" class="post-bottom">
    <div class="post-like-dis">
      <a href="#" class="post-like" @click.prevent="onLike">
        <img src="@/assets/img/post-like_img1.png" alt="" />
        <span> {{ likes }} </span>
      </a>
      <a href="#" class="post-dis" @click.prevent="onDislike">
        <img src="@/assets/img/post-like_img2.png" alt="" />
        <span> {{ dislikes }} </span>
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
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Inject } from 'vue-typedi'
import { TransactionType } from '~/logic/transactions/types'
import NFTService from '~/logic/nft/services'
import tokens from '~/logic/tokens'

@Component({})
export default class Comments extends Vue {
  loading = false
  comment = ''
  like = true
  clickOutsideListener: ((event: JQuery.ClickEvent) => void) | null = null

  $refs!: {
    root: HTMLDivElement
    comment: HTMLDivElement
  }

  @Prop({ required: true }) readonly transaction!: TransactionType

  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  get likes(): number {
    return Number(this.transaction.nft?.comments?.likes)
  }

  get dislikes(): number {
    return Number(this.transaction.nft?.comments?.dislikes)
  }

  mounted() {
    this.$nextTick(() => {
      this.clickOutsideListener = this.clickOutsideHandler.bind(this)
      $(document).on('click', this.clickOutsideListener)
    })
  }

  beforeDestroy() {
    if (!this.clickOutsideListener) {
      return
    }

    $(document).off('click', this.clickOutsideListener)
    this.clickOutsideListener = null
  }

  // methods

  onLike() {
    this.like = true

    setTimeout(() => {
      $(this.$refs.root).find('.post-dis').fadeOut(0)
      $(this.$refs.root).find('.post-comment').fadeIn(300)
      $(this.$refs.root).find('.post-comment__input')[0].focus()
      $(this.$refs.root).addClass('active')
    })
  }

  onDislike() {
    this.like = false

    setTimeout(() => {
      $(this.$refs.root).find('.post-comment').fadeIn(300)
      $(this.$refs.root).find('.post-comment__input')[0].focus()
      $(this.$refs.root).addClass('active')
    })
  }

  close() {
    $(this.$refs.root).removeClass('active')
    $(this.$refs.root).find('.post-comment').fadeOut(300)
    $(this.$refs.root).find('.post-dis').fadeIn(300)

    // reset form

    this.resetForm()
  }

  clickOutsideHandler(event: JQuery.ClickEvent) {
    if (
      !$(event.target).closest('.post-comment-wr').length &&
      $(this.$refs.comment).is(':visible') &&
      !this.loading
    ) {
      this.close()
    }
  }

  resetForm() {
    this.comment = ''
    this.like = true
  }

  submit() {
    if (!this.comment) {
      this.$notify({
        type: 'error',
        title: 'Empty comment'
      })
      return
    }

    if (!this.transaction.token?.id) {
      this.$notify({
        type: 'error',
        title: 'Incorrect NFT token',
        text: 'Please reload page'
      })
      return
    }

    this.loading = true

    // send comment

    this.nftService.sendNFTComment({
      params: {
        from: this.$store.getters['auth/selectedAddress'],
        tokenId: String(this.transaction.token.id),
        comment: this.comment,
        like: this.like
      },
      callback: ({ status, txHash }) => {
        const title = txHash || 'Unknown hash'

        switch (status) {
          case 'pending':
            this.$notify({
              type: 'info',
              title,
              text: 'Transaction on pending'
            })
            break

          case 'success':
            this.$notify({
              type: 'success',
              title,
              text: 'Transaction completed'
            })

            /** обновляем данные по NFT для получения актуальной статистики по комментам */

            setTimeout(() => {
              this.$store.dispatch(
                'address/refreshERC721Transaction',
                this.transaction.hash
              )

              this.$notify({
                type: 'info',
                title,
                text: 'Refreshing NFT'
              })
            }, 500)

            break

          case 'error':
            this.$notify({
              type: 'error',
              title,
              text: 'Transaction has some error'
            })
            break
        }

        if (status !== 'pending') {
          this.loading = false
          this.close()
        }
      }
    })
  }
}
</script>
