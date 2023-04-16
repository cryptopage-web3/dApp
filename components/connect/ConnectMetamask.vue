<template>
  <a
    href="#"
    class="sign-variations__metamask btn btn_default btn_extra-large w-100 mb_15"
    @click.prevent="connectToProvider(EMainChain.eth, EProvider.metamask)"
  >
    <img class="mr_10" src="@/assets/img/sign-variations_img1.svg" alt="" />
    <span> Sign up / Sign in with Metamask </span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { EChainSlug, EMainChain, EProvider } from '~/types';
import { authModule } from '~/store';
import { networkHelper } from '~/utils/networkHelper';

@Component({})
export default class ConnectMetamask extends Vue {
  EMainChain = EMainChain;
  EProvider = EProvider;

  async connectToProvider(chain: EChainSlug, provider: EProvider) {
    const response = await authModule.connectToProvider({
      chain,
      provider,
    });

    if (response.status === 'error') {
      this.$notify({
        type: response.status,
        title: response.message?.title,
        text: response.message?.text,
      });

      return;
    }

    /** редирект на профиль */

    const { connectData } = response;
    const address = connectData?.address;
    const chainSlug = networkHelper.getNetworkSlug(connectData?.chainId);

    this.$router.push(`/${chainSlug}/${address}`);
  }
}
</script>
