<template>
  <div class="profile-left2">
    <div class="profile-menu-wrap">
      <div class="main-profile-top">
        <h3 class="market-sidebar__title">My Profile</h3>
        <div class="right">
          <a href="#" class="main-profile-eyes">
            <HomeEyeIcon />
          </a>
          <a href="#" class="main-profile-edit">
            <HomeEditIcon />
          </a>
        </div>
      </div>
      <Connect />
      <Profile />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import Connect from './profile/Connect.vue';
import Profile from './profile/Profile.vue';
import HomeEyeIcon from '~/components/icon/home/HomeEyeIcon.vue';
import HomeEditIcon from '~/components/icon/home/HomeEditIcon.vue';

@Component({
  components: {
    HomeEyeIcon,
    HomeEditIcon,
    Connect,
    Profile,
  },
})
export default class HomeLeft extends Vue {}
</script>
