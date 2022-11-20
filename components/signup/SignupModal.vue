<template>
  <div
    id="onboarding-modal-between"
    ref="modal"
    class="modal fade global-modal onboarding-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="global-modal-body">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <SignupModalCloseIcon />
            </button>
            <div class="modal-creat__title mb_20">
              Sign Up • Sign Wallet Request
            </div>
            <div class="onboarding-between-steps mb_20">
              <div class="onboarding-between-step checked">
                <span>1</span>
                <img
                  src="@/assets/img/onboarding-between-step_img.svg"
                  alt=""
                />
              </div>
              <div class="onboarding-between-step checked">
                <span>2</span>
                <img
                  src="@/assets/img/onboarding-between-step_img.svg"
                  alt=""
                />
              </div>
              <div class="onboarding-between-step checked">
                <span>3</span>
                <img
                  src="@/assets/img/onboarding-between-step_img.svg"
                  alt=""
                />
              </div>
              <div class="onboarding-between-step active">
                <span>4</span>
                <img
                  src="@/assets/img/onboarding-between-step_img.svg"
                  alt=""
                />
              </div>
              <div class="onboarding-between-step">
                <span>5</span>
                <img
                  src="@/assets/img/onboarding-between-step_img.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="global-line mb_20"></div>
            <div class="global-text_14 main_black">
              <p>
                <strong class="fw-600"
                  >As part of your sign-up process, you’ll be requared to select
                  the account to connect and sign three transactions in your
                  wallet.</strong
                >
                We’ll explain why we need each along the way.
              </p>
              <p>
                <strong class="fw-600">Don’t worry, signing up is free.</strong>
                Additionaly, we will not be privy to your wallet password,
                private key, balance, or any other information.
              </p>
            </div>
            <ul class="onboarding-between-list mt_20">
              <li>
                <div class="onboarding-between-list-i">
                  <img
                    src="@/assets/img/onboarding-between-list_img1.svg"
                    alt=""
                  />
                </div>
                <div class="onboarding-between-list-t">
                  <div class="global-text_14">
                    <strong class="fw-600 mb_5"
                      >You’ve connected an Ethereum address</strong
                    ><br />
                    <span class="break-all"
                      >0xf145187e0caa13573c6c24F3668d620c767A62FA</span
                    >
                  </div>
                </div>
              </li>
              <li>
                <div class="onboarding-between-list-i">
                  <img
                    src="@/assets/img/onboarding-between-list_img2.svg"
                    alt=""
                  />
                </div>
                <div class="onboarding-between-list-t">
                  <div class="global-text_14 main_black">
                    <strong class="fw-600 mb_5"
                      >Verify that you own this address</strong
                    ><br />
                    You’ll be able to sign in to Crypto.Page using this address.
                  </div>
                  <div class="global-text_12 dark_grey mt_10">
                    Not seeing the wallet request? Please make sure to open your
                    wallet extension. If you’re still not seeing it, we can
                    resend it. <a href="#">Resend request</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="onboarding-between-list-i">
                  <img
                    src="@/assets/img/onboarding-between-list_img3.svg"
                    alt=""
                  />
                </div>
                <div class="onboarding-between-list-t">
                  <div class="global-text_14">
                    Sign the message to get access to Crypto.Page sevices
                  </div>
                </div>
              </li>
              <li>
                <div class="onboarding-between-list-i">
                  <img
                    src="@/assets/img/onboarding-between-list_img3.svg"
                    alt=""
                  />
                </div>
                <div class="onboarding-between-list-t">
                  <div class="global-text_14">
                    Consent to register your public profile on Crypto.Page
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import SignupModalCloseIcon from '~/components/icon/signup-modal/SignupModalCloseIcon.vue';

@Component({
  components: {
    SignupModalCloseIcon,
  },
})
export default class SignupModal extends Vue {
  $refs!: {
    modal: HTMLDivElement;
  };

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }
}
</script>
