<template>
  <section
    class="profile-login d-flex flex-column justify-content-center align-items-center height-full"
  >
    <div class="container">
      <div class="profile-login-zag mb_30">
        <h1 class="profile-login-zag__title">Log in your wallet</h1>
        <div class="profile-login-zag__text">
          Sign up with MetaMask, Google, Phone or Email
        </div>
      </div>
      <div class="sign-variations">
        <ConnectMetamask />
        <ConnectGoogle />
        <ConnectEmail />
      </div>

      <div class="text-center mt_30">
        <a
          href="#sign-variation-collapse"
          data-toggle="collapse"
          role="button"
          aria-expanded="false"
          class="profile-login-sh-h"
        >
          <span class="show">Other methods</span>
          <span class="hide">Hide</span>
        </a>
      </div>

      <div id="sign-variation-collapse" class="collapse">
        <ConnectProviders />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ConnectProviders from '~/components/connect/ConnectProviders.vue';
import ConnectMetamask from '~/components/connect/ConnectMetamask.vue';
import ConnectGoogle from '~/components/connect/ConnectGoogle.vue';
import ConnectEmail from '~/components/connect/ConnectEmail.vue';

@Component({
  head: {
    title: 'Connect your wallet | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Connect with one of our available wallet providers or create a new one.',
      },
    ],
  },
  scrollToTop: true,
  components: {
    ConnectProviders,
    ConnectMetamask,
    ConnectGoogle,
    ConnectEmail,
  },
})
export default class ConnectPage extends Vue {}
</script>
