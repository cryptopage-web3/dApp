<template>
  <div class="main-top">
    <address-profile />
    <address-transaction />
  </div>
</template>
<script>
export default {
  validate({ params, $web3 }) {
    const networkName = params.networkName
    const validNetworkNames = ['eth', 'rinkeby', 'bsc', 'matic']
    const isValid = validNetworkNames.includes(networkName)
    return isValid && $web3.utils.isAddress(params.address)
  },
  async beforeCreate() {
    let chainId = 1
    const networkName = this.$route.params.networkName
    if (networkName === 'eth') {
      chainId = 1
    } else if (networkName === 'rinkeby') {
      chainId = 4
    } else if (networkName === 'bsc') {
      chainId = 56
    } else if (networkName === 'matic') {
      chainId = 137
    }
    await this.$store.dispatch('auth/setChainId', chainId)
    await this.$store.dispatch(
      'address/updateAddressInfo',
      this.$route.params.address
    )
  }
}
</script>
