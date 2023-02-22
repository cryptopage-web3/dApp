<template>
  <div>
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
                <div
                  class="onboarding-between-step"
                  :class="{ checked: stepIndex > 0, active: stepIndex === 0 }"
                >
                  <span>1</span>
                  <img
                    src="@/assets/img/onboarding-between-step_img.svg"
                    alt=""
                  />
                </div>
                <div
                  class="onboarding-between-step"
                  :class="{ checked: stepIndex > 1, active: stepIndex === 1 }"
                >
                  <span>2</span>
                  <img
                    src="@/assets/img/onboarding-between-step_img.svg"
                    alt=""
                  />
                </div>
                <div
                  class="onboarding-between-step"
                  :class="{ checked: stepIndex > 2, active: stepIndex === 2 }"
                >
                  <span>3</span>
                  <img
                    src="@/assets/img/onboarding-between-step_img.svg"
                    alt=""
                  />
                </div>
                <div
                  class="onboarding-between-step"
                  :class="{ checked: stepIndex > 3, active: stepIndex === 3 }"
                >
                  <span>4</span>
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
                    >As part of your sign-up process, you’ll be requared to
                    select the account to connect and sign three transactions in
                    your wallet.</strong
                  >
                  We’ll explain why we need each along the way.
                </p>
                <p>
                  <strong class="fw-600"
                    >Don’t worry, signing up is free.</strong
                  >
                  Additionaly, we will not be privy to your wallet password,
                  private key, balance, or any other information.
                </p>
              </div>
              <ul class="onboarding-between-list mt_20">
                <li>
                  <div class="onboarding-between-list-i">
                    <img
                      :src="getStepIcon(ESignupStep.connect)"
                      alt=""
                      :class="{
                        'onboarding-between-list-i__img':
                          stepIndex === 0 && loading,
                      }"
                    />
                  </div>
                  <div class="onboarding-between-list-t">
                    <div
                      class="global-text_14"
                      :class="{ main_black: stepIndex === 0 }"
                    >
                      <strong class="fw-600 mb_5">
                        You’ve connected an {{ authChainName }} address
                      </strong>
                      <br />
                      <span class="break-all">{{ authAddress }}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="onboarding-between-list-i">
                    <img
                      :src="getStepIcon(ESignupStep.verify)"
                      alt=""
                      :class="{
                        'onboarding-between-list-i__img':
                          stepIndex === 1 && loading,
                      }"
                    />
                  </div>
                  <div class="onboarding-between-list-t">
                    <div
                      class="global-text_14"
                      :class="{ main_black: stepIndex === 1 }"
                    >
                      <strong class="fw-600 mb_5">
                        Verify that you own this address
                      </strong>
                      <br />
                      You’ll be able to sign in to Crypto.Page using this
                      address.
                    </div>
                    <div class="global-text_12 dark_grey mt_10">
                      Not seeing the wallet request? Please make sure to open
                      your wallet extension. If you’re still not seeing it, we
                      can resend it.
                      <a href="#" @click.prevent="startStep">Resend request</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="onboarding-between-list-i">
                    <img
                      :src="getStepIcon(ESignupStep.signMessage)"
                      alt=""
                      :class="{
                        'onboarding-between-list-i__img':
                          stepIndex === 2 && loading,
                      }"
                    />
                  </div>
                  <div class="onboarding-between-list-t">
                    <div
                      class="global-text_14"
                      :class="{ main_black: stepIndex === 2 }"
                    >
                      Sign the message to get access to Crypto.Page sevices.
                      <small class="global-text_12">
                        <a href="#" @click.prevent="startStep">
                          Resend request
                        </a>
                      </small>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="onboarding-between-list-i">
                    <img
                      :src="getStepIcon(ESignupStep.consent)"
                      alt=""
                      :class="{
                        'onboarding-between-list-i__img':
                          stepIndex === 3 && loading,
                      }"
                    />
                  </div>
                  <div class="onboarding-between-list-t">
                    <div
                      class="global-text_14"
                      :class="{ main_black: stepIndex === 3 }"
                    >
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

    <ConfirmVerifyModal
      ref="confirmVerifyModal"
      @cancel="handleCancelVerify"
      @accept="handleAcceptVerify"
    />

    <ConfirmSignModal
      ref="confirmSignModal"
      @cancel="handleCancelSign"
      @accept="handleAcceptSign"
    />

    <iframe
      ref="signIframe"
      allowtransparency
      frameborder="0"
      width="0"
      height="0"
      class="onboarding-sign-iframe"
      sandbox="allow-same-origin || allow-top-navigation || allow-forms || allow-scripts"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import ConfirmVerifyModal from './ConfirmVerifyModal.vue';
