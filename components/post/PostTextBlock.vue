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
import { TransactionType } from '~/logic/transaction/types'

@Component()
export default class PostTextBlock extends mixins(TransactionMixin) {
  @Inject(tokens.NFT_SERVICE)
  public nftService!: NFTService

  public get show() {
    const ownerAddress = this.transaction.nft.owner.toLowerCase()
    console.log('ownerAddress', ownerAddress)
    const selectedAddress = this.selectedAddress.toLowerCase()
    console.log('selectedAddress', selectedAddress)
    return ownerAddress === selectedAddress
  }

  public deleteNFT = async (
    transaction: TransactionType,
    from: string
  ): void => {
    console.log('this.selectedAddress', this.selectedAddress)
    console.log('transaction', transaction)
    const tokenId = transaction.token.id
    console.log('delete', tokenId, from)
    const callback = ({ status, txHash }) => {
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
    await this.nftService.delete({
      params: { tokenId, from },
      callbacks: {
        onTransactionHash(txHash: string) {
          console.log('txHash', txHash)
          // txHash = hash

          callback({
            status: 'pending',
            txHash
          })
        },
        onReceipt(params) {
          console.log('params in onReceipt', params)
          callback({
            status: 'success',
            txHash: 'txHash'
          })
        },
        onError(params) {
          console.log('params in onError', params)
          callback({
            status: 'error',
            txHash: 'txHash'
          })
        }
      }
    })
  }
}
</script>
