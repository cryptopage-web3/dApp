<template>
  <div class="profile-center spaces scroll-parent">
    <Tabs />

    <div id="myTabContent" class="tab-content">
      <NewContentPanel :show-tab="true" :tab-index="1" />
      <NewContentPanel content-source="for-you" :tab-index="2" />
      <FollowingPanel />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Tabs from './center/Tabs.vue';
import FollowingPanel from './center/FollowingPanel.vue';
import ForYouPanel from './center/ForYouPanel.vue';
import NewContentPanel from './center/NewContentPanel.vue';

@Component({
  components: {
    Tabs,
    ForYouPanel,
    FollowingPanel,
    NewContentPanel,
  },
})
export default class HomeCenter extends Vue {}
</script>
