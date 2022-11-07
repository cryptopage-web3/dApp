<template>
  <div class="main-profile-cont">
    <ProfileUser />
    <ProfileTransactions />
    <ProfileWallet />
    <ProfileTokens />
    <ProfileInbox />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import ProfileUser from './ProfileUser.vue';
import ProfileTransactions from './ProfileTransactions.vue';
import ProfileWallet from './ProfileWallet.vue';
import ProfileTokens from './ProfileTokens.vue';
import ProfileInbox from './ProfileInbox.vue';

@Component({
  components: {
    ProfileUser,
    ProfileTransactions,
    ProfileWallet,
    ProfileTokens,
    ProfileInbox,
  },
})
export default class Profile extends Vue {}
</script>
