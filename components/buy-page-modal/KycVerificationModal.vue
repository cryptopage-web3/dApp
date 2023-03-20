<template>
  <div>
    <div
      ref="modal"
      class="modal fade global-modal onboarding-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="global-modal-body">
              <div class="d-flex align-items-center flex-column mb_20">
                <img
                  class="mb_20"
                  src="@/assets/img/onboarding-modal-sign_img2.svg"
                  alt=""
                />
                <div class="global-zag">KYC Verification</div>
              </div>
              <div class="global-text_14">
                <p>
                  To comply with regulations each participant is required to go
                  through identity verification (KYC/AML) to prevent fraud,
                  money laundering operations, transactions banned under the
                  sanctions regime or those which fund terrorism.
                </p>
                <p>
                  Please, complete our fast and secure verification process to
                  participate in token offerings.
                </p>
              </div>
              <div
                class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
              >
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue-transparent_button btn_large pr_30 pl_30 mr_10 ml_10"
                  @click.prevent="cancel"
                >
                  Cancel
                </a>
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue_button btn_large pr_30 pl_30 mr_10 ml_10"
                  @click.prevent="verify"
                >
                  Verify
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AttentionModal ref="attentionModal" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import AttentionModal from './AttentionModal.vue';
import { FRACTAL_VERIFICATION_URL } from '~/constants';

@Component({
  components: {
    AttentionModal,
  },
})
export default class KycVerificationModal extends Vue {
  $refs!: {
    modal: HTMLDivElement;
    attentionModal: AttentionModal;
  };

  // methods

  show() {
    ($(this.$refs.modal) as any).modal('show');
  }

  hide() {
    ($(this.$refs.modal) as any).modal('hide');
  }

  cancel() {
    this.hide();

    this.$refs.attentionModal.show();
  }

  verify() {
    window.open(FRACTAL_VERIFICATION_URL, '_blank');

    this.hide();
  }
}
</script>
