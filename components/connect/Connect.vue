<template>
  <div class="connect-wallet-wr">
    <div ref="connect" class="connect-wallet-col connect-wallet__link-hover">
      <a
        href="#"
        role="button"
        class="connect-wallet__link"
        :class="{ 'connect-wallet__link_connect': !isAuth }"
      >
        <div class="connect-wallet__link-thumb">
          <img :src="getNetworkIcon" alt="blockchain-icon" />
        </div>
        <div class="connect-wallet__link-text">
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
      <div v-if="isAuth" class="connect-wallet-col-body">
        <ul class="connect-wallet__list">
          <li>
            <router-link :to="`/${address}`">Home page</router-link>
          </li>
          <li>
            <a href="#">Activate layer {{ selectedNetworkLayer }}</a>
          </li>
          <li><a href="#">Copy Address</a></li>
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
          <li><a href="#">Claim</a></li>
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
      <signin ref="signin" />
    </div>
    <a href="#" class="dark-white">
      <img src="@/assets/img/dark-white_img2.png" alt="" />
    </a>
  </div>
</template>
<script>
import ethereumImg from '@/assets/img/modal-content__link_img1.png'
import bscImg from '@/assets/img/modal-content__link_img2.png'
import polygonImg from '@/assets/img/modal-content__link_img3.png'
export default {
  components: {
    signin: async () => await import('@/components/auth/Signin.vue')
  },
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuth']
    },
    address() {
      return this.$store.getters['auth/selectedAddress']
    },
    selectedNetworkName() {
      return this.$store.getters['auth/selectedNetworkName']
    },
    selectedNetworkLayer() {
      return this.$store.getters['auth/selectedNetworkType'] === 'ethereum'
        ? '1'
        : '2'
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
                $(this)
                  .find('.connect-wallet-col-body')
                  .stop(true, true)
                  .slideDown(300)
              },
              function () {
                $(this).removeClass('active')
                $(this).find('.connect-wallet-col-body').slideUp(300)
              }
            )
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    signin() {
      this.$refs.signin.init()
    },
    signout() {
      this.$store.dispatch('auth/signout')
      this.$router.push('/')
    }
  }
}
</script>
