<template>
  <nuxt-child />
</template>
<script lang="ts">
import Vue from 'vue';
import Web3 from 'web3';
import { Component, Watch } from 'nuxt-property-decorator';
import { networkHelper } from '~/utils/networkHelper';
import { addressModule, authModule } from '~/store';

@Component({
  layout: 'account',
  scrollToTop: true,
})
export default class AddressPageContainer extends Vue {
  get authLoading() {
    return authModule.initLoading;
  }

  validate({ params }: any) {
    const network = params.network;
    const isValid = networkHelper.isValidSlug(network);

    return (
      isValid &&
      (network === 'tron' || network === 'solana'
        ? true
        : Web3.utils.isAddress(params.address))
    );
  }

  beforeCreate() {
    const chainId = networkHelper.getChainId(this.$route.params.network);
    const address = this.$route.params.address;

    if (!chainId) {
      return;
    }

    /** очищаем транзакции для новой страницы
     * срабатывает при смене адреса или сети, но пропускает при смене таба
     **/
    addressModule.clear();

    /** обновляем текущие данные по адресу и сети из URL */
    addressModule.setInfo({
      address,
      chainId,
    });
  }

  @Watch('authLoading', { immediate: true })
  onAuthLoadingChange(isLoading: boolean) {
    if (isLoading) {
      return;
    }

    /** если нет авторизации, то переключаем активную сеть на сеть из адреса */

    const isAuth = authModule.isAuth;
    const authChainId = authModule.chainId;
    const chainId = addressModule.chainId;

    if (!isAuth && authChainId !== chainId) {
      authModule.setChainId(chainId);
    }
  }
}
</script>
