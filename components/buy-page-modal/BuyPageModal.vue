<template>
  <div>
    <div
      ref="modal"
      class="modal fade global-modal onboarding-modal buy-page-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="global-modal-body">
              <div class="d-flex align-items-center flex-column mb_20">
                <img
                  class="mb_20"
                  src="@/assets/img/onboarding-modal-sign_img.svg"
                  alt=""
                />
                <div class="global-zag">Buy PAGE token</div>
              </div>
              <div class="global-text_14">
                <p>Thank you for your interest in Crypto.Page!</p>
                <p>
                  To participate in the seeding round of selling PAGE tokens,
                  specify in the next window the requested information to send a
                  request to be added to the white list, after approval you will
                  be sent to the contacts specified (to you by) further
                  instructions.
                </p>
              </div>
              <div
                class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
              >
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue-transparent_button btn_large pr_30 pl_30 mr_10 ml_10"
                  @click.prevent="hide"
                >
                  Skip
                </a>
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue_button btn_large pr_30 pl_30 mr_10 ml_10"
                  @click.prevent="buy"
                >
                  Buy PAGE
                  <img
                    class="ml_5"
                    src="@/assets/img/onboarding-modal-sign3-icon.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <KycVerificationModal ref="kycModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'nuxt-property-decorator';
import KycVerificationModal from './KycVerificationModal.vue';
import { authModule } from '~/store';
import { EVerifiedStatus } from '~/types';
import { BUYPAGEMODAL_VERIFIED_URL } from '~/constants';

@Component({
  components: {
    KycVerificationModal,
  },
})
export default class BuyPageModal extends Vue {
  $refs!: {
    modal: HTMLDivElement;
    kycModal: KycVerificationModal;
  };

  get showModal(): boolean {
    return authModule.showBuyPageModal;
  }

  get isVerified() {
    return authModule.verifiedStatus.status === EVerifiedStatus.verified;
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
      authModule.setShowBuyPageModal(false);
    });
  }

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  buy() {
    this.hide();

    if (this.isVerified) {
      window.open(BUYPAGEMODAL_VERIFIED_URL, '_blank');
    } else {
      this.$refs.kycModal.show();
    }
  }
}
</script>