import ConfirmSignModal from './ConfirmSignModal.vue';
import SignupModalCloseIcon from '~/components/icon/signup-modal/SignupModalCloseIcon.vue';
import { authModule } from '~/store';
import { ESignupStep } from '~/types';
import { MESSENGER_SIGNUP_URL } from '~/constants';

@Component({
  components: {
    SignupModalCloseIcon,
    ConfirmVerifyModal,
    ConfirmSignModal,
  },
})
export default class SignupModal extends Vue {
  loading = true;
  ESignupStep = ESignupStep;
  step: ESignupStep = ESignupStep.connect;

  cancelVerify: any = null;
  acceptVerify: any = null;

  cancelSign: any = null;
  acceptSign: any = null;

  $refs!: {
    modal: HTMLDivElement;
    signIframe: HTMLIFrameElement;
    confirmVerifyModal: ConfirmVerifyModal;
    confirmSignModal: ConfirmSignModal;
  };

  get authAddress(): string {
    return authModule.address;
  }

  get authChainName() {
    return authModule.chainName;
  }

  get verifiedStatus() {
    return authModule.verifiedStatus;
  }

  get stepIndex() {
    return this.getStepIndex(this.step);
  }

  get showModal(): boolean {
    return authModule.showSignupModal;
  }

  @Watch('showModal')
  onShowModalChanged(showModal: boolean) {
    if (showModal) {
      this.show();
    } else {
      this.hide();
    }
  }

  mounted() {
    ($(this.$refs.modal) as any).on('hide.bs.modal', function () {
      authModule.setShowSignupModal(false);

      /** открываем модалку BuyPageModal при закрытии SignupModal */
      authModule.setShowBuyPageModal(true);
    });
  }

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');

    this.startStep();
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  getStep() {
    if (!authModule.isAuth) {
      return ESignupStep.connect;
    }

    if (!this.verifiedStatus.isChecked) {
      return ESignupStep.verify;
    }

    return ESignupStep.signMessage;
  }

  getStepIndex(step: ESignupStep) {
    const steps = {
      [ESignupStep.connect]: 0,
      [ESignupStep.verify]: 1,
      [ESignupStep.signMessage]: 2,
      [ESignupStep.consent]: 3,
    };

    return steps[step];
  }

  getStepIcon(step: ESignupStep): string {
    const icons: Record<string, string> = {
      complete: require('@/assets/img/onboarding-between-list_img1.svg'),
      loading: require('@/assets/img/onboarding-between-list_img2.svg'),
      default: require('@/assets/img/onboarding-between-list_img3.svg'),
    };

    const stepIndex = this.getStepIndex(step);
    const slug =
      this.stepIndex === stepIndex && this.loading
        ? 'loading'
        : this.stepIndex > stepIndex
        ? 'complete'
        : 'default';

    return icons[slug];
  }

  startStep() {
    this.step = this.getStep();

    if (this.step === ESignupStep.connect) {
      this.$notify({
        type: 'error',
        title: 'Connect to Metamask wallet',
      });

      return;
    }

    if (this.step === ESignupStep.verify) {
      this.startVerify();

      return;
    }

    if (this.step === ESignupStep.signMessage) {
      this.startSignMessage();

      return;
    }

    if (this.step === ESignupStep.consent) {
      this.startConsent();
    }
  }

  async startVerify() {
    try {
      this.loading = true;

      /** подтверждение старта верификации */

      await new Promise<void>((resolve, reject) => {
        this.acceptVerify = resolve;
        this.cancelVerify = reject;

        this.$refs.confirmVerifyModal.show();
      });

      /** проверяем верификацию */

      const result = await authModule.fractalSign();

      this.loading = false;

      if (result) {
        this.startStep();
      }
    } catch {
      this.loading = false;
    }
  }

  async startSignMessage() {
    try {
      this.loading = true;

      /** подтверждение старта подписи в мессенджере */

      await new Promise<void>((resolve, reject) => {
        this.acceptSign = resolve;
        this.cancelSign = reject;

        this.$refs.confirmSignModal.show();
      });

      /** показываем или перезапускаем iframe */

      this.$refs.signIframe.src = MESSENGER_SIGNUP_URL;

      /** ожидаем ответ от мессенджера */

      const channel = new BroadcastChannel('peer:onboarding');

      channel.addEventListener('message', ({ data }) => {
        console.log('peer:onboarding message', data);
      });
    } catch {
      this.loading = false;
    }
  }

  startConsent() {
    this.loading = true;
  }

  handleCancelVerify() {
    this.cancelVerify && this.cancelVerify();
  }

  handleAcceptVerify() {
    this.acceptVerify && this.acceptVerify();
  }

  handleCancelSign() {
    this.cancelSign && this.cancelSign();
  }

  handleAcceptSign() {
    this.acceptSign && this.acceptSign();
  }
}
</script>
