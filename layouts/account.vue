<template>
  <div>
    <layout-notification />
    <layout-cookies />
    <layout-header />

    <section id="profile" class="profile height-full">
      <div class="container">
        <div class="profile-wrap">
          <account-left-sidebar />
          <nuxt />
          <account-right-sidebar v-if="showRightSidebar" />
        </div>
      </div>
    </section>

    <layout-footer />
    <onboarding-modals />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class AccountLayout extends Vue {
  get showRightSidebar(): boolean {
    return !(
      this.$route.name && ['profile-settings'].includes(this.$route.name)
    );
  }
}
</script>
