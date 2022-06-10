<template>
  <div class="profile-center">
    <address-profile />
    <ul id="myTab" class="nav nav-tabs profile-tabs" role="tablist">
      <li class="nav-item">
        <a
          id="profile-tabs1-tab"
          class="profile-tabs__link active"
          data-toggle="tab"
          href="#profile-tabs1"
          role="tab"
          aria-controls="profile-tabs1"
          aria-selected="true"
          >Content (13)</a
        >
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs2-tab"
          class="profile-tabs__link"
          data-toggle="tab"
          href="#profile-tabs2"
          role="tab"
          aria-controls="profile-tabs2"
          aria-selected="false"
          >Activity (278)</a
        >
      </li>
      <li class="nav-item">
        <a
          id="profile-tabs3-tab"
          class="profile-tabs__link"
          data-toggle="tab"
          href="#profile-tabs3"
          role="tab"
          aria-controls="profile-tabs3"
          aria-selected="false"
          >Reactions (7)</a
        >
      </li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <address-nfts />
      <address-transactions />
      <address-reactions />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { profileContentDropInit } from '~/utils/profileContentDrop';
import { profileContentCommentInit } from '~/utils/profileContentComment';
import { profileContentAudioInit } from '~/utils/profileContentAudio';

@Component({
  head: {
    title: 'Account page | Crypto.Page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Account page | Crypto.Page',
      },
    ],
  },
})
export default class AddressPage extends Vue {
  mounted() {
    profileContentDropInit();
    profileContentCommentInit();
    profileContentAudioInit();
  }
}
</script>
