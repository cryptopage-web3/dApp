<template>
  <div class="profile-center">
    <address-profile />
    <ul id="myTab" class="nav nav-tabs profile-tabs" role="tablist">
      <li class="nav-item">
        <a
          id="profile-tabs1-tab"
          class="profile-tabs__link"
          :class="{ active: activeTab === 'nfts' }"
          href="#profile-tabs1"
          role="tab"
          aria-controls="profile-tabs1"
          aria-selected="true"
          @click.prevent="selectTab('nfts', '#profile-tabs1-tab')"
        >
          Content ({{ nftCount }})
        </a>
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs2-tab"
          class="profile-tabs__link"
          :class="{ active: activeTab === 'transactions' }"
          href="#profile-tabs2"
          role="tab"
          aria-controls="profile-tabs2"
          aria-selected="false"
          @click.prevent="selectTab('transactions', '#profile-tabs2-tab')"
        >
          Activity ({{ transactionCount }})
        </a>
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs3-tab"
          class="profile-tabs__link"
          :class="{ active: activeTab === 'reactions' }"
          href="#profile-tabs3"
          role="tab"
          aria-controls="profile-tabs3"
          aria-selected="false"
          @click.prevent="selectTab('reactions', '#profile-tabs3-tab')"
        >
          Reactions (0)
        </a>
      </li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <address-nfts :is-active="activeTab === 'nfts'" />
      <address-transactions :is-active="activeTab === 'transactions'" />
      <address-reactions :is-active="activeTab === 'reactions'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { stickyModule, addressModule } from '~/store';

@Component({
  head: {
    title: 'Account page | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Account page | Crypto.Page',
      },
    ],
  },
})
export default class AddressPage extends Vue {
  activeTab = 'nfts';

  get nftCount() {
    return addressModule.nftTransactions.count;
  }

  get transactionCount() {
    return addressModule.transactions.count;
  }

  selectTab(tab: string, id: string) {
    ($(id) as any).tab('show');
    this.activeTab = tab;

    setTimeout(() => {
      stickyModule.update();
    }, 500);
  }
}
</script>
