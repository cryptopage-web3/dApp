<template>
  <div class="transactions-top">
    <ul id="myTab" class="nav nav-tabs transactions-list" role="tablist">
      <li v-for="(tab, index) in tabs" :key="index" class="nav-item">
        <router-link
          :to="url(tab.link)"
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
import NetworkNameMixin from '~/mixins/networkName'
export default {
  mixins: [NetworkNameMixin],
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
  }),
  methods: {
    url(link) {
      return `/${this.networkName}/${this.address}/${link}`
    }
  }
}
</script>
