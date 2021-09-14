<template>
  <div class="home">
    <profile-other />
    <main-center :address="$route.params.address" />
    <main-tabs-links :address="$route.params.address" />
    <div class="main-tabs-cont">
      <div class="main-tab show">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  validate({ params, $web3 }) {
    return $web3.utils.isAddress(params.address)
  }
}
</script>
