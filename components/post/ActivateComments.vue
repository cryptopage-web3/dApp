<template>
  <div
    class="post-activate-comments"
    :class="{ 'post-activate-comments_loading': loading }"
    @click="toggle"
  >
    <div class="post-activate-comments__label">Activate comments</div>
    <div
      class="post-activate-comments__switch"
      :class="{ 'post-activate-comments__switch_selected': activated }"
    />
    <span
      v-if="loading"
      class="
        spinner-border spinner-border-sm
        text-primary
        post-activate-comments__spinner
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
export default class ActivateComments extends Vue {
  activated = false
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

    this.activated = true
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
