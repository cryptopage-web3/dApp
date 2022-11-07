<template>
  <a href="#" class="main-profile-user">
    <div
      class="thumb"
      :style="{
        backgroundImage: `url(${homeProfileUser})`,
      }"
    ></div>
    <div class="right">
      <div class="nik">Hvatov Philippe</div>
      <div class="id-user">0x7eE...3F5</div>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import homeProfileUser from '~/assets/img/main-profile-user_img.png';

@Component({})
export default class ProfileUser extends Vue {
  homeProfileUser = homeProfileUser;
}
</script>
