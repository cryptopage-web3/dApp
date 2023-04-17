<template>
  <div>
    <input
      v-if="!showCode"
      v-model="value"
      type="text"
      placeholder="Sign up / Sign in Phone or Email"
      class="global-input_extra-large sign-variations__input global-input w-100"
    />
    <div v-else class="sign-variations-wrap">
      <div class="global-text_12 dark_grey mb_10">
        We have sent a verification code to your phone.
        <a href="#" class="global-text_12 blue" @click.prevent="handleBack">
          Change Phone
        </a>
      </div>
      <input
        v-model="code"
        type="text"
        placeholder="Enter the code"
        class="global-input_extra-large sign-variations__code global-input w-100 mb_10"
      />
      <div
        v-if="seconds"
        class="sign-variations__timer global-text_12 dark_grey"
      >
        You can request the code again after
        <span>{{ secondsFormat }}</span>
      </div>
      <a
        v-else
        href="#"
        class="global-text_12 sign-variations__request-code blue"
        @click.prevent="repeatSendCode"
      >
        Request code again
      </a>
    </div>
    <div class="text-center mt_15 sign-variations__control">
      <a
        href="#"
        class="send-code btn btn-blue_button btn_extra-large pr_25 pl_25"
        @click.prevent="handleSubmit"
      >
        {{ showCode ? 'Send code' : 'Send' }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

const REPEAT_SEC_COUNT = 30;

@Component({})
export default class ConnectEmail extends Vue {
  timerId: any = null;
  showCode = false;
  value = '';
  code = '';
  seconds = 0;

  get secondsFormat(): string {
    const countSec = this.seconds;
    const days = Math.floor(countSec / 86400);
    const hours = Math.floor((countSec - days * 86400) / 3600);
    const minutes = Math.floor((countSec - days * 86400 - hours * 3600) / 60);
    const seconds = Math.floor(
      countSec - days * 86400 - hours * 3600 - minutes * 60,
    );

    const strMinutes = minutes < 10 ? '0' + minutes : String(minutes);
    const strSeconds = seconds < 10 ? '0' + seconds : String(seconds);

    return strMinutes + ':' + strSeconds;
  }

  beforeDestroy() {
    clearTimeout(this.timerId);
  }

  repeatSendCode() {
    this.seconds = REPEAT_SEC_COUNT;
    this.timerId = setTimeout(() => this.makeTimer(), 1000);
  }

  makeTimer() {
    const countSec = this.seconds;

    if (countSec > 0) {
      this.seconds = countSec - 1;
      this.timerId = setTimeout(() => this.makeTimer(), 1000);
    }
  }

  handleSubmit() {
    if (this.showCode) {
      this.sendCode();
    } else {
      this.sendValue();
    }
  }

  handleBack() {
    this.code = '';
    this.showCode = false;

    clearTimeout(this.timerId);
  }

  sendValue() {
    this.seconds = REPEAT_SEC_COUNT;
    this.timerId = setTimeout(() => this.makeTimer(), 1000);
    this.showCode = true;
  }

  sendCode() {
    console.log('sendCode');
  }
}
</script>
