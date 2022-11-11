<template>
  <Loader v-if="dataLoading" />
  <div v-else class="main-profile-cont">
    <ProfileUser />
    <ProfileTransactions />
    <ProfileWallet />
    <ProfileTokens />
    <ProfileInbox />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import ProfileUser from './ProfileUser.vue';
import ProfileTransactions from './ProfileTransactions.vue';
import ProfileWallet from './ProfileWallet.vue';
import ProfileTokens from './ProfileTokens.vue';
import ProfileInbox from './ProfileInbox.vue';
import Loader from '~/components/loaders/GrowLoader.vue';
import { authModule } from '~/store';

@Component({
  components: {
    ProfileUser,
    ProfileTransactions,
    ProfileWallet,
    ProfileTokens,
    ProfileInbox,
    Loader,
  },
})
export default class Profile extends Vue {
  dataLoading = false;

  get dataLoaded(): boolean {
    return authModule.dataLoaded;
  }

  @Watch('dataLoaded', { immediate: true })
  onDataLoadedChanged(loaded: boolean) {
    if (!loaded) {
      this.fetchData();
    }
  }

  async fetchData() {
    this.dataLoading = true;

    await authModule.fetchData();

    this.dataLoading = false;
  }
}
</script>
