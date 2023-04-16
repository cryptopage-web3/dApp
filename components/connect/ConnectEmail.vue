<template>
  <div>
    <input
      type="text"
      placeholder="Sign up / Sign in Phone or Email"
      class="global-input_extra-large sign-variations__input global-input w-100"
    />
    <div class="sign-variations-wrap">
      <div class="mt_15"></div>
      <div class="global-text_12 dark_grey mb_10">
        We have sent a verification code to your phone
      </div>
      <input
        type="text"
        placeholder="Enter the code"
        class="global-input_extra-large sign-variations__code global-input w-100 mb_10"
      />
      <div
        data-time="30"
        class="sign-variations__timer global-text_12 dark_grey"
      >
        You can request the code again after
        <span id="sign-variations__timer-wrap"></span>
      </div>
      <a href="#" class="global-text_12 sign-variations__request-code blue">
        Request code again
      </a>
    </div>
    <div class="text-center mt_15">
      <a
        href="#"
        class="send-code btn btn-blue_button btn_extra-large pr_25 pl_25"
      >
        Send code
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component({})
export default class ConnectEmail extends Vue {}
</script>
