<template>
  <div class="profile-top">
    <div class="profile-left">
      <div class="profile__thumb">
        <img v-if="image" :src="image" />
        <jazzicon
          v-else
          :seed="10211"
          :address="address"
          :diameter="diameter"
        />
      </div>
      <div class="profile-info">
        <div class="profile-info__title">
          <span
            ref="address"
            class="profile-info__title-address"
            @click.prevent="copyAddress"
          >
            {{ address | shortAddress }}
          </span>
          <mark v-if="tokenName">({{ tokenName }})</mark>
        </div>
        <div class="profile-info__text">
          <div class="profile-info__text-total">
            <loader v-if="loadingInfo" :height="10" :width="140" />
            <div v-show="!loadingInfo">
              <strong title="Total number of sent transactions">{{
                transactionsCount | humanizeCount
              }}</strong>
              sent transactions
            </div>
          </div>
          <div class="profile-info__text-input">
            <loader v-if="loadingInfo" :height="10" :width="230" />
            <div v-show="!loadingInfo">
              <strong
                title="Number of unique addresses from which transactions got. Checked only loaded transactions from Transactions tab."
                >{{ inputAddressesCount | humanizeCount }}</strong
              >
              inputs /
              <strong
                title="Number of unique addresses to which transactions sent. Checked only loaded transactions from Transactions tab."
                >{{ outputAddressesCount | humanizeCount }}</strong
              >
              outputs from
              <strong
                title="Number of loaded transactions in the Transactions tab"
              >
                {{ loadedTransactionsCount }}
              </strong>
              loaded normal transactions
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-right">
      <profile-status v-if="!tokenName" />
      <a href="#" class="profile-ring">
        <img src="@/assets/img/profile-ring_img2.svg" alt="" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import { copyToClipboard } from '~/utils/copyToClipboard'
import TypedStore from '~/logic/store'

@Component({
  components: {
    'nft-form': async () => await import('@/components/nft-form/NFTForm.vue'),
    'profile-status': async () =>
      await import('@/components/address/AddressProfileStatus.vue'),
    loader: () => import('~/components/loaders/Skeleton.vue')
  }
})
export default class AddressProfileTop extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  diameter = Number($(window).width()) > 767 ? 90 : 50

  $refs!: {
    address: HTMLSpanElement
  }

  get address(): string {
    return this.typedStore.address.address
  }

  get image(): string {
    return this.typedStore.address.image
  }

  get loadingInfo(): boolean {
    return this.typedStore.address.loadingInfo
  }

  get transactionsCount(): number {
    return this.typedStore.address.transactionsCount
  }

  get loadedTransactionsCount(): number {
    return this.typedStore.address.normalTransactions.length
  }

  get inputAddressesCount(): number {
    return this.typedStore.address.inputAddressesCount
  }

  get outputAddressesCount(): number {
    return this.typedStore.address.outputAddressesCount
  }

  get tokenName(): string {
    const tokenName = this.typedStore.address.name
    const tokenSymbol = this.typedStore.address.symbol
    return tokenName && tokenSymbol ? `${tokenSymbol} - ${tokenName}` : ''
  }

  mounted() {
    this.$nextTick(() => {
      /** tooltip копирование адреса */
      ;($(this.$refs.address) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy'
      })

      /** tooltip количества уникальных адресов */
      ;($('.profile-info__text strong') as any).tooltip({
        trigger: 'hover'
      })
    })
  }

  // methods

  copyAddress() {
    copyToClipboard(this.address)
    ;($(this.$refs.address) as any).tooltip('hide')

    this.$notify({
      type: 'success',
      title: 'Address copied to clipboard'
    })
  }
}
</script>
