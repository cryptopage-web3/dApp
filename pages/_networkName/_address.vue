<template>
  <div>
    <div class="main-top">
      <address-profile />
      <sidebar-right-balance v-if="$viewport.isLessThan('desktopMedium')" />
      <address-transaction-tabs />
    </div>

    <div class="main-bottom">
      <div class="tab-content">
        <div class="tab-pane fade show active">
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class AddressPage extends Vue {
  validNetworks: Record<string, number> | null = null

  validate({ params, $web3 }: any) {
    const networkName = params.networkName
    const validNetworkNames = [
      'eth',
      'ropsten',
      'rinkeby',
      'goerly',
      'kovan',
      'bsc',
      'bsc-testnet',
      'polygon',
      'polygon-testnet',
      'ganache',
      'tron',
      'solana'
    ]
    const isValid = validNetworkNames.includes(networkName)
    return (
      isValid &&
      (networkName === 'tron' || networkName === 'solana'
        ? true
        : $web3.utils.isAddress(params.address))
    )
  }

  async beforeCreate() {
    const networkName = this.$route.params.networkName
    const validNetworks: Record<string, number | string> = {
      eth: 1,
      ropsten: 3,
      rinkeby: 4,
      goerly: 5,
      kovan: 42,
      bsc: 56,
      'bsc-testnet': 97,
      polygon: 137,
      'polygon-testnet': 80001,
      tron: 'tron',
      solana: 'solana'
    }

    const chainId = validNetworks[networkName]

    if (chainId) {
      /** очищаем транзакции для новой страницы
       * срабатывает при смене адреса или сети, но пропускает при смене таба
       * */
      this.$store.dispatch('address/clearTransactions')

      /** обновляем текущие данные по адресу и сети из URL */
      await this.$store.dispatch('address/updateAddressInfo', {
        address: this.$route.params.address,
        chainId
      })
    }
  }
}
</script>
<style>
.fetch-status {
  text-align: center;
  margin: 1.5em;
  font-size: 1.25em;
}
</style>
