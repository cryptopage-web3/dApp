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
        <profile-name v-if="!tokenName" />
        <div v-if="tokenName" class="profile-info__title">
          {{ tokenName }}
        </div>
        <div v-else class="profile-info__title">
          <span
            ref="address"
            class="profile-info__title-address"
            @click.prevent="copyAddress"
          >
            {{ address | shortAddress }}
          </span>
        </div>
        <profile-status v-if="!tokenName" />
        <div class="profile-info__text">
          {{ transactionsCount | humanizeCount }}
          transactions<br />
          0 inputs / 0 outputs
        </div>
      </div>
    </div>
    <div class="profile-right">
      <a href="#" class="profile-ring active">
        <img src="@/assets/img/profile-ring_img2.png" alt="" />
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
    'profile-name': async () =>
      await import('@/components/address/AddressProfileName.vue')
  }
})
export default class AddressProfileTop extends Vue {
  diameter = Number($(window).width()) > 767 ? 90 : 40

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

  get tokenName(): string {
    const tokenName = this.$store.getters['address/name']
    const tokenSymbol = this.$store.getters['address/symbol']
    return tokenName && tokenSymbol ? `${tokenName} (${tokenSymbol})` : ''
  }

  mounted() {
    this.$nextTick(() => {
      ;($(this.$refs.address) as any).tooltip({
        trigger: 'hover',
        title: 'Click to copy'
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
