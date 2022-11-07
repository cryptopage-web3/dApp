<template>
  <div class="main-profile-wallet-cont">
    <table class="main-profile-wallet-table">
      <tr>
        <td>
          <div>
            <img src="@/assets/img/main-profile-wallet-icon1.svg" alt="" />
            <span> Your ETH: </span>
          </div>
        </td>
        <td>21.678345</td>
      </tr>
      <tr>
        <td>
          <div>
            <img src="@/assets/img/main-profile-wallet-icon2.svg" alt="" />
            <span> Your PAGE: </span>
          </div>
        </td>
        <td>213.678341</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ProfileTokens extends Vue {}
</script>
