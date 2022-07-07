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
          >Content (13)</a
        >
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
          >Activity {{ activityCount }}</a
        >
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
          >Reactions (7)</a
        >
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
import { profileContentDropInit } from '~/utils/profileContentDrop';
import { addressModule, stickyModule } from '~/store';

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

  get activityCount(): string {
    return addressModule.transactions?.count > 0
      ? `(${addressModule.transactions.count})`
      : '';
  }

  mounted() {
    profileContentDropInit();
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
