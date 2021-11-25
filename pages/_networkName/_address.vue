<template>
  <div class="main-top">
    <address-profile />
    <sidebar-right-balance v-if="$viewport.isLessThan('desktopMedium')" />
    <address-transaction />
  </div>
</template>
<script>
export default {
  validate({ params, $web3 }) {
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
      'ganache'
    ]
    const isValid = validNetworkNames.includes(networkName)
    return isValid && $web3.utils.isAddress(params.address)
  },
  data: () => ({
    validNetworks: null
  }),
  async beforeCreate() {
    const networkName = this.$route.params.networkName
    const validNetworks = {
      eth: 1,
      ropsten: 3,
      rinkeby: 4,
      goerly: 5,
      kovan: 42,
      bsc: 56,
      'bsc-testnet': 97,
      polygon: 137,
      'polygon-testnet': 80001
    }
    const chainId = validNetworks[networkName]
    if (chainId) {
      await this.$store.dispatch('auth/setChainId', chainId)
      await this.$store.dispatch(
        'address/updateAddressInfo',
        this.$route.params.address
      )
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
