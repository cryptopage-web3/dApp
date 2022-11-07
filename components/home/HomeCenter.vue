<template>
  <div class="profile-center spaces scroll-parent">
    <Tabs />

    <div id="myTabContent" class="tab-content">
      <ForYouPanel />
      <FollowingPanel />
      <NewContentPanel />
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
