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
            <li><a href="#" @click="copy(address)">Copy Address</a></li>
            <li>
              <nuxt-link :to="`/${address}`"> Transaction history </nuxt-link>
            </li>
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
<script lang="ts">
import { Watch, Component, Ref, mixins } from 'nuxt-property-decorator'
import TypedStoreMixin from '~/mixins/typed-store'
import Signin from '@/components/auth/Signin.vue'

// Register the router hooks with their names
Component.registerHooks(['created'])

@Component({
  components: {
    signin: async () => await import('@/components/auth/Signin.vue')
  }
})
export default class SidebarRightConnect extends mixins(TypedStoreMixin) {
  public canCopy = false

  get address(): string {
    return this.typedStore.auth.selectedAddress
  }

  @Ref() readonly signinComponent!: typeof Signin

  public get isAuth(): boolean {
    return this.typedStore.auth.isAuth
  }

  public signin(): void {
    this.signinComponent.methods.init()
  }

  public signout(): void {
    this.$store.dispatch('auth/signout')
    this.$router.push('/')
  }

  async copy(s: string): Promise<void> {
    await navigator.clipboard.writeText(s)
  }

  created(): void {
    this.canCopy = !!navigator.clipboard
  }

  @Watch('isAuth', { immediate: true })
  public authenticated(isAuth: boolean): void {
    if (isAuth) {
      /*
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
      */
    }
  }
}
</script>
