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
      <a
        href="#"
        class="global-text_12 sign-variations__request-code blue"
        @click.prevent="repeatSendCode"
      >
        Request code again
      </a>
    </div>
    <div class="text-center mt_15">
      <a
        href="#"
        class="send-code btn btn-blue_button btn_extra-large pr_25 pl_25"
        @click.prevent="sendCode"
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
export default class ConnectEmail extends Vue {
  timerId: any = null;
  startTime = 30;

  sendCode() {
    $('.sign-variations-wrap').slideDown(300);
    this.timerId = setInterval(() => {
      this.makeTimer($('.sign-variations__timer').attr('data-time'));
    }, 1000);
    $(this).closest('div').fadeOut(300);
  }

  repeatSendCode() {
    $('.sign-variations-wrap').removeClass('active');
    $('.sign-variations__timer').attr('data-time', this.startTime);

    setTimeout(() => {
      clearInterval(this.timerId);
    }, 1000);

    this.timerId = setInterval(() => {
      this.makeTimer($('.sign-variations__timer').attr('data-time'));
    }, 1000);
  }

  makeTimer(countSeconds: string | undefined) {
    let timeLeft = Number(countSeconds);

    if (timeLeft === -1) {
      $('.sign-variations-wrap').addClass('active');
      return;
    }

    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft - days * 86400) / 3600);
    const minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    const seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60,
    );

    const strMinutes = minutes < 10 ? '0' + minutes : String(minutes);
    const strSeconds = seconds < 10 ? '0' + seconds : String(seconds);

    $('#sign-variations__timer-wrap').html(strMinutes + ':' + strSeconds);
    timeLeft = timeLeft - 1;
    $('.sign-variations__timer').attr('data-time', timeLeft);
  }
}
</script>
