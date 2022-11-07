<template>
  <div class="profile-left2">
    <div class="profile-menu-wrap">
      <Header />
      <Connect />
      <Profile />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Header from './left/Header.vue';
import Connect from './left/Connect.vue';
import Profile from './left/Profile.vue';

@Component({
  components: {
    Header,
    Connect,
    Profile,
  },
})
export default class HomeLeft extends Vue {}
</script>
