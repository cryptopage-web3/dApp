<template>
  <div class="transactions-top">
    <ul id="myTab" class="nav nav-tabs transactions-list" role="tablist">
      <li v-for="(tab, index) in tabs" :key="index" class="nav-item">
        <nuxt-link
          :to="url(tab.link)"
          exact-active-class="active"
          class="nav-link"
          exact
        >
          {{ tab.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NetworkNameMixin from '~/mixins/networkName'

@Component({})
export default class SidebarRightBalance extends mixins(NetworkNameMixin) {
  get tabs() {
    const tokensName = this.networkName === 'bsc' ? 'bep20' : 'erc20'
    return [
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
        name: `TOKENS (${tokensName})`
      },
      {
        link: 'likes',
        name: 'Likes'
      }
    ]
  }

  url(link: string) {
    return `/${this.networkName}/${this.selectedAddress}/${link}`
  }
}
</script>
