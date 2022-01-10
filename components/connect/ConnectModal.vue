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
                  class="modal-content__link fill"
                  :class="selectedNetworkType === 'ethereum' ? 'active' : ''"
                >
                  <img src="@/assets/img/modal-content__link_img1.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  href="#modal-content2"
                  class="modal-content__link fill"
                  :class="selectedNetworkType === 'bsc' ? 'active' : ''"
                >
                  <img src="@/assets/img/modal-content__link_img2.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  href="#modal-content3"
                  class="modal-content__link fill"
                  :class="selectedNetworkType === 'polygon' ? 'active' : ''"
                >
                  <img src="@/assets/img/modal-content__link_img3.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  id="modal-content-tron"
                  href="#modal-content4"
                  class="modal-content__link fill"
                  :class="selectedNetworkType === 'tron' ? 'active' : ''"
                >
                  <img src="@/assets/img/modal-content__link_img4.png" alt="" />
                  <span></span>
                </a>
              </li>
              <li>
                <a
                  href="#modal-content5"
                  class="modal-content__link modal-content__link_disabled"
                >
                  <img src="@/assets/img/modal-content__link_img5.png" alt="" />
                  <span></span>
                </a>
              </li>
            </ul>
            <div class="modal-content-cont">
              <div id="modal-content1" class="modal-content-wr active">
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
              <div id="modal-content2" class="modal-content-wr">
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
              <div id="modal-content3" class="modal-content-wr">
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
              <div id="modal-content4" class="modal-content-wr">
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
              <div id="modal-content5" class="modal-content-wr">
                <div class="modal-content-wallet-title">ETH Wallet5</div>
                <ul class="modal-content-wallet-list">
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img1.png"
                        alt=""
                      />
                      <span> MetaMask </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
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
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img5.png"
                        alt=""
                      />
                      <span> Coin9B Wallet </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="modal-content-wallet__link">
                      <img
                        src="@/assets/img/modal-content-wallet__link_img6.png"
                        alt=""
                      />
                      <span> OKEx Wallet </span>
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
<script>
export default {
  computed: {
    selectedProvider() {
      return this.$store.getters['auth/selectedProviderName']
    },
    selectedNetworkType() {
      return this.$store.getters['auth/selectedNetworkType']
    }
  },
  mounted() {
    $('.modal-content__link').on('click', function (event) {
      event.preventDefault()

      if ($(this).hasClass('modal-content__link_disabled')) {
        return
      }

      const id = $(this).attr('href')
      $('.modal-content__link').removeClass('active')
      $(this).addClass('active')
      $('.modal-content-wr').removeClass('active')
      $('.modal-content-wr').slideUp(0)
      $(id).fadeIn(300)
      $(id).addClass('active')
    })

    $('#modal-connect').on('show.bs.modal', function () {
      setTimeout(() => {
        $('.modal-backdrop').addClass('modal-backdrop_dark')
      })
    })
  },
  methods: {
    switchProvider(type, provider) {
      if (type === 'TRON' && !window.tronLink?.tronWeb) {
        this.$notify({
          type: 'error',
          title: 'Please download TronLink extension'
        })
        return
      }
      if (
        type === 'TRON' &&
        window.tronLink?.tronWeb &&
        !window.tronLink?.tronWeb?.defaultAddress?.base58
      ) {
        this.$notify({
          type: 'error',
          title: 'Please login to TronLink'
        })
        return
      }
      if (
        (provider === 'metamask' || provider === 'coin98') &&
        provider === this.selectedProvider
      ) {
        this.$store.dispatch('auth/switchChain', type)
      } else {
        this.$store.dispatch('auth/switchProvider', provider)
        if (type !== this.selectedNetworkType && type !== 'TRON') {
          this.$store.dispatch('auth/switchChain', type)
        }
      }

      /** close modal on switch */
      $('#modal-connect').modal('hide')
    }
  }
}
</script>
