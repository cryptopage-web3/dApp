<template>
  <div v-if="isOpen" class="global-cookie">
    <div class="global-cookie-wr">
      <div class="global-text_16 global-cookie__text">
        We use cookies to analyze site performance and deliver personalized
        content. By clicking “Agree”, you consent<br />
        to our Cookie Policy. You may change your settings at any time.
      </div>
      <div class="global-cookie-btns">
        <a
          href="#"
          class="btn btn-blue btn_large global-cookie-btn1 w_xl_120 w_100 mr_xl_15 mr_5"
          @click.prevent="agree"
        >
          Agree
        </a>
        <a
          href="#"
          class="btn btn_transparent btn_large global-cookie-btn2 w_xl_120 w_100"
          @click.prevent="decline"
        >
          Decline
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { ELocalStorageKey } from '~/types';

@Component({})
export default class LayoutCookies extends Vue {
  isOpen = false;

  mounted() {
    const isAgree = localStorage.getItem(ELocalStorageKey.cookiesAgree);

    if (isAgree) {
      return;
    }

    this.isOpen = true;
  }

  agree() {
    localStorage.setItem(ELocalStorageKey.cookiesAgree, 'true');
    this.isOpen = false;
  }

  decline() {
    this.isOpen = false;
  }
}
</script>
