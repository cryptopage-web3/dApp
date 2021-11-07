<template>
  <div class="connect-wallet-wr">
    <div class="connect-wallet-col connect-wallet__link-hover">
      <a
        href="#"
        role="button"
        class="connect-wallet__link"
        :class="{ 'connect-wallet__link_connect': !isAuth }"
      >
        <div ref="change_network" class="connect-wallet__link-thumb">
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
            {{ address | shortAddress }}
          </div>
          <div
            v-else
            class="
              connect-wallet__link-status connect-wallet__link-status_connect
            "
            @click.prevent.stop="signin"
          >
            Connect wallet
          </div>
        </div>
      </a>
      <div v-if="isAuth" ref="connect_list" class="connect-wallet-col-body">
        <ul class="connect-wallet__list">
          <li>
            <router-link :to="`/${networkName}/${address}`"
              >Home page</router-link
            >
          </li>
          <li>
            <a ref="copy" href="#" @click.prevent="copyAddress">Copy Address</a>
          </li>
          <li>
            <a
              v-if="$installer.canInstall && !$installer.hasInstalled"
              href="#"
              @click="$installer.prompt"
            >
              Install app
            </a>
          </li>
          <li>
            <router-link :to="`/${address}`">Transaction History</router-link>
          </li>
          <li>
            <a href="#" data-toggle="modal" data-target="#modal-connect"
              >Change Wallet</a
            >
          </li>
          <li>
            <a href="#" @click.prevent="signout">Disconnect</a>
          </li>
        </ul>
      </div>
      <div
        v-if="isAuth"
        ref="change_network_list"
        class="change-network-col-body"
      >
        <ul class="change-network__list">
          <li>
            <a href="#" @click.prevent="switchChain('ETHEREUM')">
              <img src="@/assets/img/modal-content__link_img1.png" alt="" />
              Ethereum Mainnet
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="switchChain('BSC')">
              <img src="@/assets/img/modal-content__link_img2.png" alt="" />
              Binance Smart Chain
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="switchChain('POLYGON')">
              <img src="@/assets/img/modal-content__link_img3.png" alt="" />
              Polygon Mainnet
            </a>
          </li>
        </ul>
      </div>
      <signin ref="signin" />
    </div>
    <a href="#" class="dark-white">
      <img src="@/assets/img/dark-white_img2.png" alt="" />
    </a>
  </div>
</template>
<script>
import NetworkNameMixin from '@/mixins/networkName'
import ethereumImg from '@/assets/img/modal-content__link_img1.png'
import bscImg from '@/assets/img/modal-content__link_img2.png'
import polygonImg from '@/assets/img/modal-content__link_img3.png'
import { copyToClipboard } from '~/utils/copyToClipboard'

export default {
  components: {
    signin: async () => await import('@/components/auth/Signin.vue')
  },

  mixins: [NetworkNameMixin],

  computed: {
    address() {
      return this.$store.getters['auth/selectedAddress']
    },

    isAuth() {
      return this.$store.getters['auth/isAuth']
    },

    selectedNetworkName() {
      return this.$store.getters['auth/selectedNetworkName']
    },
    selectedProvider() {
      return this.$store.getters['auth/selectedProviderName']
    },
    getNetworkIcon() {
      const icons = {
        ethereum: ethereumImg,
        bsc: bscImg,
        polygon: polygonImg
      }
      return icons[this.$store.getters['auth/selectedNetworkType']]
    }
  },

  watch: {
    isAuth: {
      handler(isAuth) {
        if (isAuth) {
          this.$nextTick(() => {
            $(this.$refs.connect).hover(
              function () {
                $(this).addClass('active')
                $('.connect-wallet-col')
                  .find('.connect-wallet-col-body')
                  .stop(true, true)
                  .slideDown(300)
              },
              function () {
                const timeout = setTimeout(() => {
                  $(this).removeClass('active')
                  $('.connect-wallet-col')
                    .find('.connect-wallet-col-body')
                    .slideUp(300)
                }, 300)
                window.timeout = timeout
              }
            )

            $(this.$refs.connect_list).hover(
              function () {
                clearTimeout(window.timeout)
              },
              function () {
                $('.connect-wallet-col-body').slideUp(300)
              }
            )

            $(this.$refs.change_network).hover(
              function () {
                $(this).addClass('active')
                $('.change-network-col-body').stop(true, true).slideDown(300)
              },
              function () {
                const timeout = setTimeout(() => {
                  $(this).removeClass('active')
                  $('.change-network-col-body').slideUp(300)
                }, 300)
                window.timeout = timeout
              }
            )

            $(this.$refs.change_network_list).hover(
              function () {
                clearTimeout(window.timeout)
              },
              function () {
                $('.change-network-col-body').slideUp(300)
              }
            )
          })
        }
      },
      immediate: true
    }
  },

  methods: {
    copyAddress() {
      copyToClipboard(this.address)

      this.$notify({
        type: 'success',
        title: 'Address copied to clipboard'
      })
    },

    signin() {
      this.$refs.signin.init()
    },

    signout() {
      this.$store.dispatch('auth/signout')
      this.$router.push('/')
    },

    switchChain(type) {
      this.$store.dispatch('auth/switchChain', type)
    }
  }
}
</script>
