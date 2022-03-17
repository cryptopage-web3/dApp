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
import { useStore } from 'vuex-simple'
import Web3 from 'web3'
import { Container } from 'vue-typedi'
import TypedStore from '~/logic/store'
import tokens from '~/logic/tokens'

@Component({})
export default class AddressPage extends Vue {
  validNetworks: Record<string, number> | null = null

  validate({ params }: any) {
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

    /** получаем текущий $web3 авторизации
     * по сути он не передает реального web3, нам интересен только метод isAddress
     * поэтому возможно стоит отвязаться от tokens
     */
    const $web3 = Container.get(tokens.WEB3) as Web3

    return (
      isValid &&
      (networkName === 'tron' || networkName === 'solana'
        ? true
        : $web3.utils.isAddress(params.address))
    )
  }

  middleware({ route, params, redirect }: any) {
    /** для страниц без таба делаем редирект в таб NFT */
    if (route.name === 'networkName-address') {
      return redirect(`/${params.networkName}/${params.address}/nft`)
    }
  }

  beforeCreate() {
    /** используем типовой стор
     * если подключать через свойство класса, то в beforeCreate значение undefined
     */
    const typedStore: TypedStore = useStore(this.$store)

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
      typedStore.address.clearTransactions()

      /** обновляем текущие данные по адресу и сети из URL */
      typedStore.address.updateAddressInfo({
        address: this.$route.params.address,
        chainId
      })

      /** если нет авторизации, то переключаем активную сеть на сеть из адреса */
      const isAuth = typedStore.auth.isAuth
      const selectedChainId = typedStore.auth.chainId

      if (!isAuth && selectedChainId !== chainId) {
        typedStore.auth.setChainId(chainId)
      }
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
