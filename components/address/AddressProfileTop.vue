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
                title="Number of unique addresses from which transactions got. Checked only loaded transactions from all tabs."
                >{{ inputAddressesCount | humanizeCount }}</strong
              >
              inputs /
              <strong
                title="Number of unique addresses to which transactions sent. Checked only loaded transactions from all tabs."
                >{{ outputAddressesCount | humanizeCount }}</strong
              >
              outputs from
              <strong
                title="Number of loaded transactions in the transactions tab"
              >
                {{ loadedTransactionsCount }}
              </strong>
              loaded transactions
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
import { copyToClipboard } from '~/utils/copyToClipboard'

@Component({
  components: {
    'nft-form': async () => await import('@/components/nft-form/NFTForm.vue'),
    'profile-status': async () =>
      await import('@/components/address/AddressProfileStatus.vue'),
    loader: () => import('~/components/loaders/Skeleton.vue')
  }
})
export default class AddressProfileTop extends Vue {
  diameter = Number($(window).width()) > 767 ? 90 : 50

  $refs!: {
    address: HTMLSpanElement
  }

  get address(): string {
    return this.$store.getters['address/address']
  }

  get image(): string {
    return this.$store.getters['address/image']
  }

  get loadingInfo(): boolean {
    return this.$store.state.address.loadingInfo
  }

  get transactionsCount(): number {
    return this.$store.getters['address/transactionsCount']
  }

  get loadedTransactionsCount(): number {
    return this.$store.getters['address/allTransactions'].length
  }

  get inputAddressesCount(): number {
    return this.$store.getters['address/inputAddressesCount']
  }

  get outputAddressesCount(): number {
    return this.$store.getters['address/outputAddressesCount']
  }

  get tokenName(): string {
    const tokenName = this.$store.getters['address/name']
    const tokenSymbol = this.$store.getters['address/symbol']
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
