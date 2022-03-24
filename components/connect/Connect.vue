<template>
  <div class="connect-wallet-wr">
    <div class="connect-wallet-col connect-wallet__link-hover">
      <a
        class="connect-wallet__link"
        :class="{ 'connect-wallet__link_connect': !isAuth }"
      >
        <div ref="changeNetwork" class="connect-wallet__link-thumb">
          <img :src="getNetworkIcon" alt="blockchain-icon" />
        </div>
        <div ref="connect" class="connect-wallet__link-text">
          <div class="connect-wallet__link-tool">
            {{ selectedNetworkName }}
          </div>
          <div
            v-if="isAuth"
            class="connect-wallet__link-status"
            @click.prevent.stop=""
          >
            {{ selectedAddress | shortAddress }}
          </div>
          <div
            v-else
            class="connect-wallet__link-status connect-wallet__link-status_connect"
            @click.prevent.stop="signin"
          >
            Connect wallet
          </div>
        </div>
      </a>
      <div v-if="isAuth" ref="connectList" class="connect-wallet-col-body">
        <ul class="connect-wallet__list">
          <li>
            <router-link :to="`/${selectedNetworkSlug}/${selectedAddress}/nft`"
              >Home page</router-link
            >
          </li>
          <li>
            <a ref="copy" href="#" @click.prevent="copyAddress">Copy Address</a>
          </li>
          <li>
            <router-link
              :to="`/${selectedNetworkSlug}/${selectedAddress}/transactions`"
              >Transaction History</router-link
            >
          </li>
          <li class="connect-wallet__item_change">
            <a
              id="modal-opener"
              href="#"
              data-toggle="modal"
              data-target="#modal-connect"
              >Change Wallet</a
            >
          </li>
          <li>
            <a href="#" @click.prevent="signout">Disconnect</a>
          </li>
        </ul>
      </div>
      <div ref="changeNetworkList" class="change-network-col-body">
        <ul class="change-network__list">
          <li>
            <a href="#" @click.prevent="switchChain(EMainChain.eth)">
              <img src="@/assets/img/modal-content__link_img1.png" alt="" />
              Ethereum
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="switchChain(EMainChain.bsc)">
              <img src="@/assets/img/modal-content__link_img2.png" alt="" />
              Binance Smart Chain
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="switchChain(EMainChain.polygon)">
              <img src="@/assets/img/modal-content__link_img3.png" alt="" />
              Polygon
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="switchChain(EMainChain.tron)">
              <img src="@/assets/img/modal-content__link_img4.png" alt="" />
              Tron
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="switchChain(EMainChain.solana)">
              <img src="@/assets/img/modal-content__link_img5.png" alt="" />
              Solana
            </a>
          </li>
        </ul>
      </div>
    </div>
    <a href="#" class="dark-white">
      <img src="@/assets/img/dark-white_img2.png" alt="" />
    </a>
  </div>
</template>
<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import NetworkNameMixin from '~/mixins/networkName'
import { EMainChain } from '~/types/EMainChain'
import { copyToClipboard } from '~/utils/copyToClipboard'

@Component({})
export default class Connect extends mixins(NetworkNameMixin) {
  EMainChain = EMainChain
  hasUnknownNotify = false
  hideConnectDropdownTimeout: ReturnType<typeof setTimeout> | null = null
  hideNetworkDropdownTimeout: ReturnType<typeof setTimeout> | null = null

  $refs!: {
    connect: HTMLDivElement
    connectList: HTMLDivElement
    changeNetwork: HTMLDivElement
    changeNetworkList: HTMLDivElement
  }

  // computed

  get selectedAddress(): string {
    return this.typedStore.auth.selectedAddress
  }

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  get selectedNetworkName(): string {
    return this.typedStore.auth.selectedNetworkName
  }

  get selectedNetworkSlug(): string {
    return this.typedStore.auth.selectedNetworkSlug
  }

  get selectedNetworkType(): string {
    return this.typedStore.auth.selectedNetworkType
  }

  get selectedProvider(): string {
    return this.typedStore.auth.selectedProviderName
  }

  get isUnknownChain(): boolean {
    return this.typedStore.auth.isUnknownChain
  }

