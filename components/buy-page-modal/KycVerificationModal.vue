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
              <h3 class="global-zag mb_xl_20 mb_md_15 mb_10">
                KYC Verification
              </h3>
              <div class="global-text_12">
                To comply with regulations each participant is required to go
                through identity verification (KYC/AML) to prevent fraud, money
                laundering operations, transactions banned under the sanctions
                regime or those which fund terrorism. Please, complete our fast
                and secure verification process to participate in token
                offerings.
              </div>
              <div
                class="onboarding-welcome-btns d-flex align-items-center justify-content-center mt_md_20 mt_10"
              >
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue-transparent_button btn_large mr_20 pr_30 pl_30"
                  @click.prevent="cancel"
                >
                  Cancel
                </a>
                <a
                  href="#"
                  role="button"
                  class="btn btn-blue_button btn_large pr_30 pl_30"
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
