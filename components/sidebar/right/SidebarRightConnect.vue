<template>
  <div class="connect-wallet-wr">
    <template v-if="isAuth">
      <div ref="connect" class="connect-wallet-col connect-wallet__link-hover">
        <a
          href="#"
          data-toggle="modal"
          data-target="#modal-connect"
          role="button"
          class="connect-wallet__link"
        >
          <div class="connect-wallet__link-thumb">
            <img src="@/assets/img/connect-wallet__link_img2.png" alt="" />
          </div>
          <div class="connect-wallet__link-text">
            <div class="connect-wallet__link-tool">Etherum</div>
            <div class="connect-wallet__link-status">
              {{ address | shortAddress }}
            </div>
          </div>
        </a>
        <div class="connect-wallet-col-body">
          <ul class="connect-wallet__list">
            <li>
              <router-link :to="`/${address}`">Home page</router-link>
            </li>
            <li><a href="#">Activate layer 2</a></li>
            <li><a href="#">Copy Address</a></li>
            <li><a href="#">Transaction history</a></li>
            <li><a href="#">Claim</a></li>
            <li><a href="#">Change Wallet</a></li>
            <li><a href="#" @click.prevent="signout">Disconnect</a></li>
          </ul>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="connect-wallet-col connect-wallet__link-hover">
        <a
          href="#"
          role="button"
          class="connect-wallet__link"
          @click.prevent="signin"
        >
          <div class="connect-wallet__link-thumb">
            <img src="@/assets/img/connect-wallet__link_img2.png" alt="" />
          </div>
          <div class="connect-wallet__link-text">
            <div class="connect-wallet__link-tool">Etherum</div>
            <div class="connect-wallet__link-status">Connect wallet</div>
          </div>
        </a>
        <signin ref="signin" />
      </div>
    </template>
    <a href="#" class="dark-white">
      <img src="@/assets/img/dark-white_img2.png" alt="" />
    </a>
  </div>
</template>
<script>
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