  get getNetworkIcon(): string {
    const icons: Record<string, string> = {
      ethereum: require('@/assets/img/modal-content__link_img1.png'),
      bsc: require('@/assets/img/modal-content__link_img2.png'),
      polygon: require('@/assets/img/modal-content__link_img3.png'),
      tron: require('@/assets/img/modal-content__link_img4.png'),
      solana: require('@/assets/img/modal-content__link_img5.png')
    }

    return icons[this.selectedNetworkType]
  }

  // watch

  @Watch('isAuth', { immediate: true })
  onIsAuthChanged(isAuth: boolean) {
    this.$nextTick(() => {
      const self = this

      /** dropdown авторизованного кошелька */

      if (isAuth) {
        $(this.$refs.connect)
          .off('mouseenter mouseleave')
          .on('mouseenter', function () {
            self.hideConnectDropdownTimeout &&
              clearTimeout(self.hideConnectDropdownTimeout)

            $(this).addClass('active')
            $('.connect-wallet-col-body').stop().slideDown(300)
          })
          .on('mouseleave', function () {
            self.hideConnectDropdownTimeout = setTimeout(() => {
              $(this).removeClass('active')
              $('.connect-wallet-col-body').slideUp(200)
            }, 100)
          })

        $(this.$refs.connectList)
          .off('mouseenter mouseleave')
          .on('mouseenter', function () {
            self.hideConnectDropdownTimeout &&
              clearTimeout(self.hideConnectDropdownTimeout)
          })
          .on('mouseleave', function () {
            self.hideConnectDropdownTimeout = setTimeout(() => {
              $(self.$refs.connect).removeClass('active')
              $('.connect-wallet-col-body').slideUp(200)
            }, 100)
          })
      }

      /** dropdown смены сетей */

      $(this.$refs.changeNetwork)
        .off('mouseenter mouseleave')
        .on('mouseenter', function () {
          self.hideNetworkDropdownTimeout &&
            clearTimeout(self.hideNetworkDropdownTimeout)

          $(this).addClass('active')
          $('.change-network-col-body').stop().slideDown(300)
        })
        .on('mouseleave', function () {
          self.hideNetworkDropdownTimeout = setTimeout(() => {
            $(this).removeClass('active')
            $('.change-network-col-body').slideUp(200)
          }, 100)
        })

      $(this.$refs.changeNetworkList)
        .off('mouseenter mouseleave')
        .on('mouseenter', function () {
          self.hideNetworkDropdownTimeout &&
            clearTimeout(self.hideNetworkDropdownTimeout)
        })
        .on('mouseleave', function () {
          self.hideNetworkDropdownTimeout = setTimeout(() => {
            $(self.$refs.changeNetwork).removeClass('active')
            $('.change-network-col-body').slideUp(200)
          }, 100)
        })
    })
  }

  @Watch('isUnknownChain')
  async onIsUnknownChainChanged(isUnknown: boolean) {
    /** Если есть подключенный провайдер и получили неизвестную сеть,
     * то значит пользователь выбрал ее в провайдере.
     * Для таких случаев делаем disconnect
     */
    if (isUnknown && this.selectedProvider && !this.hasUnknownNotify) {
      this.hasUnknownNotify = true
      const selectedProvider = this.selectedProvider

      await this.typedStore.auth.signout()
      this.$router.push('/')

      setTimeout(() => {
        this.$notify({
          type: 'error',
          title: `${selectedProvider}'s chain is changed`
        })
      }, 200)
    }
  }

  // methods

  copyAddress() {
    copyToClipboard(this.selectedAddress)

    this.$notify({
      type: 'success',
      title: 'Address copied to clipboard'
    })
  }

  signin() {
    ;($('#modal-connect') as any).modal('show')
  }

  async signout() {
    await this.typedStore.auth.signout()
    this.$router.push('/')
  }

  async switchChain(type: string) {
    const isAuth = this.isAuth
    await this.typedStore.auth.switchChain(type)

    if (isAuth) {
      setTimeout(() => {
        this.$router.push({ path: '/', query: { openConnect: '1' } })
      })
    } else {
      setTimeout(() => {
        this.$router.push(`/${this.selectedNetworkSlug}/${this.address}/nft`)
      })
    }

    /** закрываем дропдаун сетей */

    $('.change-network-col-body').slideUp(100)
  }
}
</script>
