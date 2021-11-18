<template>
  <div
    class="post-enable-comments"
    :class="{ 'post-enable-comments_loading': loading }"
    @click="toggle"
  >
    <div class="post-enable-comments__label">Enable comments</div>
    <div
      class="post-enable-comments__switch"
      :class="{ 'post-enable-comments__switch_selected': enabled }"
    />
    <span
      v-if="loading"
      class="
        spinner-border spinner-border-sm
        text-primary
        post-enable-comments__spinner
      "
      role="status"
      aria-hidden="true"
    ></span>
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
export default class EnableComments extends Vue {
  enabled = false
  loading = false

  @Prop({ required: true }) readonly transaction!: TransactionType

  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  // methods

  toggle() {
    if (this.loading) {
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

    this.enabled = true
    this.loading = true

    // activate comments

    this.nftService.activateComments({
      params: {
        from: this.$store.getters['auth/selectedAddress'],
        tokenId: String(this.transaction.token.id)
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
        }
      }
    })
  }
}
</script>
