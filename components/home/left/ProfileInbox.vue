<template>
  <div>
    <div class="main-profile-inbox-top">
      <h3 class="market-sidebar__title">Inbox</h3>
    </div>
    <div class="main-profile-inbox-chats">
      <iframe
        :src="iframeUrl"
        allowtransparency
        loading="lazy"
        frameborder="0"
        class="main-profile-inbox-chats__iframe"
        sandbox="allow-same-origin || allow-top-navigation || allow-forms || allow-scripts"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { MESSENGER_CHAT_LIST_SIDEBAR_URL } from '~/constants';

@Component({})
export default class ProfileInbox extends Vue {
  iframeUrl = MESSENGER_CHAT_LIST_SIDEBAR_URL;
}
</script>
