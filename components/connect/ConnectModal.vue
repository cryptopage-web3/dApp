<template>
  <div
    id="modal-connect"
    class="modal fade modal-connect"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <img src="@/assets/img/modal-content_close.png" alt="" />
          </button>
          <div class="modal-content__title">Connect to a wallet</div>
          <div class="modal-content-body">
            <ul class="modal-content__list">
              <li>
                <a
                  href="#modal-content1"
                  class="modal-content__link modal-content__link_ethereum fill"
                >
                  <img src="@/assets/img/modal-content__link_img1.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  href="#modal-content2"
                  class="modal-content__link modal-content__link_bsc fill"
                >
                  <img src="@/assets/img/modal-content__link_img2.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  href="#modal-content3"
                  class="modal-content__link modal-content__link_polygon fill"
                >
                  <img src="@/assets/img/modal-content__link_img3.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  id="modal-content-tron"
                  href="#modal-content4"
                  class="modal-content__link modal-content__link_tron fill"
                >
                  <img src="@/assets/img/modal-content__link_img4.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  id="modal-content-solana"
                  href="#modal-content5"
                  class="modal-content__link modal-content__link_solana fill"
                >
                  <img src="@/assets/img/modal-content__link_img5.png" alt="" />
                  <span></span>
                </a>
              </li>
            </ul>
            <div class="modal-content-cont">
              <div
                id="modal-content1"
                class="modal-content-wr modal-content-wr_ethereum"
              >
                <div class="modal-content-wallet-title">Ethereum</div>
                <ul class="modal-content-wallet-list">
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('ETHEREUM', 'metamask')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img1.png"
                        alt=""
                      />
                      <span> MetaMask </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="
                        switchProvider('ETHEREUM', 'walletConnect')
                      "
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img2.png"
                        alt=""
                      />
                      <span> WalletConnect </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img3.png"
                        alt=""
                      />
                      <span> Trust Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img4.png"
                        alt=""
                      />
                      <span> SafePal wallet </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('ETHEREUM', 'coin98')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img5.png"
                        alt=""
                      />
                      <span> Coin98 Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('ETHEREUM', 'okex')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img6.png"
                        alt=""
                      />
                      <span> OKEx Wallet </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div
                id="modal-content2"
                class="modal-content-wr modal-content-wr_bsc"
              >
                <div class="modal-content-wallet-title">BSC</div>
                <ul class="modal-content-wallet-list">
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('BSC', 'metamask')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img1.png"
                        alt=""
                      />
                      <span> MetaMask </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('BSC', 'bscWallet')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_bsc.png"
                        alt=""
                      />
                      <span> BSC Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('BSC', 'walletConnect')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img2.png"
                        alt=""
                      />
                      <span> WalletConnect </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img3.png"
                        alt=""
                      />
                      <span> Trust Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img4.png"
                        alt=""
                      />
                      <span> SafePal wallet </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('BSC', 'coin98')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img5.png"
                        alt=""
                      />
                      <span> Coin98 Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('BSC', 'coin98')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img6.png"
                        alt=""
                      />
                      <span> OKEx Wallet </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div
                id="modal-content3"
                class="modal-content-wr modal-content-wr_polygon"
              >
                <div class="modal-content-wallet-title">Polygon</div>
                <ul class="modal-content-wallet-list">
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('POLYGON', 'metamask')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img1.png"
                        alt=""
                      />
                      <span> MetaMask </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="
                        switchProvider('POLYGON', 'walletConnect')
                      "
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img2.png"
                        alt=""
                      />
                      <span> WalletConnect </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img3.png"
                        alt=""
                      />
                      <span> Trust Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img4.png"
                        alt=""
                      />
                      <span> SafePal wallet </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('POLYGON', 'coin98')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img5.png"
                        alt=""
                      />
                      <span> Coin98 Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('ETHEREUM', 'okex')"
                    >
                      <img
                        src="@/assets/img/modal-content-wallet__link_img6.png"
                        alt=""
                      />
                      <span> OKEx Wallet </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div
                id="modal-content4"
                class="modal-content-wr modal-content-wr_tron"
              >
                <div class="modal-content-wallet-title">Tron</div>
                <ul class="modal-content-wallet-list">
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('TRON', 'tron')"
                    >
                      <img src="@/assets/img/tronLink.png" alt="" />
                      <span> TronLink </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div
                id="modal-content5"
                class="modal-content-wr modal-content-wr_solana"
              >
                <div class="modal-content-wallet-title">Solana</div>
                <ul class="modal-content-wallet-list">
                  <li>
                    <a
                      href="#"
                      class="modal-content-wallet__link"
                      @click.prevent="switchProvider('SOLANA', 'phantom')"
                    >
                      <img src="@/assets/img/phantom_.png" alt="" />
                      <span> Phantom </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit } from 'nuxt-property-decorator'
import { useStore } from 'vuex-simple'
import TypedStore from '~/logic/store'
import { INotifyParams } from '~/types'

@Component({})
export default class ConnectModal extends Vue {
  public typedStore: TypedStore = useStore(this.$store)

  $notify!: (params: INotifyParams) => void

  get selectedProvider(): string {
    return this.typedStore.auth.selectedProviderName
  }

  get selectedNetworkType(): string {
    return this.typedStore.auth.selectedNetworkType
  }

  get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  mounted() {
    /** выбор сети */

    $('.modal-content__link').on('click', function (event) {
      event.preventDefault()

      if ($(this).hasClass('modal-content__link_disabled')) {
        return
      }

      const id = $(this).attr('href') || ''
      $('.modal-content__link').removeClass('active')
      $(this).addClass('active')
      $('.modal-content-wr').removeClass('active')
      $('.modal-content-wr').slideUp(0)
      $(id).fadeIn(300)
      $(id).addClass('active')
    })

    /** открытие модалки */

    $('#modal-connect').on('show.bs.modal', () => {
      $('.modal-content__link').removeClass('active')
      $('.modal-content-wr').removeClass('active')
      $('.modal-content-wr').hide()

      if (this.selectedNetworkType) {
        $(`.modal-content__link_${this.selectedNetworkType}`).addClass('active')
        $(`.modal-content-wr_${this.selectedNetworkType}`).addClass('active')
        $(`.modal-content-wr_${this.selectedNetworkType}`).show()
      }

      setTimeout(() => {
        $('.modal-backdrop').addClass('modal-backdrop_dark')
      })
    })
  }

  @Emit('error')
  emitError() {
    return true
  }

  @Emit('success')
  emitSuccess() {
    return true
  }

  @Emit('success-login')
  emitSuccessLogin() {
    return true
  }

  // methods

  async switchProvider(type: string, provider: string) {
    const response = await this.$store.dispatch('auth/switchProvider', {
      providerName: provider,
      network: type
    })

    if (response.status === 'error') {
      this.$notify({
        type: response.status,
        title: response.message?.title,
        text: response.message?.text
      })

      this.emitError()
      return
    }

    this.$notify({
      type: 'success',
      title: 'Connected successfully'
    })

    this.emitSuccess()

    /** авторизация */

    if (!this.isAuth) {
      this.typedStore.auth.signin()

      this.emitSuccessLogin()
    }

    /** close modal on switch */
    ;($('#modal-connect') as any).modal('hide')
  }
}
</script>
