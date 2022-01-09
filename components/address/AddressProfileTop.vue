<template>
  <div class="profile-top">
    <div class="profile-left">
      <div class="profile__thumb">
        <img v-if="image" :src="image" :width="diameter" :height="diameter" />
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
          <strong title="Total transactions">286</strong> total transactions<br />
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
          <strong title="Number of loaded transactions in the transactions tab">
            {{ loadedTransactionsCount }}
          </strong>
          loaded transactions
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
import { INotifyParams } from '~/types'

@Component({
  components: {
    'nft-form': async () => await import('@/components/nft-form/NFTForm.vue'),
    'profile-status': async () =>
      await import('@/components/address/AddressProfileStatus.vue')
  }
})
export default class AddressProfileTop extends Vue {
  diameter = Number($(window).width()) > 767 ? 90 : 50

  $notify!: (params: INotifyParams) => void
  $refs!: {
    address: HTMLSpanElement
  }

  get address(): string {
    return this.$store.getters['address/address']
  }

  get image(): string {
    return this.$store.getters['address/image']
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
    return tokenName && tokenSymbol ? `${tokenName} (${tokenSymbol})` : ''
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
