<template>
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import HomeEyeIcon from '~/components/icon/home/HomeEyeIcon.vue';
import HomeEditIcon from '~/components/icon/home/HomeEditIcon.vue';

@Component({
  components: {
    HomeEyeIcon,
    HomeEditIcon,
  },
})
export default class Header extends Vue {}
</script>
