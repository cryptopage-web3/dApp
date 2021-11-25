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
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { Inject } from 'vue-typedi'
import { TransactionType } from '~/logic/transactions/types'
import TypedStoreMixin from '~/mixins/typed-store'
import NFTService from '~/logic/nft/services'
import tokens from '~/logic/tokens'

@Component({})
export default class ActivateComments extends mixins(TypedStoreMixin) {
  activated = false
  loading = false

  @Prop({ required: true }) readonly transaction!: TransactionType

  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  public nftContractAddress = ''

  async mounted() {
    const slug = this.typedStore.auth.selectedNetworkSlug
    const contract = await import(`../../contracts/${slug}/PageNFT.json`)
    this.nftContractAddress = contract.address
  }

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
        nftContractAddress: this.nftContractAddress,
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

            this.refreshNft()
            break

          case 'error':
            this.$notify({
              type: 'error',
              title,
              text: 'Transaction has some error'
            })

            this.loading = false
            this.activated = false
            break
        }
      }
    })
  }

  refreshNft() {
    this.$notify({
      type: 'info',
      title: 'Refreshing NFT'
    })

    setTimeout(async () => {
      try {
        await this.$store.dispatch(
          'address/refreshERC721Transaction',
          this.transaction.hash
        )

        this.$notify({
          type: 'success',
          title: 'NFT successfully updated'
        })
      } catch {
        this.$notify({
          type: 'error',
          title: 'NFT update error',
          text: 'Please reload page'
        })
      } finally {
        this.loading = false
      }
    }, 1000)
  }
}
</script>
