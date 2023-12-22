<template>
  <section class="profile-login height-full">
    <div class="container">
      <ConnectForm @success="handleSuccess" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ConnectForm from '~/components/connect/ConnectForm.vue';

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
    ConnectForm,
  },
})
export default class ConnectPage extends Vue {
  handleSuccess(data: { chainSlug: string; address: string }) {
    this.$router.push(`/${data.chainSlug}/${data.address}`);
  }
}
</script>
