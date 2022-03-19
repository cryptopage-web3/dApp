<template>
  <div class="post-text-block">
    <div class="post-text">
      <div v-if="title" class="post-text__title">
        {{ title }}
      </div>
      <div v-if="description" class="post-text__description">
        {{ description }}
      </div>
    </div>
    <div v-if="isOwner" class="post-text-right">
      <div
        class="post-text__link"
        @click="deleteNFT(transaction, selectedAddress)"
      >
        <img src="@/assets/img/post-text__link_img1_2.svg" alt="" />
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

  get title(): string {
    return this.transaction.nft?.title || ''
  }

  get description(): string {
    return this.transaction.nft?.description || ''
  }

  get address(): string {
    return this.typedStore.address.address
  }

  get selectedAddress(): string {
    return this.typedStore.auth.selectedAddress
  }

  get selectedNetworkSlug(): string {
    return this.typedStore.auth.selectedNetworkSlug
  }

  get selectedNetworkName(): string {
    return this.typedStore.auth.selectedNetworkName
  }

  get isOwner(): boolean {
    return (
      String(this.address).toLowerCase() ===
      String(this.selectedAddress).toLowerCase()
    )
  }

  get isSameChain(): boolean {
    return (
      String(this.selectedNetworkSlug).toLowerCase() ===
      String(this.networkSlug).toLowerCase()
    )
  }

  async deleteNFT(transaction: TransactionType, from: string): Promise<void> {
    if (!this.isSameChain) {
      this.$notify({
        type: 'error',
        title: `Active chain - ${this.selectedNetworkName}<br>
          You are trying burn nft owned to account with chain ${this.networkName}<br>
          Please connect to ${this.networkName}
        `
      })
      return
    }

    const tokenId = String(transaction?.token?.id)

    const callback = ({
      status,
      txHash
    }: {
      status: string
      txHash: string
    }) => {
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
