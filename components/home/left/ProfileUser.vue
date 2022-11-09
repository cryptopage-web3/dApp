<template>
  <nuxt-link :to="`/${chainSlug}/${address}`" class="main-profile-user">
    <div class="thumb">
      <jazzicon :seed="10211" :address="address" :diameter="diameter" />
    </div>
    <div class="right">
      <div class="id-user">
        {{ address | shortAddress }}
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { authModule } from '~/store';

@Component({})
export default class ProfileUser extends Vue {
  diameter = 50;

  get address(): string {
    return authModule.address;
  }

  get chainSlug(): string {
    return authModule.chainSlug;
  }
}
</script>
