<template>
  <div class="transactions-top">
    <ul id="myTab" class="nav nav-tabs transactions-list" role="tablist">
      <li v-for="(tab, index) in tabs" :key="index" class="nav-item">
        <router-link
          :to="`/${$store.getters['address/address']}/${tab.link}`"
          exact-active-class="active"
          class="nav-link"
          exact
        >
          {{ tab.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    tabs: [
      {
        link: '',
        name: 'Transactions'
      },
      {
        link: 'nft',
        name: 'NFT'
      },
      {
        link: 'tokens',
        name: 'TOKENS (erc20)'
      },
      {
        link: 'likes',
        name: 'Likes'
      }
    ]
  })
}
</script>
