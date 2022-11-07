<template>
  <div class="market-main-right">
    <div class="market-sidebar-wrap">
      <Recommendations />
      <NewUsers />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Recommendations from './right/Recommendations.vue';
import NewUsers from './right/NewUsers.vue';

@Component({
  components: {
    Recommendations,
    NewUsers,
  },
})
export default class HomeRight extends Vue {}
</script>
