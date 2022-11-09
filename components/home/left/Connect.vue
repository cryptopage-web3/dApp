<template>
  <nuxt-link
    to="/connect"
    class="btn_main-profile-connect btn btn-blue_button btn_large w-100"
  >
    Connect Wallet
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class Connect extends Vue {}
</script>
