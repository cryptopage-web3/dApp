<template>
  <div class="post-text-block">
    <div class="post-text">{{ transaction.nft.description }}</div>
    <div v-if="show" class="post-text-right">
      <div
        class="post-text__link"
        @click="deleteNFT(transaction, selectedAddress)"
      >
        <img src="@/assets/img/post-text__link_img1_2.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Inject } from 'vue-typedi'
import { Component, mixins } from 'nuxt-property-decorator'
import TransactionMixin from '~/mixins/transaction'
import NFTService from '~/logic/nft/services'
import tokens from '~/logic/tokens'
import { TransactionType } from '~/logic/transactions/types'

@Component({})
export default class PostTextBlock extends mixins(TransactionMixin) {
  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  public get show() {
    if (this.transaction) {
      const ownerAddress = this.transaction?.nft?.owner.toLowerCase()
      const selectedAddress = this.selectedAddress.toLowerCase()
      return ownerAddress === selectedAddress
    }
    return false
  }

  public deleteNFT = async (
    transaction: TransactionType,
    from: string
  ): Promise<void> => {
    const tokenId = String(transaction?.token?.id)
    const callback = ({
      status,
      txHash
    }: {
      status: string
      txHash: string
    }) => {
      console.log('status', status)
      console.log('txHash', txHash)
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
          break

        case 'error':
          this.$notify({
            type: 'error',
            title,
            text: 'Transaction has some error'
          })
          break
      }
    }
    let txHash: string
    await this.nftService.delete({
      params: { tokenId, from },
      callbacks: {
        onTransactionHash(hash: string) {
          txHash = hash
          callback({
            status: 'pending',
            txHash
          })
        },
        onReceipt() {
          callback({
            status: 'success',
            txHash
          })
        },
        onError() {
          callback({
            status: 'error',
            txHash
          })
        }
      }
    })
  }
}
</script>
<style>
.post-text__link {
  cursor: pointer;
}
</style>
